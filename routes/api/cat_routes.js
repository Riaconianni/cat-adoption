const router = require('express').Router();

const { getCats, createCat, updateCat, deleteCat } = require('../../controllers/cats_controller');

// create full CRUD routes at `/cats` (it will eventually become '/api/cats')
router.get('/cats', (req, res) => {
  getCats()
    .then(catdata => {
      res.status(200).json(catdata);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/cats', (req, res) => {
  // req.body => { cat_name: 'Derek'}
  createCat(req.body)
    .then(catdata => {
      res.status(200).json(catdata);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/cats/:id', (req, res) => {
  updateCat(req.body, req.params.id)
    .then(catdata => {
      if (catdata.code === 404) {
        return res.status(404).json(catdata);
      }
      res.status(200).json(catdata);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/cats/:id', (req, res) => {
  deleteCat(req.params.id)
    .then(catdata => {
      if (catdata.code === 404) {
        return res.status(404).json(catdata);
      }

      res.status(200).json(catdata);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;