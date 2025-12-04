const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 }
});

const PollSchema = new Schema({
  question: { type: String, required: true },
  options: [OptionSchema],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  votedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Poll', PollSchema);
