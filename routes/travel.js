var express = require('express');
var router = express.Router();

const travelEmissionFactors = require('../emission-factors/travel.json');
const kgToLbsFactor = 2.205;

/* GET travel emissions. */
router.get('/', function (req, res, next) {
  const miles = req.body.miles;
  const type = req.body.type;
  const emissionFactor = travelEmissionFactors.find(
    (travelEmission) => travelEmission.type == type
  );
  res.json({ emissions: emissionFactor.CO2 * kgToLbsFactor * miles });
});

module.exports = router;
