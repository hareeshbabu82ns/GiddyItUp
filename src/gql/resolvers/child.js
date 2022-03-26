const db = require( "../../../models" );
const { DateTime } = require( 'luxon' )

const modelToJSON = ( mongooseModel ) => {
  // console.log( 'Child:', mongooseModel )
  return {
    id: mongooseModel._id,
    ...mongooseModel.toJSON(),
    dateOfBirth: DateTime.fromJSDate( mongooseModel.dob ).toFormat( 'DD' ),
  }
}

const children = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  const children = await db.Child.find( {} )
  // console.log( children )
  return children.map( modelToJSON )
}

const child = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  const child = await db.Child.findById( args.id )
  return modelToJSON( child )
}

const createChild = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  try {
    const { firstName, lastName, dateOfBirth } = args.data
    const child = await db.Child.create( {
      firstName, lastName,
      dob: DateTime.fromISO( dateOfBirth ).toJSDate()
    } )
    return modelToJSON( child )
  } catch ( e ) {
    console.log( e )
    throw 'Unable to create the Child'
  }
}

const updateChild = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  try {
    const { firstName, lastName, dateOfBirth } = args.data
    const child = await db.Child.findByIdAndUpdate( args.id, {
      firstName, lastName, dateOfBirth
    }, { new: true } )
    return modelToJSON( child )
  } catch ( e ) {
    console.log( e )
    throw 'Unable to update the Child'
  }
}

const deleteChild = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  try {
    const child = await db.Child.findByIdAndDelete( args.id )
    return modelToJSON( child )
  } catch ( e ) {
    console.log( e )
    throw 'Unable to delete the Child'
  }
}

module.exports = {
  Query: {
    child,
    children,
  },
  Mutation: {
    createChild,
    updateChild,
    deleteChild,
  },
  modelToJSON,
}

/*
* Sample GQL Queries

query children {
  children {
    id
    fullName
    dateOfBirth
    age
  }
}

query child {
  child(id: "62392c0d0097a0866cecd074") {
    id
    fullName
    dateOfBirth
    age
  }
}

mutation create {
  createChild(
    data: { firstName: "New", lastName: "Baby", dateOfBirth: "2021-01-01" }
  ) {
    id
    fullName
    dateOfBirth
  }
}

mutation upd {
  updateChild(id: "623e5e89b8c4eb0e5470b454", data: { firstName: "Newest" }) {
    id
  }
}

mutation del {
  deleteChild(id: "623e5e89b8c4eb0e5470b454") {
    id
  }
}

*/