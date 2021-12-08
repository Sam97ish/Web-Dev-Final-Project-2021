import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

// Rules for input of new user.
const registrationValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)],
};

/**
 * Returns input from user when registering a new account.
 * @param {*} request 
 * @returns email, password.
 */
const getRegistrationInput = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        email: params.get("email"),
        password: params.get("password"),
    };
};

/**
 * Adds a new user to the application if input is valid.
 * @param {*} param0 
 */
const registerUser = async ({ request, response, render })=> {
    const registration_input = await getRegistrationInput(request);

    const [passes, errors] = await validasaur.validate(
        registration_input,
        registrationValidationRules,
    );

    if(!passes){
        console.log("# Validation Error while registering user, errors: " + errors);
        registration_input.errors = errors;
        render("./partials/register.eta", registration_input);
    }else{
        // Data is valid.
        await userService.addUser(registration_input.email, await bcrypt.hash(registration_input.password));
        response.redirect("/auth/login");
    }
};

/**
 * Renders registration form on the browser.
 * @param {*} param0 
 */
const renderRegistration = ( { render }) =>{
    render("./partials/register.eta");
};

export {
    registerUser,
    renderRegistration,
};