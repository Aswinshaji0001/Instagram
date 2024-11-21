import { Router } from "express";
import * as u from "./requestHandler.js";

const router=Router();
router.route("/otp").post(u.verifyMail);
router.route("/signup").post(u.signUp)
export default router;