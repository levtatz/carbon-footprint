var express = require('express');
var router = express.Router();

const { body, validationResult } = require('express-validator');

const travelEmissionFactors = require('../emission-factors/travel.json');
const kgToLbsFactor = 2.205;

/* GET travel emissions. */
router.get(
  '/',
  [
    body('type').isAlpha().withMessage('type must be a string'),
    body('miles')
      .isInt({ min: 1 })
      .withMessage('miles must be a positive number'),
  ],
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const miles = req.body.miles;
    const type = req.body.type;
    const emissionFactor = travelEmissionFactors.find(
      (travelEmission) => travelEmission.type == type
    );
    res.json({ emissions: emissionFactor.CO2 * kgToLbsFactor * miles });
  }
);

module.exports = router;
