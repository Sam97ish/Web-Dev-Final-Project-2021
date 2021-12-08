import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";

/**
 * Retrives a random question from the database.
 * @param {*} param0 
 * @returns 
 */
const getRandomQuestion = async ({response, render}) =>{
    const question = await quizService.getRandomQuestion();
    if(!question){
        render("./partials/quiz-not-found.eta");
        return;
    }
    response.redirect("/quiz/"+question.id);
};

/**
 * Allows current user to answer a question and stores their answer.
 * @param {*} param0 
 */
const answerQuiz = async ({response, params, currentUser}) =>{
    const is_correct = await quizService.isCorrectAnswer(params.question_id, params.option_id);
    await quizService.storeAnswer(currentUser.id, params.question_id, params.option_id, is_correct.is_correct);

    if(is_correct.is_correct){
        response.redirect("/quiz/"+params.question_id+"/correct");
    }else{
        response.redirect("/quiz/"+params.question_id+"/incorrect");
    }
};

/**
 * Renders a question and its answers to the broswer.
 * @param {*} param0 
 */
const renderQuiz = async ({render, params}) =>{
    const question = await questionService.getQuestion(params.question_id);
    let options = [];
    if(question){
        options = await questionService.listQuestionAnswerOption(question.id);
    }
    render("./partials/quiz.eta", {...question, options});
};

/**
 * Renders a page that tells the user they were correct.
 * @param {*} param0 
 */
const renderCorrect = async ({render}) =>{
    render("./partials/quiz-correct.eta");
};

/**
 * Renders a page that tells the user that they were incorrect and shows them the correct answer.
 * @param {*} param0 
 */
const renderIncorrect = async ({params, render}) =>{
    const correct_answer = await quizService.getCorrectAnswer(params.question_id);
    render("./partials/quiz-incorrect.eta", correct_answer);
};

export {
    renderCorrect,
    renderIncorrect,
    getRandomQuestion,
    renderQuiz,
    answerQuiz,
};