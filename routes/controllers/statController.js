import * as statService from "../../services/statService.js";

/**
 * Renders the statistics to the user.
 * @param {*} param0 
 */
const renderStats = async ({render, currentUser}) =>{
    const top_users = await statService.getTopFiveUsers();
    const current_user_answers = await statService.getCurrentUserAnswers(currentUser.id);
    const current_user_correct = await statService.getCurrentUserCorrectAnswerCount(currentUser.id);

    render("./partials/stats.eta", {top: top_users, total: current_user_answers.length, correct: current_user_correct.ans_num});
}

export { renderStats };