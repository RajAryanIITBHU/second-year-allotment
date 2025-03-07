import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      default: "NA",
    },
    email: {
      type: String,
      default: "NA",
    },
    name: {
      type: String,
      default: "NA", 
    },
    roomAlloted: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        ret.id = doc._id.toString();
        delete ret._id;
        return ret;
      },
    },
  }
);

const RoomSchema = new mongoose.Schema(
  {
    allotedStudents: {
      type: Number,
      default: 0,
    },
    floor: {
      type: Number,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    capacity: {
      type: Number,
      required: true,
      default: 3,
      min: [1, "Capacity cannot be less than 1"],
    },
    possiblyBookedStudents: [StudentSchema],
    students: [StudentSchema],
    roomNo: {
      type: String,
      required: true,
      unique: true,
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = doc._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Add index for frequently queried fields
RoomSchema.index({ roomNo: 1, floor: 1 });

const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);

export default Room;
