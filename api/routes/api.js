var express = require('express');
var router = express.Router();

const { query, validationResult } = require('express-validator');

const travelEmissionFactors = require('../emission-factors/travel.json');
const kgToLbsFactor = 2.205;

// TODO: add tests
/* GET travel emissions. */
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

module.exports = router;
