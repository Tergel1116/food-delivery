// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { UserModel } from "../../models";

// export const verifyResetPasswordRequest = async (
//   req: Request,
//   res: Response,
// ) => {
//   const token = req.query.token as string;

//   if (!token) {
//     return res.status(400).json({ message: "Токен байхгүй байна" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       userId: string;
//       type: string;
//     };

//     if (decoded.type !== "verify-reset-password") {
//       console.log("true");
//       return res.status(400).json({ message: "Invalid token type" });
//     }

//     const user = await UserModel.findById(decoded.userId);

//     if (!user) {
//       return res.status(400).json({ message: "Хэрэглэгч олдсонгүй" });
//     }

//     const resetToken = jwt.sign(
//       {
//         userId: user._id,
//         type: "password-reset",
//       },
//       process.env.JWT_SECRET!,
//       { expiresIn: "5m" },
//     );
//     // res.json({
//     //   message: "Токен амжилттай баталгаажлаа",
//     //   resetToken,
//     // });

//     return res.redirect(
//       `https://food-delivery-nyoi.onrender.com/reset-password?token=${resetToken}`,
//     );
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       message: "Токен хүчингүй эсвэл хугацаа дууссан байна",
//     });
//   }
// };

import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyResetPasswordRequest = async (
  req: Request,
  res: Response,
) => {
  try {
    const token = req.query.token as string;

    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      type: string;
    };

    if (decoded.type !== "password-reset") {
      return res.status(400).json({
        message: "Invalid token type",
      });
    }

    return res.status(200).json({
      message: "Token is valid",
      userId: decoded.userId,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid or expired token",
    });
  }
};
