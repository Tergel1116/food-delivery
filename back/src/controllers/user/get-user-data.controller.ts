import { Request, Response } from "express";
import { UserModel } from "../models";

export const getUserData = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.find();
    res.status(200).send({ message: "DONE", data: user });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "FAIL" });
  }
};



// {
//     "email": "tergelbaasan4@gmail.com",
//     "phoneNumber": "12345678",
//     "password": "123456",
//     "address": "asdf",
//     "name": "dfgh",
//     "userName": "sdfghjk"
// }