// Устанавливаем порт
const { PORT = 3001 } = process.env;
// localhost не работает с POST. Устанавливаем 127.0.0.1
const urlBD = 'mongodb://127.0.0.1:27017/mestodb';

module.exports = { PORT, urlBD };
