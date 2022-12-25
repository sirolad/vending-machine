<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Vending Machine

##Description

A simple API for a vending machine.

##Features
* Buyers can be created 
* Sellers can be created
* Buyers can add deposits in  5, 10, 20, 50 and 100 cent coins
* Sellers can create products with
* Buyers can buy created products 
* Buyers can reset deposit to 0
* Authentication happens through JWT token

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Running In Docker
1. Have Docker and Docker Desktop or Colima running.
2. Run docker-compose up --build.
3. When the app is running, go to http://localhost:3000/api
4. Login to the PGadmin and create a database server.
5. SSH into the nest application and run ```npm run typeorm:run``` to create the migrations.
6. Now you can run the see the available endpoints via Swagger

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## Author

Vending Machine is maintained by [`Surajudeen AKANDE`](mailto:sirolad@gmail.com).

## License

License is MIT [MIT licensed](LICENSE).
