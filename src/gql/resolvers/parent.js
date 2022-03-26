const db = require( "../../../models" );
const { DateTime } = require( 'luxon' )

const modelToJSON = ( mongooseModel ) => {
  // console.log( 'Parent:', mongooseModel )
  return {
    id: mongooseModel._id,
    ...mongooseModel.toJSON(),
  }
}

const parents = async ( parentObj, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  const parents = await db.Parent.find( {} )
  // console.log( parents )
  return parents.map( modelToJSON )
}

const parent = async ( parentObj, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  const parent = await db.Parent.findById( args.id )
  return modelToJSON( parent )
}

const createParent = async ( parentObj, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  try {
    const { firstName, lastName } = args.data
    const parent = await db.Parent.create( {
      firstName, lastName,
    } )
    return modelToJSON( parent )
  } catch ( e ) {
    console.log( e )
    throw 'Unable to create the Parent'
  }
}

const updateParent = async ( parentObj, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  try {
    const { firstName, lastName } = args.data
    const parent = await db.Parent.findByIdAndUpdate( args.id, {
      firstName, lastName,
    }, { new: true } )
    return modelToJSON( parent )
  } catch ( e ) {
    console.log( e )
    throw 'Unable to update the Parent'
  }
}

const deleteParent = async ( parentObj, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  try {
    const parent = await db.Parent.findByIdAndDelete( args.id )
    return modelToJSON( parent )
  } catch ( e ) {
    console.log( e )
    throw 'Unable to delete the Parent'
  }
}

module.exports = {
  Query: {
    parent,
    parents,
  },
  Mutation: {
    createParent,
    updateParent,
    deleteParent,
  },
  modelToJSON,
}

/*
* Sample GQL Queries

query parents {
  parents {
    id
    fullName
  }
}

query parent {
  parent(id: "62392c0d0097a0866cecd074") {
    id
    fullName
  }
}

mutation create {
  createParent(
    data: { firstName: "New", lastName: "Parent" }
  ) {
    id
    fullName
  }
}

mutation upd {
  updateParent(id: "623e5e89b8c4eb0e5470b454", data: { firstName: "Newest" }) {
    id
  }
}

mutation del {
  deleteParent(id: "623e5e89b8c4eb0e5470b454") {
    id
  }
}

*/