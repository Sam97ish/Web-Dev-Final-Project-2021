import { executeQuery } from "../database/database.js";
/**
 * service file handles all DB interactions for the questions and their answers.
 * Tables interacted with: questions, question_answers, questsion_answer_options.
 */

// QUESTION DAOs:

/**
 * Adds a question to the DB.
 * @param {*} user_id 
 * @param {*} title 
 * @param {*} question_text 
 */
const addQuestion = async (user_id, title, question_text) => {
  await executeQuery(
    `INSERT INTO questions
      (user_id, title, question_text)
        VALUES ($1, $2, $3);`,
    user_id,
    title,
    question_text,
  );
};

/**
 * List questions for current user.
 * @param {*} user_id 
 * @returns List of question dict: id, user_id, title, question_text.
 */
const listQuestions = async (user_id) => {
  const result = await executeQuery(
    `SELECT * FROM questions WHERE user_id = $1;`,
    user_id,
  );

  return result.rows;
};

/**
 * Returns one question for current user.
 * @param {*} user_id 
 * @param {*} question_id 
 * @returns question dict: id, user_id, title, question_text.
 */
const getQuestionForUser = async (user_id, question_id) => {
  const result = await executeQuery(
    `SELECT * FROM questions WHERE user_id = $1 AND id = $2;`,
    user_id,
    question_id,
  );

  if(result.rows && result.rows.length > 0){
    return result.rows[0];
  }else{
    return null;
  }

};

/**
 * Returns one question.
 * @param {*} question_id 
 * @returns question dict: id, user_id, title, question_text || Null.
 */
const getQuestion = async (question_id) => {
  const result = await executeQuery(
    `SELECT * FROM questions WHERE id = $1;`,
    question_id,
  );

  if(result.rows && result.rows.length > 0){
    return result.rows[0];
  }else{
    return null;
  }
};

/**
 * Deletes given question from DB.
 * @param {*} user_id 
 * @param {*} question_id 
 */
const deleteQuestion = async (user_id, question_id) =>{
  await executeQuery(
    `DELETE FROM questions WHERE user_id = $1 AND id = $2;`,
    user_id,
    question_id,
    );
};

// Question Option DAOs.

/**
 * Adds a new answer option to a given question.
 * @param {*} option_text 
 * @param {*} question_id 
 * @param {*} is_correct 
 */
const addQuestionAnswerOption = async (option_text, question_id, is_correct) =>{
  await executeQuery(
    `INSERT INTO question_answer_options
      (question_id, option_text, is_correct)
        VALUES ($1, $2, $3);`,
    question_id,
    option_text,
    is_correct,
  );
};

/**
 * List all question options for a given question.
 * @param {*} question_id
 * @returns List of question_answer_options: id, question_id, option_text, is_correct. 
 */
const listQuestionAnswerOption = async (question_id) =>{
  const result = await executeQuery(
    `SELECT * FROM question_answer_options WHERE question_id = $1;`,
    question_id,
  );
  return result.rows;
};

/**
 * List all question options for a given question without leaking answer.
 * @param {*} question_id
 * @returns List of question_answer_options: id, question_id, option_text, is_correct. 
 */
 const listQuestionAnswerOptionAPI = async (question_id) =>{
  const result = await executeQuery(
    `SELECT id, question_id, option_text FROM question_answer_options WHERE question_id = $1;`,
    question_id,
  );
  return result.rows;
};


/**
 * Deletes a question answer option from both answers table and options table.
 * @param {*} option_id 
 */
const deleteQuestionAnswerOption = async (option_id) => {
  // Delete also from question_answers to update stats.
  await executeQuery(
    `DELETE FROM question_answers WHERE question_answer_option_id = $1;`,
    option_id,
  );
  // Now delete from options table.
  await executeQuery(
    `DELETE FROM question_answer_options WHERE id = $1;`,
    option_id,
  );
};




export { 
  addQuestion, 
  addQuestionAnswerOption, 
  listQuestions, 
  listQuestionAnswerOption, 
  deleteQuestion, 
  deleteQuestionAnswerOption, 
  getQuestion, 
  getQuestionForUser,
  listQuestionAnswerOptionAPI, 
};