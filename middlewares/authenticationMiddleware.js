const restrict = ["/questions", "/statistics", "/quiz"];

const authenticationMiddleware = async (context, next) =>{
    const currentUser = await context.state.session.get("currentUser");

    const is_restricted = restrict.some((route) => context.request.url.pathname.startsWith(route));
    
    if(!currentUser && is_restricted){
        // Redirect to login.
        console.log("Unauthorized, redirecting to login.");
        context.response.redirect("/auth/login");
    }else{
        // Allow.
        await next();
    }

};

export { authenticationMiddleware };