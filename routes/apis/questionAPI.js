import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";

/**
 * API response for a question,
 * @param {*} param0 
 */
const getRandomQuestion = async ({response}) => {
    const question = await quizService.getRandomQuestion();
    let reply = {};
    if(question){
        const answer_options = await questionService.listQuestionAnswerOptionAPI(question.id);
        if(answer_options.length > 0){
            //build body and send as json.
            reply = {
                question_id: question.id,
                question_title: question.question_title,
                question_text: question.question_text,
                answer_options: answer_options,
            };
        }
    }
    response.body = reply;
};

/**
 * API response for an answer.
 * @param {*} param0
 * @returns null if answer is wrong or true if correct. 
 */
const answerQuestion = async ({request, response})=>{
    const body = request.body({ type: "json" });
    const params = await body.value;

    response.body = {
        correct: await quizService.isCorrectAnswer(params.question_id, params.option_id),
    };
};

export { getRandomQuestion, answerQuestion, };
