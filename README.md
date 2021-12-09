# Web Development course final project !
This project is a quiz game where users get to add questions as well as answer others. The app allows the user to check their statistics and see how well they did as well as list the top five users.

# Testing locally
To test the application locally:
- Add your database config to the file database.js.
- Create the database with the appropriate tables.
- Run the application using:  `deno run --unstable --allow-all run-locally.js` The application will run on port 7777 by default.
- The database tables are:
```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(256) NOT NULL,
  question_text TEXT NOT NULL
);

CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  question_answer_option_id INTEGER REFERENCES question_answer_options(id),
  correct BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX ON users((lower(email)));
```
# Running the automated tests
Follow these steps:
- Set up the database as specified above.
- Make sure there is at least one question in the database.
- Use the command: `deno test --allow-all --unstable` given you are the root folder of the application where the ``tests`` folder exists. If not specify where the tests folder is.

# Live version
The application is available to try at:\
https://web-dev-proj2.herokuapp.com

