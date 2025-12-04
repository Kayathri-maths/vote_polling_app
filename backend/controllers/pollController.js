const Poll = require("../models/Poll");
const User = require("../models/User");

exports.createPoll = async (req, res) => {
  const { question, options } = req.body; // options: string[]
  try {
    const poll = new Poll({
      question,
      options: options.map((o) => ({ text: o })),
      createdBy: req.user._id,
    });
    await poll.save();
    req.user.createdPolls.push(poll._id);
    await req.user.save();
    if (req.io) req.io.emit("polls:update", { action: "created", poll });
    res.json(poll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const polls = await Poll.find().populate("createdBy", "name email").lean();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!poll) return res.status(404).json({ message: "Poll not found" });
    res.json(poll);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.vote = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });
    if (poll.votedBy.includes(req.user._id))
      return res.status(400).json({ message: "Already voted" });
    const optionIndex = req.body.optionIndex;
    if (optionIndex < 0 || optionIndex >= poll.options.length)
      return res.status(400).json({ message: "Invalid option" });
    poll.options[optionIndex].votes += 1;
    poll.votedBy.push(req.user._id);
    await poll.save();
    req.user.votedPolls.push(poll._id);
    await req.user.save();
    if (req.io) req.io.emit("polls:update", { action: "voted", poll });
    res.json(poll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserPolls = async (req, res) => {
  try {
    const created = await Poll.find({ createdBy: req.user._id }).lean();
    const voted = await Poll.find({ _id: { $in: req.user.votedPolls } }).lean();
    res.json({ created, voted });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
