# 3days

### Run 3days locally

1 - Install [MongoDB](https://www.mongodb.org/) and [NodeJS](https://nodejs.org/), if you don't have them already.

2 - Install all project dependencies:

```sh
$ npm install
```

3 - Start MongoDB, for run without specifying paths:

```sh  
$ mongod
```

4 - Populate Database

```sh
$ npm run populate:company
```

```sh
$ npm run populate:card
```

5 - Start app (http://localhost:5000/)

```sh
$ npm start
```