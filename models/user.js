const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const UserSchema = new Schema( {
  email: {
    type: String,
    trim: true,
    required: "Email address is required",
  },
  password: {
    type: String,
    trim: true,
    required: "Password is required",
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  }
}, { toJSON: { virtuals: true } } );

UserSchema.virtual( "fullName" ).get( function () {
  return `${this.firstName} ${this.lastName}`;
} );

const User = mongoose.model( "User", UserSchema );

module.exports = User;
