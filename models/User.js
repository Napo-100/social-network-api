const { Schema, model } = require("mongoose");


const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: "You must provide a username!",
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: "You must provide an email!",
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid e-mail address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    freinds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.reduce((total, friends) => total + friends.length + 1, 0);
});
