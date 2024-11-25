import { Router } from "express";
import * as u from "./requestHandler.js";
import Auth  from "./middleware/Auth.js";

const router=Router();
router.route("/otp").post(u.verifyMail);
router.route("/signup").post(u.signUp);
router.route("/signin").post(u.signIn);
router.route("/home").get(Auth,u.Home);
router.route("/edituser").put(u.editUser);
router.route("/addpost").post(Auth,u.addPost);
router.route("/profile").get(Auth,u.Profile);
export default router;