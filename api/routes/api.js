var express = require('express');
var router = express.Router();

const { query, validationResult } = require('express-validator');

const emissionsCalculator = require('../emission-factors/emissionsCalculator');

// TODO: add tests
/* GET commuting emissions. */
router.get(
  '/commuting',
  [
    query('type').not().isEmpty().withMessage('type must be present'),
    query('miles')
      .isInt({ min: 1 })
      .withMessage('miles must be a positive number'),
  ],
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const miles = req.query.miles;
    const type = req.query.type;

    const emissions = emissionsCalculator.getCommutingEmissions({
      miles,
      type,
    });

    res.json({ emissions });
  }
);

// TODO: add tests
/* GET driving emissions. */
router.get(
  '/driving',
  [
    query('mpg').isInt().withMessage('mpg must be present'),
    query('year')
      .isInt({ min: 1973, max: 2018 })
      .withMessage('year must be between 1973 and 2018'),
    query('miles')
      .isInt({ min: 1 })
      .withMessage('miles must be a positive number'),
  ],
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const miles = req.query.miles;
    const mpg = req.query.mpg;
    const year = Number(req.query.year);

    const emissions = emissionsCalculator.getDrivingEmissions({
      miles,
      mpg,
      year,
    });

    res.json({ emissions });
  }
);

// TODO: add tests
/* GET housing emissions. */
router.get(
  '/housing',
  [
    query('state')
      .isAlpha()
      .isLength({ min: 2, max: 2 })
      .withMessage('state must be an abbreviation'),
    query('kwhs')
      .isNumeric({ min: 0 })
      .withMessage('KWhs must be a positive number'),
  ],
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const state = req.query.state;
    const kwhs = req.query.kwhs;

    const emissions = emissionsCalculator.getHousingEmissions({ state, kwhs });

    res.json({ emissions });
  }
);

module.exports = router;
