"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization ? .split(' ')[1] : ;
    if (!token) {
        return res.sendStatus(403);
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};
// export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return res.sendStatus(403);
//   }
//   jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     req.user = user;
//     next();
//   });
// };
// export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (token) {
//     jwt.verify(token, 'your_jwt_secret', (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };
