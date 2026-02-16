import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Query } from "mongoose";
import { UserModel } from "../models";

// export const verifyResetPasswordRequest = async (
//   req: Request,
//   res: Response,
// ) => {
//   const token = req.query.token as string;

//   if (!token) {
//     res.status(400).json({ message: "Токен байхгүй байна" });
//     return;
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       userId: string;
//     };

//     const user = await UserModel.findById(decoded.userId);
//     if (!user) {
//       res.status(400).json({ message: "Хэрэглэгч олдсонгүй" });
//       return;
//     }

//     const newToken = "asd";

//     res.status(200).redirect(`3000?update-pass?token=${newToken}`);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(400)
//       .json({ message: "Токен хүчингүй эсвэл хугацаа нь дууссан байна" });
//   }
// };

export const verifyResetPasswordRequest = async (
  req: Request,
  res: Response,
) => {
  const token = req.query.token as string;

  if (!token) {
    return res.status(400).json({ message: "Токен байхгүй байна" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    // 🔥 ШИНЭ RESET TOKEN ҮҮСГЭХ
    const newToken = jwt.sign(
      {
        userId: user._id,
        type: "password-reset",
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "5m",
      },
    );

    // 🔥 Frontend рүү redirect
    return res.redirect(`http://localhost:3000/update-pass?token=${newToken}`);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Токен хүчингүй эсвэл хугацаа нь дууссан байна" });
  }
};
