import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

// Question input validation.
const questionInputValidationRules ={
  title: [validasaur.required, validasaur.minLength(1)],
  question_text: [validasaur.required, validasaur.minLength(1)],
};

/**
 * retrives the question input given by user.
 * @param {*} request 
 * @returns {title, question_text}
 */
const getQuestionInput = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  return{
    title: params.get("title"),
    question_text: params.get("question_text"),
  };
};

/**
 * Validates question input and uses service to add it to DB or show validation errors.
 * redirects to /questions
 * @param {*} context
 */
const addQuestion = async ({ request, response, render, currentUser }) => {
  const question_input = await getQuestionInput(request);

  const [passes, errors] = await validasaur.validate(
    question_input,
    questionInputValidationRules,
  );

  if(!passes){
    console.log("# Question input validation errors: " + JSON.stringify(errors));
    question_input.errors = errors;
    render("./partials/questions.eta", {...question_input, questions: await questionService.listQuestions(currentUser.id)});
  }else{
    // Add question to DB.
    await questionService.addQuestion(
      currentUser.id,
      question_input.title,
      question_input.question_text,
    );
    console.log("# The following question has been added to DB: " + question_input.title);
    response.redirect("/questions");
  }
};

/**
 * Renders user's questions to the broswer.
 * @param {*} param0 
 */
const listQuestions = async ({render, currentUser}) => {
  render("./partials/questions.eta", { questions: await questionService.listQuestions(currentUser.id)});
};

/**
 * Renders a question that the current user is allowed to see.
 * @param {*} param0 
 * @returns nothing, status: 404.
 */
const getQuestionForCurrentUser = async ({render, params, response, currentUser}) => {
  const question = await questionService.getQuestionForUser(currentUser.id, params.id);

  if(!question){
    console.log("# Question was not Found! question_id: " + params.id);
    response.status = 404; // Not unauthorized so that we don't leak the existence of a question.
    response.body = {message : "Question was not found or it does not belong to you."};
    return;
  }

  // Get answer options to render.
  const options = await questionService.listQuestionAnswerOption(question.id);

  render("./partials/question.eta", {
    id: question.id,
    user_id: question.user_id,
    title: question.title,
    question_text: question.question_text,
    options,
  });
};

/**
 * Deletes a question from the DB.
 * @param {*} param0 
 */
const deleteQuestion = async ({params, response, currentUser}) => {
  await questionService.deleteQuestion(currentUser.id, params.id);
  console.log("# Question was deleted. ID: " + params.id);
  response.redirect("/questions");
}

// Question Options input validation.
const questionOptionsInputValidationRules ={
  option_text: [validasaur.required, validasaur.minLength(1)],
};

/**
 * retrives the question option input given by user.
 * @param {*} request 
 * @returns {option_text, is_correct}
 */
 const getQuestionOptionInput = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  return{
    option_text: params.get("option_text"),
    is_correct: params.has("is_correct") || false,
  };
};

/**
 * Adds question answer option for a given question if it exists.
 * @param {*} param0 
 * @returns status code 404 if question does not exist.
 */
const addQuestionAnswerOption = async ( {request, response, render, params, currentUser } ) => {
  const question_option_input = await getQuestionOptionInput(request);

  const [passes, errors] = await validasaur.validate(
    question_option_input,
    questionOptionsInputValidationRules,
  );

  if(!passes){
    // Render errors
    console.log("# Question options validation errors: " +errors);
    const question = await questionService.getQuestionForUser(currentUser.id, params.id);

    if(!question){
      console.log("# Question was not Found! question_id: " + params.id);
      response.status = 404;
      return;
    }
    
    question_option_input.errors = errors;
  
    // Get answer options to render.
    const options = await questionService.listQuestionAnswerOption(question.id);
    
    render("./partials/question.eta", {
      id: question.id,
      user_id: question.user_id,
      title: question.title,
      question_text: question.question_text,
      option_text: question_option_input.option_text,
      is_correct: question_option_input.is_correct,
      errors: question_option_input.errors,
      options,
    });
  }else{
    await questionService.addQuestionAnswerOption(question_option_input.option_text, params.id, question_option_input.is_correct);
    console.log("Options were added for question_id: " + params.id + " Option: " + JSON.stringify(question_option_input));
    response.redirect("/questions/"+params.id);
  }
};

/**
 * Deletes question answer option if question exists.
 * @param {*} param0 
 * @returns status: 404 if no question found.
 */
const deleteQuestionOption = async ({ response, params, currentUser }) => {
  const question = await questionService.getQuestionForUser(currentUser.id, params.id);
  if(!question){
    response.status = 404;
    return;
  }
  // Question exists
  await questionService.deleteQuestionAnswerOption(params.option_id);
  response.redirect("/questions/"+params.id);
};

export { 
  addQuestion,
  listQuestions,
  getQuestionForCurrentUser,
  deleteQuestion,
  addQuestionAnswerOption,
  deleteQuestionOption
};