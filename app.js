var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var logger        = require('morgan');
var config        = require('./bin/config.json');
var session       = require('express-session');
var MongoStore    = require('connect-mongo')(session);
var mongoose      = require('./libs/mongoose');

var indexRouter    = require('./routes/index');
// var usersRouter    = require('./routes/users');
var error404Router = require('./routes/404');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
// var loginAuthHandler = require('./routes/loginAuth');
var profileRouter = require('./routes/profile');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
    secret: config.session.secret,
    key:    config.session.key,
    cookie: config.session.cookie,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(function(req, res, next) {
    req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
    // res.send('Visits: ' + req.session.numberOfVisits );
    next();
});
app.use(require('./middleware/userLoad'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/404', error404Router);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
// app.use('/auth', loginAuthHandler);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  // if ( app.get('env') === 'development' ) {
  //     errorhandler(err, req, res, next);
  // } else {
  //   res.send(500);
  // }
});

module.exports = app;
