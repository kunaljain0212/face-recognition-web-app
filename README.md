
# face-recognition-web-app
It is a full-stack working web application using Clarifai Web API for face detection in an image,using a website with frontend designed completely using React.js, server using Node.js and Express.js and PostgreSQL for database. Frontend of the application has been deployed to Vercel, backend to Heroku and for database I've used elephantSQL which is a hosted service for PostgreSQL.

[Do check out the application here](https://face-recognition-kunal.herokuapp.com/)

### Steps to start:
1. Clone this repo

2. Go to face-recognition-web-app/face-recognition-frontend
    This is the main project folder for the front end.

3. Run `npm install`
    This will install all the dependencies.

4. Go to face-recognition-web-app/face-recognition-api
    This is the server i.e. the back-end for the application
    
5. Run `npm install`
    This will install all the dependencies.
    
6. You must add your own API key and Databse URI in the `face-recognition-web-app/face-recognition-api/.env` file to connect to Clarifai and your database. The name of the variables are available in .example.env file.

You can grab your free Clarifai API key from here [here](https://www.clarifai.com/)
    
7. Run `npm start`
    This will run the server, on port 8000
    
8. Go to face-recognition-web-app/face-recognition-webapp and run `npm start`
    This will run the frontend, on port 3000
    
### Configuring Database:
** I've used [ElephantSQL](https://www.elephantsql.com/) which is a hosted service for postgreSQL but you can create you local database as well.
1. Create a database face-recog (Or any other name you prefer)
2. Create a table named users, with following structure:
```
CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, entries BIGNINT DEFAULT O);
```
3. Enter your server details in `face-recognition-web-app/face-recognition-api/.env` file.

#### Modules used:
1. [react](https://www.npmjs.com/package/react)
2. [clarifai](https://www.npmjs.com/package/clarifai)
3. [tachyons](https://www.npmjs.com/package/tachyons)
4. [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs)
5. [body-parser](https://www.npmjs.com/package/body-parser)
6. [cors](https://www.npmjs.com/package/cors)
7. [express](https://www.npmjs.com/package/express)
8. [knex](https://www.npmjs.com/package/knex)
9. [pg](https://www.npmjs.com/package/pg)
10. [nodemon (devDependency)](https://www.npmjs.com/package/nodemon)
11. [react-particles-js](https://www.npmjs.com/package/react-particles-js)
