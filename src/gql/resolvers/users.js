const db = require( "../../../models" );

me = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  const user = await db.User.findOne( { email: context.authUser.email } )
  // console.log( context )
  return {
    id: user._id,
    ...user.toJSON(),
  }
}

updateUser = async ( parent, args, context, info ) => {
  try {
    const { firstName, lastName, email } = args.data
    const user = await db.User.findByIdAndUpdate( args.id, {
      firstName, lastName, email
    }, { new: true } )
    return {
      id: user._id,
      ...user.toJSON(),
    }
  } catch ( e ) {
    console.log( e )
    throw 'Unable to update the User'
  }
}

deleteUser = async ( parent, args, context, info ) => {
  try {
    const user = db.User.findByIdAndDelete( args.id )
    return {
      id: user._id,
      ...user.toJSON(),
    }
  } catch ( e ) {
    throw 'Unable to delete the User'
  }
}

module.exports = {
  Query: {
    me
  },
  Mutation: {
    updateUser,
    deleteUser,
  }
}