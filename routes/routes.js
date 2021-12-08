import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as loginController from "./controllers/loginController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as quizController from "./controllers/quizController.js";
import * as statController from "./controllers/statController.js";
import * as questionAPI from "./apis/questionAPI.js";

const router = new Router();

// Main route.
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
// Quiz routes.
router.get("/quiz", quizController.getRandomQuestion);
router.get("/quiz/:question_id", quizController.renderQuiz);
router.get("/quiz/:question_id/correct", quizController.renderCorrect);
router.get("/quiz/:question_id/incorrect", quizController.renderIncorrect);
router.post("/quiz/:question_id/options/:option_id", quizController.answerQuiz);
// Statistics routes.
router.get("/statistics", statController.renderStats);
// API routes.
router.get("/api/questions/random", questionAPI.getRandomQuestion);
router.post("/api/questions/answer", questionAPI.answerQuestion);

export { router };
