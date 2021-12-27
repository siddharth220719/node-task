const mongoose = require('mongoose');
const validator = require('validator');

const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (validator.isEmail(value) === false) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password should not contain password');
        }
      },
    },
  },
  { timestamps: true }
);

UserSchema.methods.GenerateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, 'node-task');

  await user.save();

  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to log in');
  }
  const isMatch = password === user.password ? true : false;
  if (!isMatch) {
    throw new Error('Unable to log in');
  }
  return user;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
