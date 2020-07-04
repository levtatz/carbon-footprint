# Carbon Footprint Calculator

## api

- [express app](https://expressjs.com/en/starter/generator.html)
- [database of emissions factors](https://www.epa.gov/sites/production/files/2020-04/documents/ghg-emission-factors-hub.pdf)
- [eGrid 2018 Summary Tables](https://www.epa.gov/sites/production/files/2020-01/egrid2018_all_files.zip)

### setup

`cd api`

`npm install`

`npm start`

### deploy

`git subtree push --prefix api heroku master`

## web

- [react app](https://create-react-app.dev/)
- [ant design components](https://ant.design/components/overview/)
- [The Average Monthly Electric Bill by State](https://www.apge.com/average-electric-bill)
- [US states in JSON](https://gist.github.com/mshafrir/2646763)

### setup

`cd web`

`yarn install`

`yarn start`

### deploy

`cd web && make`
