import Book from '../models/book.js';
import env from 'dotenv';
env.config();
import axios from 'axios';

async function getAllBooks(req, res) {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching books', error });
  }
}

async function saveNewBook(req, res) {
  try {
    const book = new Book(req.body);
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ msg: 'Error saving book', error });
  }
}

async function deleteBook(req, res) {
  try {
    const _id = req.params.id;
    const { deletedCount } = await Book.deleteOne({ _id });

    if (deletedCount === 0)
      return res.status(404).json({ msg: 'Target book Not Found' });

    res.json({ msg: 'Deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting book', error });
  }
}

async function updateBook(req, res) {
  try {
    const { date, comment, rating, status } = req.body;
    const _id = req.params.id;
    const book = await Book.findById({ _id });

    if (book === null) return res.status(404).json({ msg: 'Page Not Found' });

    if (date !== undefined) book.date = date;
    if (comment !== undefined) book.comment = comment;
    if (rating !== undefined) book.rating = rating;
    if (status !== undefined) book.status = status;

    await book.save();

    res.json(book);
  } catch (error) {
    res.status(500).json({ msg: 'Error updating book', error });
  }
}

async function searchBook(req, res) {
  const input = req.body.input;

  if (input === '') {
    res.sendStatus(200);
  } else {
    const searchURL = `https://www.googleapis.com/books/v1/volumes?q=${input}&key=${process.env.VITE_API_KEY}&maxResults=8`;

    try {
      const response = await axios.get(searchURL);
      const results = response.data.items;

      const filteredResults = results.map((result) => {
        const title = result.volumeInfo.title || 'NA';

        const authorList = result.volumeInfo.authors || null;
        const author =
          authorList && authorList.length > 0 ? authorList[0] : 'NA';

        const industryIdentifiers =
          result.volumeInfo.industryIdentifiers || null;
        const isbn13 = industryIdentifiers
          ? industryIdentifiers.find(
              (identifier) => identifier.type === 'ISBN_13',
            )
          : null;
        const isbn = isbn13 ? isbn13.identifier : 'NA';

        const imageLinks = result.volumeInfo.imageLinks || null;
        const thumbnail = imageLinks ? imageLinks.thumbnail : null;

        return { title, author, isbn, thumbnail };
      });
      res.json(filteredResults);
    } catch (error) {
      console.error('Error searching: ', error.message, error.code);
      res.status(500).send('Error searching for book');
    }
  }
}

export { getAllBooks, saveNewBook, deleteBook, updateBook, searchBook };
