const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.post('/', (req, res) => {
  const users = req.body.users || null;
  console.log(users);
  controller
    .addChat(users)
    .then((result) => {
      response.success(req, res, result, 201);
    })
    .catch((err) => {
      response.error(req, res, 'No se pudo crear el chat', 400, err);
    });
});

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  controller
    .getChats(userId)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch((err) => {
      response.error(
        req,
        res,
        'No se pudieron obtener los chats',
        400,
        'Error en el controlador'
      );
    });
});

module.exports = router;
