const mongoose = require( "mongoose" );
const { DateTime } = require( 'luxon' )
const Schema = mongoose.Schema;

const ChildSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: "First name is required",
    },
    lastName: {
      type: String,
      trim: true,
      required: "Last name is required",
    },
    dob: {
      type: Date,
      required: "Date of Birth is required",
    },
    avatar: {
      type: String,
      trim: true
    },
  },
  { toJSON: { virtuals: true } }
);

ChildSchema.virtual( "fullName" ).get( function () {
  return `${this.firstName} ${this.lastName}`;
} );

ChildSchema.virtual( "age" ).get( function () {
  const start = DateTime.fromJSDate( this.dob )
  const end = DateTime.now()
  const yearsDiff = end.diff( start, 'years' )
  return Math.floor( yearsDiff.years );
} );

const Child = mongoose.model( "Child", ChildSchema );

module.exports = Child;
