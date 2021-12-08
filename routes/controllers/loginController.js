import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

/**
 * Returns input from user when logging in.
 * @param {*} request 
 * @returns email, password.
 */
 const getLoginInput = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        email: params.get("email"),
        password: params.get("password"),
    };
};

/**
 * Renders login form to the broswer.
 * @param {*} param0 
 */
const renderLogin = ( {render} ) => {
    render("./partials/login.eta");
};

const processLogin = async ({request, response, render, state}) => {
    const login_input = await getLoginInput(request);

    // Get user to authenticate.
    const login_user = await userService.getUserByEmail(login_input.email);

    if(login_user === null){
        // User was not found.
        console.log("# User was not found. User: " + login_input.email);
        render("./partials/login.eta", {error: true});
        return;
    }

    const checkPass = await bcrypt.compare(login_input.password, login_user.password);

    if(!checkPass){
        console.log("# Pass is wrong. User: " + login_input.email);
        render("./partials/login.eta", { error: true });
        return;
    }

    await state.session.set("currentUser", login_user);
    response.redirect("/questions");
};

export {
    processLogin,
    renderLogin,
};
