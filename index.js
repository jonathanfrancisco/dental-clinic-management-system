const express = require('express'),
      morgan = require('morgan');
      bodyParser = require('body-parser')
      cookieParser = require('cookie-parser');
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users', require('./routes/user'));

// PRODDUCTION
// if(process.env.NODE_ENV === 'production') {
//    app.use(express.static(path.join(__dirname,'/client/build')));
//    app.get('*', (req, res) => {
//       res.sendFile(path.join(__dirname, '/client/build','index.html'));
//    });
// }

app.listen(5000, (req, res) => {
   console.log('Started listening on PORT 5000');
});