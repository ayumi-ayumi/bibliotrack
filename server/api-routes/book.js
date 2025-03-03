import express from "express";
import { getAllBooks, saveNewBook, searchBook } from "../controller/books.js";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/add", saveNewBook);
router.post("/search", searchBook);

export default router;
