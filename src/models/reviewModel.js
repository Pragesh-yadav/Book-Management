let mongoose = require("mongoose")
let objectId = mongoose.Schema.Types.ObjectId

let reviewSchema = new mongoose.Schema({
  bookId: { type: objectId, required: true, ref: 'Book' },
  reviewedBy: { type: String, required: true, default: 'Guest', value: String },
  reviewedAt: { type: Date, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String, optional: false },
  isDeleted: { type: Boolean, default: false },
},
  { timestamps: true })
module.exports = mongoose.model('Review', reviewSchema)