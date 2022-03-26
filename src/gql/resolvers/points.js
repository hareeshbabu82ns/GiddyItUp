const db = require( "../../../models" )
const { modelToJSON: parentModelToJSON } = require( './parent' )
const { modelToJSON: taskModelToJSON } = require( './task' )
const { modelToJSON: childModelToJSON } = require( './child' )
const { DateTime } = require( 'luxon' )

const modelToJSON = ( mongooseModel ) => {
  // console.log( 'Score:', mongooseModel )
  return {
    id: mongooseModel._id,
    ...mongooseModel.toJSON(),
    child: childModelToJSON( mongooseModel.child ),
    task: taskModelToJSON( mongooseModel.task ),
    parent: parentModelToJSON( mongooseModel.parent ),
    createdAt: DateTime.fromJSDate( mongooseModel.createdAt ).toFormat( 'DD TTT' ),
    updatedAt: DateTime.fromJSDate( mongooseModel.updatedAt ).toFormat( 'DD TTT' ),
  }
}

const scores = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  const scores = await db.Score.find( {} ).populate( [ 'child', 'parent', 'task' ] )
  // console.log( scores )
  return scores.map( modelToJSON )
}

const score = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  const score = await db.Score.findById( args.id )
  return modelToJSON( score )
}

const createScore = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  try {
    const { parent, child, task, points, remarks, } = args.data
    const score = await db.Score.create( {
      parent, child, task, points, remarks,
    } )
    return modelToJSON( score )
  } catch ( e ) {
    console.log( e )
    throw 'Unable to create the Score'
  }
}

const updateScore = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  try {
    const { parent, child, task, points, remarks, } = args.data
    const score = await db.Score.findByIdAndUpdate( args.id, {
      parent, child, task, points, remarks,
    }, { new: true } )
    return modelToJSON( score )
  } catch ( e ) {
    console.log( e )
    throw 'Unable to update the Score'
  }
}

const deleteScore = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  try {
    const score = await db.Score.findByIdAndDelete( args.id )
    return modelToJSON( score )
  } catch ( e ) {
    console.log( e )
    throw 'Unable to delete the Score'
  }
}

module.exports = {
  Query: {
    score,
    scores,
  },
  Mutation: {
    createScore,
    // updateScore,
    // deleteScore,
  },
  modelToJSON,
}

/*
* Sample GQL Queries

query scores {
  scores {
    id
    parent {
      id
      fullName
    }
    child {
      id
      fullName
      points
    }
    task {
      id
      name
    }
    points
    remarks
    createdAt
    updatedAt
  }
}

query score {
  score(id: "62392c0d0097a0866cecd074") {
    id
    points
    remarks
  }
}

mutation create {
  createScore(
    data: {
      task: "623f158242d8e8eef2bfe7de"
      parent: "623e8db6689af2acc8a681e4"
      child: "62392c0d0097a0866cecd074"
      points: 500
      remarks: "not so good job"
    }
  ) {
    id
    points
    remarks
  }
}

mutation upd {
  updateScore(id: "623e5e89b8c4eb0e5470b454", data: { firstName: "Newest" }) {
    id
  }
}

mutation del {
  deleteScore(id: "623e5e89b8c4eb0e5470b454") {
    id
  }
}

*/