const carEmissionsFactors = require('./cars.json');
const stateEmissionRates = require('./states.json');
const travelEmissionFactors = require('./travel.json');

const kgCO2perGallon = 8.78;

const kgToLbsFactor = 2.205;
const gToLbsFactor = 1 / 454;

exports.getCommutingEmissions = function ({ miles, type }) {
  const emissionFactor = travelEmissionFactors.find(
    (travelEmission) => travelEmission.type == type
  );

  return emissionFactor.CO2 * kgToLbsFactor * miles;
};

exports.getDrivingEmissions = function ({ miles, mpg, year }) {
  const emissionsIndex = carEmissionsFactors.years.indexOf(year);

  const CH4 = carEmissionsFactors.CH4[emissionsIndex];
  const N2O = carEmissionsFactors.N2O[emissionsIndex];

  const carbonEmissions = (kgCO2perGallon / mpg) * kgToLbsFactor * miles;
  const otherEmissions = (CH4 + N2O) * gToLbsFactor * miles;

  return carbonEmissions + otherEmissions;
};

exports.getHousingEmissions = function ({ state, kwhs }) {
  return (stateEmissionRates[state] * kwhs) / 1000;
};
