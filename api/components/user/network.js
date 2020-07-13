const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', (req, res) => {
  const filterName = req.query.name || null;
  controller
    .getUsers(filterName)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch((err) => {
      response.error(req, res, 'No se pudo obtener el usuario', 400, err);
    });
});

router.post('/', (req, res) => {
  const name = req.body.name || null;
  controller
    .addUser(name)
    .then((result) => {
      response.success(req, res, result, 201);
    })
    .catch((err) => {
      response.error(req, res, 'No se pudo agregar el usuario', 400, err);
    });
});

router.patch('/:id', (req, res) => {
  const id = req.params.id || null;
  const name = req.body.name || null;
  controller
    .updateUser(id, name)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch((err) => {
      response.error(
        req,
        res,
        `No se pudo actualizar el usuario: ${id}`,
        400,
        err
      );
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id || null;
  controller
    .deleteUser(id)
    .then((result) => {
      response.success(
        req,
        res,
        `El usuario ${id} fue eliminado correctamente`,
        200
      );
    })
    .catch((err) => {
      response.error(
        req,
        res,
        `No se pudo eliminar el usuario: ${id}`,
        400,
        err
      );
    });
});

module.exports = router;
