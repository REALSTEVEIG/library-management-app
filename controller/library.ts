import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as service from "../service/library";

const handleErrors = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

export const listUsersController = async (req: Request, res: Response) => {
  try {
    const users = await service.listUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  handleErrors(req, res);
  try {
    const user = await service.getUser(parseInt(req.params.id));
    res.json(user);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  handleErrors(req, res);
  try {
    const user = await service.createUser(req.body.name);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const listBooksController = async (req: Request, res: Response) => {
  try {
    const books = await service.listBooks();
    res.json(books);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookController = async (req: Request, res: Response) => {
  handleErrors(req, res);
  try {
    const book = await service.getBook(parseInt(req.params.id));
    res.json(book);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const createBookController = async (req: Request, res: Response) => {
  handleErrors(req, res);
  try {
    const book = await service.createBook(req.body.name);
    res.status(201).json(book);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const borrowBookController = async (req: Request, res: Response) => {
    handleErrors(req, res);
    try {
      await service.borrowBook(parseInt(req.params.userId), parseInt(req.params.bookId));
      res.sendStatus(204);
    } catch (err: any) {
      if (err.message === "This book is already borrowed by another user.") {
        res.status(400).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  };  

export const returnBookController = async (req: Request, res: Response) => {
  handleErrors(req, res);
  try {
    await service.returnBook(parseInt(req.params.borrowId), req.body.score);
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
