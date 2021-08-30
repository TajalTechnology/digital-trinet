// Project Name:Test
// Developer Name:Md Tajal Islam
// Start Date:30/08/2021
// End Date:-------

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~project setup~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001 ;
const app = express();
const cors = require('cors');


//app set
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//app use
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/profile', express.static('upload/images'));
app.use('/cv', express.static('upload/images'));



// customize routers
const indexRouter = require('./routes/home/index');
const user = require('./routes/users/users');
const companyInfo = require('./routes/companyInfo/companyInfo');
const jobInfo = require('./routes/jobInfo/jobInfo');


app.use('/', indexRouter);
app.use('/api', user);
app.use('/api', companyInfo);
app.use('/api', jobInfo);


// port
app.listen(port, () => { console.log(`App listening at http://localhost:${port}`) });
