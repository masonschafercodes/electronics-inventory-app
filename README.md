# Electronics Inventory App

App to keep track of electronic devices

## Backend Setup

### Getting Docker Setup
* create a volume called inventory_vol with `docker volume create inventory_app`
* Create `.env` with your values
* run `docker compose up`

### Getting NodeJS setup
* Install dependencies: `npm install`
* Migrate the database: `npm run migrate`

### Useful Link
* Adminer will be running at http://localhost:8080