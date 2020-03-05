const express   = require('express')
const router    = express.Router()
const cors      = require('cors')

const anuncioCtrl  =  require('../controllers/anuncios.controller');

router.get('/api/anuncios',cors(),anuncioCtrl.get);
router.get('/api/anuncios/:id',cors(),anuncioCtrl.get);
router.put('/api/anuncios/:id',cors(),anuncioCtrl.put);
router.post('/api/anuncios',cors(),anuncioCtrl.post);
// router.delete('/api/anuncios/:id',cors(),anuncioCtrl.delete);



module.exports = router