const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const PointsSchema = new Schema(
  {
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Parent',
      required: "Parent is required",
    },
    child: {
      type: Schema.Types.ObjectId,
      ref: 'Child',
      required: "Child is required",
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: "Task is required",
    },
    points: {
      type: Number,
      trim: true,
      required: "Points is required",
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

PointsSchema.virtual( "score" ).get( function () {
  return `${this.points}`;
  console.log( this.points );
} );

const Points = mongoose.model( "Points", PointsSchema );

module.exports = Points;
