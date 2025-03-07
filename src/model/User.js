import mongoose from "mongoose";

// const NotificationSchema = new mongoose.Schema(
//   {
//     branch: {
//       type: String,
//       default: "NA",
//     },
//     email: {
//       type: String,
//       default: "NA",
//     },
//     name: {
//       type: String,
//       default: "NA", 
//     },
//     roomAlloted: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     toJSON: {
//       transform: function (doc, ret) {
//         ret.id = ret._id.toString();
//         delete ret._id;
//         return ret;
//       },
//     },
//     toObject: {
//       transform: function (doc, ret) {
//         ret.id = doc._id.toString();
//         delete ret._id;
//         return ret;
//       },
//     },
//   }
// );

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { 
      type: String, 
      unique: true,
      index: true 
    },
    image: String,
    isAlloted: { 
      type: Boolean, 
      default: false 
    },
    branch: { 
      type: String, 
      default: "NA" 
    },
    roomAlloted: { 
      type: Number, 
      default: 0 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  {
    // Schema options for proper serialization
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = doc._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Virtual for easier ID access
UserSchema.virtual('id').get(function() {
  return this._id.toString();
});

// Prevent model overwrite in Next.js development
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.model("User", UserSchema);

export default User;
