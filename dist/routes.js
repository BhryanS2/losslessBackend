"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const createChallengeController_1 = require("./controllers/challenge/createChallengeController");
const getChallengeController_1 = require("./controllers/challenge/getChallengeController");
const editChallengeController_1 = require("./controllers/challenge/editChallengeController");
const deleteChalllengeController_1 = require("./controllers/challenge/deleteChalllengeController");
const DeleteManyDbController_1 = require("./controllers/DeleteManyDbController");
const getProfileController_1 = require("./controllers/profile/getProfileController");
const updateProfileController_1 = require("./controllers/profile/updateProfileController");
const getUsersController_1 = require("./controllers/user/getUsersController");
const deleteUserController_1 = require("./controllers/user/deleteUserController");
const loginUserController_1 = require("./controllers/user/loginUserController");
const logoutUserController_1 = require("./controllers/user/logoutUserController");
const signupUserController_1 = require("./controllers/user/signupUserController");
const updateUserController_1 = require("./controllers/user/updateUserController");
const ensureAuthenticate_1 = require("./middleware/ensureAuthenticate");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/user/signup", new signupUserController_1.SignupController().handle);
router.post("/user/login", new loginUserController_1.LoginController().handle);
router.post("/user/signout", ensureAuthenticate_1.ensureAuthenticated, new logoutUserController_1.LogoutController().handle);
router.delete("/user", ensureAuthenticate_1.ensureAuthenticated, new deleteUserController_1.DeleteController().handle);
router.put("/user", ensureAuthenticate_1.ensureAuthenticated, new updateUserController_1.UpdateController().handle);
router.get("/users", new getUsersController_1.getUsersControllers().handle);
router.delete("/delete", ensureAuthenticate_1.ensureAuthenticated, new DeleteManyDbController_1.DeleteManyDbController().clear);
// profile
router.put("/user/profile", ensureAuthenticate_1.ensureAuthenticated, new updateProfileController_1.UpdateProfileController().handle);
router.get("/user/profile", ensureAuthenticate_1.ensureAuthenticated, new getProfileController_1.GetProfileController().handle);
// challenges
router.get("/challenges", new getChallengeController_1.GetChallengeController().handle);
router.post("/challenge", ensureAuthenticate_1.ensureAuthenticated, new createChallengeController_1.CreateChallengeController().handle);
router.put("/challenge/:id", ensureAuthenticate_1.ensureAuthenticated, new editChallengeController_1.EditChallengeController().handle);
router.delete("/challenge/:id", ensureAuthenticate_1.ensureAuthenticated, new deleteChalllengeController_1.DeleteChallengeController().handle);
router.get("/", (req, res) => {
    res.send("Hello World!");
});
