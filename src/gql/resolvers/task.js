const db = require( "../../../models" );
const { DateTime } = require( 'luxon' )

const modelToJSON = ( mongooseModel ) => {
  // console.log( 'Task:', mongooseModel )
  return {
    id: mongooseModel._id,
    ...mongooseModel.toJSON(),
  }
}

const tasks = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  const tasks = await db.Task.find( {} )
  // console.log( tasks )
  return tasks.map( modelToJSON )
}

const task = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  const task = await db.Task.findById( args.id )
  return modelToJSON( task )
}

const createTask = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  try {
    const { name, description, location, points, } = args.data
    const task = await db.Task.create( {
      name, description, location, points,
    } )
    return modelToJSON( task )
  } catch ( e ) {
    console.log( e )
    throw 'Unable to create the Task'
  }
}

const updateTask = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  try {
    const { name, description, location, points, } = args.data
    const task = await db.Task.findByIdAndUpdate( args.id, {
      name, description, location, points,
    }, { new: true } )
    return modelToJSON( task )
  } catch ( e ) {
    console.log( e )
    throw 'Unable to update the Task'
  }
}

const deleteTask = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  try {
    const task = await db.Task.findByIdAndDelete( args.id )
    return modelToJSON( task )
  } catch ( e ) {
    console.log( e )
    throw 'Unable to delete the Task'
  }
}

module.exports = {
  Query: {
    task,
    tasks,
  },
  Mutation: {
    createTask,
    updateTask,
    deleteTask,
  },
  modelToJSON,
}

/*
* Sample GQL Queries

query tasks {
  tasks {
    id
    name
    location
    description
    points
  }
}

query task {
  task(id: "62392c0d0097a0866cecd074") {
    id
    name
    location
    description
    points
  }
}

mutation create {
  createTask(
    data: { name: "New Task", location: "kitchen", description: "some task details", points: 1000 }
  ) {
    id
    name
    location
    description
    points    
  }
}

mutation upd {
  updateTask(id: "623e5e89b8c4eb0e5470b454", data: { name: "Newest Task", points: 3000 }) {
    id
  }
}

mutation del {
  deleteTask(id: "623e5e89b8c4eb0e5470b454") {
    id
  }
}

*/