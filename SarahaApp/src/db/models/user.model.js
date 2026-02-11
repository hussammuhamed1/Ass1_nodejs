import { model, Schema } from "mongoose";
import { Gender } from "../enums/user.enum.js";

export const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      default: Gender.other,
    },
    isConfirmEmail: {
      type: Boolean,
      default: false,
    },
    credentialChangeAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
    strictQuery: true,
    strict: true,
    validateBeforeSave: true,
  },
);

userSchema
  .virtual("userName")
  .set(function (value) {
    const [firstName, lastName] = value.split(" ");
    this.set({ firstName, lastName });
  })

  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

  export const userModel = model("User", userSchema);

  export default userModel;