 
/**
 * 핵심적인 서버 역할(프로젝트의 중심)
 * 미들웨어 관리가 이루어짐
 * 라우팅의 시작점
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

//sequelize 불러오기
var {sequelize} = require('./models');

var app = express();

//sequelize 연결
//true: 테이블이 있는 경우 삭제하고 다시 작성 / false: 기존 테이블 삭제x 새 테이블이 작성되면 삭제됨
//서버 실행시 시퀄라이저가 mysql을 연결시켜 줌
sequelize.sync({ force: false }) 
.then(() => {
  console.log('DataBase connection success!')
})
.catch((err) => {
  console.error(err)
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* 라우터 */
app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
