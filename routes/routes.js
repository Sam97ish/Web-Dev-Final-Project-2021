import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as loginController from "./controllers/loginController.js";
import * as registrationController from "./controllers/registrationController.js";

const router = new Router();

router.get("/", mainController.showMain);

// Registration routes.
router.get("/auth/register", registrationController.renderRegistration);
router.post("/auth/register", registrationController.registerUser);
// Login routes.
router.get("/auth/login", loginController.renderLogin);
router.post("/auth/login", loginController.processLogin);
// Questions routes.
router.get("/questions", questionController.listQuestions);
router.get("/questions/:id", questionController.getQuestionForCurrentUser);
router.post("/questions", questionController.addQuestion);
router.post("/questions/:id/delete", questionController.deleteQuestion);
router.post("/questions/:id/options", questionController.addQuestionAnswerOption);
router.post("/questions/:id/options/:option_id/delete", questionController.deleteQuestionOption);


export { router };
