# dental-clinic-management-system

Our Capstone Project as one of the final requirements in the Degree of Bachelor of Science in Information Technology

# Project Started @ February 19, 2019October 24 Update

Environment Variables

```
NODE_ENV=development
PORT=5000
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
GMAIL_EMAIL=
GMAIL_PASSWORD=
COOKIES_SECRET=thesis
```

Running the app

1. Running the React app first by going to react-ui directory then run the following command `npm install && npm start`
2. Running the Backend server.
   - Go to the root directory of the project then run `npm install`
   - After installing the dependencies. Run knex latest migrations by using this command `knex migrate:latest`
   - Then run the server `npm start`
