import { Router } from "express";
import { CreateChallengeController } from "./controllers/challenge/createChallengeController";
import { GetChallengeController } from "./controllers/challenge/getChallengeController";
import { EditChallengeController } from "./controllers/challenge/editChallengeController";
import { DeleteChallengeController } from "./controllers/challenge/deleteChalllengeController";

import { DeleteManyDbController } from "./controllers/DeleteManyDbController";

import { GetProfileController } from "./controllers/profile/getProfileController";
import { UpdateProfileController } from "./controllers/profile/updateProfileController";

import { getUsersControllers } from "./controllers/user/getUsersController";
import { DeleteController } from "./controllers/user/deleteUserController";
import { LoginController } from "./controllers/user/loginUserController";
import { LogoutController } from "./controllers/user/logoutUserController";
import { SignupController } from "./controllers/user/signupUserController";
import { UpdateController } from "./controllers/user/updateUserController";
import { ChangePasswordController } from "./controllers/user/changePasswordController";

import { ensureAuthenticated } from "./middleware/ensureAuthenticate";

const router = Router();
router.post("/user/signup", new SignupController().handle);
router.post("/user/login", new LoginController().handle);
router.post(
  "/user/signout",
  ensureAuthenticated,
  new LogoutController().handle
);
router.delete("/user", ensureAuthenticated, new DeleteController().handle);
router.put("/user", ensureAuthenticated, new UpdateController().handle);
router.get("/users", new getUsersControllers().handle);
router.delete(
  "/delete",
  ensureAuthenticated,
  new DeleteManyDbController().clear
);
router.post("/changePassword", new ChangePasswordController().handle);

// profile
router.put(
  "/user/profile",
  ensureAuthenticated,
  new UpdateProfileController().handle
);
router.get(
  "/user/profile",
  ensureAuthenticated,
  new GetProfileController().handle
);

// challenges
router.get("/challenges", new GetChallengeController().handle);
router.post("/challenge", ensureAuthenticated, new CreateChallengeController().handle);
router.put("/challenge/:id", ensureAuthenticated, new EditChallengeController().handle);
router.delete("/challenge/:id", ensureAuthenticated, new DeleteChallengeController().handle);


router.get("/", (req, res) => {
  res.send("Hello World!");
});

export { router };
