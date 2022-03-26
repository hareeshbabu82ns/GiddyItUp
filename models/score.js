const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

const ScoreSchema = new Schema(
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
      required: "Score is required",
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

ScoreSchema.virtual( "score" ).get( function () {
  return `${this.points}`;
  console.log( this.points );
} );

const Score = mongoose.model( "Score", ScoreSchema );

module.exports = Score;
