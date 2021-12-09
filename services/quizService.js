import { executeQuery } from "../database/database.js";

/**
 * Retrives one random question to the user.
 * @returns Question: id, user_id, title, question_text || Null.
 */
const getRandomQuestion = async () =>{
    const result = await executeQuery(
        `SELECT * FROM questions ORDER BY RANDOM() LIMIT 1;`
    );
    if(result.rows && result.rows.length > 0){
        return result.rows[0];
      }else{
        return null;
    }
};

/**
 * Stores answer from user in the DB.
 * @param {*} user_id 
 * @param {*} question_id 
 * @param {*} option_id 
 * @param {*} is_correct 
 */
const storeAnswer = async (user_id, question_id, option_id, is_correct) =>{
    await executeQuery(
        `INSERT INTO question_answers (user_id, question_id, question_answer_option_id, correct)
            VALUES($1,$2,$3,$4);`,
        user_id,
        question_id,
        option_id,
        is_correct,
    );
};

/**
 * Retrives the first correct answer for a given question.
 * @param {*} question_id 
 * @returns Option: id, question_id, option_text, is_correct.
 */
const getCorrectAnswer = async (question_id) => {
    const result = await executeQuery(
        `SELECT * FROM question_answer_options WHERE question_id = $1 AND is_correct = true;`,
        question_id,
    );
    if(result.rows && result.rows.length > 0){
        return result.rows[0];
      }else{
        return null;
    }
}

/**
 * Checks if the chosen answer is correct.
 * @param {*} question_id 
 * @param {*} option_id 
 * @returns is_correct: True or false.
 */
const isCorrectAnswer = async (question_id, option_id) => {
    const result = await executeQuery(
        `SELECT is_correct FROM question_answer_options WHERE question_id = $1 AND id = $2;`,
        question_id,
        option_id,
    );
    if(result.rows && result.rows.length > 0){
        return result.rows[0].is_correct;
      }else{
        return false;
    }
}


export { 
    getCorrectAnswer,
    getRandomQuestion,
    isCorrectAnswer,
    storeAnswer,
}