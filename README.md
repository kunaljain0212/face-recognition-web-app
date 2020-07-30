
# face-recognition-web-app
v-1.1
It is a full-stack working web application using Clarifai Web API for face detection in an image,using a website with frontend designed completely using REACTjs, server using NODEjs and EXPRESSjs and PostgreSQL for database. The frontend, server and database of the website are deployed on heroku.

[Do check out the application here](https://face-recognition-kunal.herokuapp.com/)


### Steps to start:
1. Clone this repo

2. Go to face-recognition-web-app/face-recognition-frontend
    This is the main project folder for the front end.

3. Run npm install
    This will install all the dependencies.

4. Go to face-recognition-web-app/face-recognition-api
    This is the server i.e. the back-end for the application
    
5. Run npm install
    This will install all the dependencies.
    
6. You must add your own API key in the `face-recognition-web-app/face-recognition-api/controllers/image.js` file to connect to Clarifai.

You can grab your free Clarifai API key from here [here](https://www.clarifai.com/)
    
7. Run npm start
    This will run the server, on port 3000
    
8. Go to face-recognition-web-app/face-recognition-webapp and run npm start
    Press Y when prompted for using another port
    (Since 3000 is default for create-react-app module and it is occupied)
    It will use the port 3001
    
    
### Configuring Database:
** Make sure you use postgreSQL instead of mySQL for this code base.
1. Create a database face-recog (Or any other name you prefer)
2. Create two tables users and login, with following structure:
(Generated using \d tb_name in psql)

                                    Table "public.users"
                                    
| Column  |            Type             |                     Modifiers
|---------|-----------------------------|-----------------------------------------------
| id      | integer                     | not null default nextval('users_id_seq'::regclass)
| name    | character varying(100)      | 
| email   | text                        | not null
| entries | bigint                      | default 0
| joined  | timestamp without time zone | not null
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
    
                                 Table "public.login"                                 
| Column |          Type          |                     Modifiers
|--------|------------------------|----------------------------------------------------
| id     | integer                | not null default nextval('login_id_seq'::regclass)
| hash   | character varying(100) | not null
| email  | text                   | not null
Indexes:
    "login_pkey" PRIMARY KEY, btree (id)
    "login_email_key" UNIQUE CONSTRAINT, btree (email)



3. Enter your server details in `face-recognition-web-app/face-recognition-api/server.js` file.

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
