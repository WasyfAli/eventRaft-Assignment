const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const relationshipSchema = new Schema(
  {
    peopleOneId: {
      type: ObjectId,
      ref: "People",
    },
    peopleTwoId: {
      type: ObjectId,
      ref: "People",
    },
    RelationTagId: {
      type: ObjectId,
      ref: "Tag",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Relationship", relationshipSchema);
