import { Router } from "express";
import { signup ,login, getProfile} from "../controllers/authorController.js";
import authenticate from "../middleware/authenticate.js";

const AuthorRoute = Router()


AuthorRoute.post("/signup", signup)
AuthorRoute.post("/login", login)
AuthorRoute.get("/profile",  authenticate, getProfile)

export default AuthorRoute;

