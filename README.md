# techdegree-project10

## Full Stack App with React and a REST API
A full app built for users to administer a school database containing info about courses. Users can retrieve a list of courses and view details about each course, as well as add, update and delete courses.

## Getting Started
Run the following commands from the root of the api folder.

First, install the dependencies using `npm`.
```
npm install
```

Seed the SQLite database.
```
npm run seed
```

Start the api application.
```
npm start
```

Run these commands from the root of the client folder.

Open a second terminal, navigate to the client folder and install the dependencies.
```
npm install
```

Finally, start the client application.
```
npm start
```
If the server does not automatically open a browser, open a new tab in your browser and navigate to [http://localhost:3000/](http://localhost:3000/).


To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).

## Dependencies
- Express v4.16.3
- Express validator v6.2.0
- Basic-Auth v2.0.1
- Bcryptjs v2.4.3
- Morgan v1.9.0
- Sequelize v5.21.2
- SQLite3 v4.0.2
- react and react-dom v16.12.0
- react-router-dom v5.1.2
- react-markdown v4.3.1
- js-cookie v2.2.1

## Features
- Validates that required fields are filled when creating a new user or course.
- Validates that the email address being used to create a new user is valid and doesn't already exist in the database
- Validates that the currently authenticated user owns the course they are trying to edit or delete. Denies access if they are not.
- Course GET routes filter out the createdAt, updatedAt and password columns from the database tables.
- Users can only edit courses that they are the owner of. The update and delete buttons for a course will not be displayed on the details page unless the user owns that course.
- If a user tries to navigate to a protected route and are not signed in, they will be redirected to the sign in form. After successful sign in, they will be redirected to their previously desired page.
- User credentials are presisted using an HTTP cookie.