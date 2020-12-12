const { User, Thought } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createThought(req, res) {
    Thought.create(req.body).then((dbThoughtData) => {
      User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      ).then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this ID!" });
        }
        res.json({ message: "You made a thought!" });
      });
    });
  },
};

module.exports = thoughtController;
