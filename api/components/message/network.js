const express = require('express');
const multer = require('multer');

const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/files/');
  },
  filename: function (req, file, callback) {
    const extention = file.mimetype.split('/')[1];
    const name = file.fieldname + '-' + Date.now();
    // imprime: file-laFechaDeHoy.png
    callback(null, `${name}.${extention}`);
  },
});

const upload = multer({ storage });

router.get('/', (req, res) => {
  const filterMessage = req.query.chat || null;
  controller
    .getMessages(filterMessage)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch((err) => {
      response.error(req, res, 'No se pudieron obtener los mensajes', 500, err);
    });
});

router.post('/', upload.single('file'), (req, res) => {
  controller
    .addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((result) => {
      response.success(req, res, result, 201);
    })
    .catch((err) => {
      response.error(
        req,
        res,
        'Informacion invalida',
        500,
        'Error en el controlador'
      );
    });
});

router.patch('/:id', (req, res) => {
  controller
    .updateMessage(req.params.id, req.body.message)
    .then((result) => {
      response.success(req, res, result, 202);
    })
    .catch((err) => {
      response.error(req, res, 'Error interno', 300, err);
    });
});

router.delete('/:id', (req, res) => {
  controller
    .deleteMessage(req.params.id)
    .then((result) => {
      response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
    })
    .catch((err) => {
      response.error(req, res, 'Error interno', 300, err);
    });
});

module.exports = router;
