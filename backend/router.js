import { Router } from "express";
import * as u from "./requestHandler.js";
import Auth  from "./middleware/Auth.js";

const router=Router();
router.route("/otp").post(u.verifyMail);
router.route("/signup").post(u.signUp)
router.route("/signin").post(u.signIn)
router.route("/home").get(Auth,u.Home)
export default router;