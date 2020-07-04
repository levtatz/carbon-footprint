var express = require('express');
var router = express.Router();

const { query, validationResult } = require('express-validator');

const travelEmissionFactors = require('../emission-factors/travel.json');
const carEmissionsFactors = require('../emission-factors/cars.json');
const stateEmissionRates = require('../emission-factors/states.json');

const kgCO2perGallon = 8.78;

const kgToLbsFactor = 2.205;
const gToLbsFactor = 1 / 454;

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

    const emissionFactor = travelEmissionFactors.find(
      (travelEmission) => travelEmission.type == type
    );
    res.json({ emissions: emissionFactor.CO2 * kgToLbsFactor * miles });
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

    const emissionsIndex = carEmissionsFactors.years.indexOf(year);

    const CH4 = carEmissionsFactors.CH4[emissionsIndex];
    const N2O = carEmissionsFactors.N2O[emissionsIndex];

    const carbonEmissions = (kgCO2perGallon / mpg) * kgToLbsFactor * miles;
    const otherEmissions = (CH4 + N2O) * gToLbsFactor * miles;

    res.json({ emissions: carbonEmissions + otherEmissions });
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

    res.json({ emissions: (stateEmissionRates[state] * kwhs) / 1000 });
  }
);

module.exports = router;
