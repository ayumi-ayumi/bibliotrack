import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    isbn: { type: String },
    date: { type: Date, default: Date.now },
    status: { type: String, erum: ['Have Read', 'Want to Read'] },
    comment: { type: String },
    rating: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
    },
    thumbnail: { type: String },
  },
  { timestamps: true },
);

const Book = model('Book', bookSchema);
export default Book;
