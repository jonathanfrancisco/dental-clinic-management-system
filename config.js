require('dotenv').config();

module.exports = {
  secret: process.env.COOKIES_SECRET,
  port: process.env.PORT,
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twiliAuthToken: process.env.TWILIO_AUTH_TOKEN,
  gmailUser: process.env.GMAIL_EMAIL,
  gmailPassword: process.env.GMAIL_PASSWORD,
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
};
