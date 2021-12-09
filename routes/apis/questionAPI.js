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
                questionId: question.id,
                questionTitle: question.title,
                questionText: question.question_text,
                answerOptions: [],
            };
            for (const opt of answer_options) {
                reply.answerOptions.push({
                  optionId: opt.id,
                  optionText: opt.option_text,
                });
            }
        }
    }
    response.body = reply;
};

/**
 * API response for an answer.
 * @param {*} param0
 * @returns
 */
const answerQuestion = async ({request, response})=>{
    const body = request.body({ type: "json" });
    const params = await body.value;

    response.body = {
        correct: await quizService.isCorrectAnswer(params.questionId, params.optionId),
    };
};

export { getRandomQuestion, answerQuestion, };
