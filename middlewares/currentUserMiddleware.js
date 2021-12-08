import * as userService from "../services/userService.js";

const currentUserMiddleware = async (context, next) => {
    const currentUser = await context.state.session.get("currentUser");

    if(currentUser){
        // User logged in.
        const fetchedUser = await userService.getUserByEmail(currentUser.email);
        // Save in context for later use.
        context.currentUser = fetchedUser;
    }
    await next();
};

export { currentUserMiddleware };