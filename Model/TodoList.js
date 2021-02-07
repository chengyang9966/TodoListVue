const mongoose = require("mongoose");

const TodoListSchema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  editing: {
    type: Boolean,
    default: false,
  },
  DueTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("TodoList", TodoListSchema);
