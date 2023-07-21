// Express фреймворка
const express = require('express');
require('dotenv').config();
// Для работы с БД
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const router = require('./routes');
const { PORT, urlBD } = require('./config');

// Создаем сервер
const app = express();
app.use(cors); // проверяем cors запросы
console.log(process.env.NODE_ENV);

// Подключаемся к БД
mongoose.connect(urlBD);
mongoose.connection.on('connected', () => console.log('Связь с БД установлена'));
mongoose.connection.on('error', () => console.log('Бд сломалась - '));

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger); // логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });

  next();
});

// Беру порт и передаю колбэк, он вызовется в момент его старта
app.listen(PORT, () => {
  console.log(`Сервер запущен на порте: ${PORT}`);
});
