var express = require('express');
var router = express.Router();

const { query, validationResult } = require('express-validator');

const emissionsCalculator = require('../emission-factors/emissionsCalculator');

const hasErrors = function ({ errors, res }) {
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
};

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
    hasErrors({ errors: validationResult(req), res });

    const emissions = emissionsCalculator.getCommutingEmissions({
      miles: req.query.miles,
      type: req.query.type,
    });

    res.json({ emissions });
  }
);

// TODO: add tests
/* GET driving emissions. */
router.get(
  '/driving',
  [
    query('mpg').isInt({ min: 1 }).withMessage('mpg must be present'),
    query('year')
      .isInt({ min: 1973, max: 2018 })
      .withMessage('year must be between 1973 and 2018'),
    query('miles')
      .isInt({ min: 1 })
      .withMessage('miles must be a positive number'),
  ],
  function (req, res, next) {
    hasErrors({ errors: validationResult(req), res });

    const emissions = emissionsCalculator.getDrivingEmissions({
      miles: req.query.miles,
      mpg: req.query.mpg,
      year: Number(req.query.year),
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
    hasErrors({ errors: validationResult(req), res });

    const emissions = emissionsCalculator.getHousingEmissions({
      state: req.query.state,
      kwhs: req.query.kwhs,
    });

    res.json({ emissions });
  }
);

module.exports = router;
