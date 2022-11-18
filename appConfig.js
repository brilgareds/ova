const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const ovaRouter = require('./routes/ova.routes');

class App {
  app = express();
  listener;

  constructor() {
    this.handlerError();
    this.setMiddlewares();
    this.setRoutes();
  }

  handlerError = () => {
    process
      .on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at Promise', reason, promise);
      })
      .on('uncaughtException', (err) => {
        console.error('Uncaught Exception thrown:', err);
        process.exit(1);
      });
  };

  setMiddlewares = () => {
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  };

  setRoutes = () => {
    this.app.use(express.static('public'));
    this.app.use('/ova', ovaRouter);
  };

  getCurrentPort = () => {
    return this.listener.address().port || '';
  };

  run = () => {
    this.listener = this.app.listen(process.env.PORT || 3010);

    console.log('\n\n\nAplicacion disponible en la url:');
    console.log(`http://localhost:${this.getCurrentPort()}/`);
  };
}

module.exports = App;