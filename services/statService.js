import { executeQuery } from "../database/database.js";

/**
 * Returns all the answers that were submitted by the given user.
 * @param {*} user_id 
 * @returns List of Answers: id, user_id, question_id, question_answer_option_id, correct.
 */
const getCurrentUserAnswers = async (user_id) => {
    const result = await executeQuery(
        `SELECT * FROM question_answers WHERE user_id = $1;`,
        user_id,
    );
    return result.rows;
};

/**
 * Retrives the top 5 users in the DB.
 * @returns LIST of user.email, total.
 */
const getTopFiveUsers = async () => {
    const result = await executeQuery(
        `SELECT users.email as email, COUNT(*) as total FROM users
        JOIN question_answers ON users.id = question_answers.user_id
        GROUP BY users.email
        ORDER BY total
        LIMIT 5`,
    );
    return result.rows;
};

/**
 * Get the count of correct answers for the user.
 * @param {*} user_id 
 * @returns Number ans_num.
 */
const getCurrentUserCorrectAnswerCount = async (user_id) =>{
    const result = await executeQuery(
        `SELECT COUNT(*) as ans_num FROM question_answers WHERE user_id = $1 AND correct = true;`,
        user_id,
    );
    if(result.rows && result.rows.length > 0){
        return result.rows[0];
      }else{
        return null;
    }
};

export {
    getCurrentUserAnswers,
    getTopFiveUsers,
    getCurrentUserCorrectAnswerCount,
};