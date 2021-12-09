import { configure, renderFile } from "../deps.js";

const render = async (context, next) => {
  configure({
    views: `${Deno.cwd()}/views/`,
  });

  context.render = async (file, data) => {
    if(!data){
      data ={}; // Without this we get this 
      //error: Uncaught (in promise) TypeError: Cannot set properties of undefined (setting 'currentUser') data.currentUser = context.currentUser;
    }
    if(context.currentUser){
      data.currentUser = context.currentUser;
    }
    context.response.headers.set("Content-Type", "text/html; charset=utf-8");
    context.response.body = await renderFile(file, data);
  };

  await next();
};

export default render;
