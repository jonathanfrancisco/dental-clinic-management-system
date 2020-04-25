const express = require('express'),
  morgan = require('morgan');
bodyParser = require('body-parser');
(cookieParser = require('cookie-parser')), (path = require('path'));
const app = express();
const config = require('./config');

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/sms', require('./routes/sms'));
app.use('/api/appointments', require('./routes/appointment'));
app.use('/api/users', require('./routes/user'));
app.use('/api/patients', require('./routes/patient'));
app.use('/api/treatments', require('./routes/treatment'));
app.use('/api/paymentTransactions', require('./routes/paymentTransaction'));
app.use('/api/dashboard', require('./routes/dashboard'));

if (config.nodeEnv === 'production') {
  app.use(express.static(path.join(__dirname, '/react-ui/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/react-ui/build', 'index.html'));
  });
}

app.listen(config.port || 5000, (req, res) => {
  console.log(`Started listening on PORT ${config.port || 5000}`);
});
