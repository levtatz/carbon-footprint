# Carbon Footprint Calculator

## api

- [express app](https://expressjs.com/en/starter/generator.html)
- [database of emissions factors](https://www.epa.gov/sites/production/files/2020-04/documents/ghg-emission-factors-hub.pdf)

### setup

`cd api`

`npm install`

`npm start`

### deploy

`git subtree push --prefix api heroku master`

## web

- [react app](https://create-react-app.dev/)
- [ant design components](https://ant.design/components/overview/)

### setup

`cd web`

`yarn install`

`yarn start`

### deploy

`cd web && make`
