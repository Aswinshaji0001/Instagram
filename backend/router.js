import { Router } from "express";
import * as u from "./requestHandler.js";

const router=Router();
router.route("/otp").post(u.verifyMail);
router.route("/signup").post(u.signUp)
router.route("/signin").post(u.signIn)
export default router;