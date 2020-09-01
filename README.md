
### Introduction.

This project template has been taken from my node-clean-architecture repository. https://github.com/kamrulhasan1203/node-clean-architecture

  

### Installing

  

```

1. git clone https://github.com/kamrulhasan1203/phonebook.git

2. cd project root folder/

3. npm install

```

  

### Database

I have shared a docker compose file(root/docker-compose.yml). You can use it to run mongo server.

Otherwise change db config from root/config/default.json

  

default.json

```

"MONGO_DB" : {

"url" : "mongodb://admin:admin@localhost:27017/phonebook?authSource=admin",

"options" : {

"useNewUrlParser" : true,

"useUnifiedTopology" : true

}

}

```

  

### Build

You can build application in three mood.(production,staging, development(default))

  

```

#development

npm run build:dev

```

  

### RUN Command

You can run using either node command or docker

NODE :

```

npm run start:local

```

### Test

1. Go to browser and hit http://localhost:9293

  
  

### API LIST

  

#### Create new Contact

##### Request :
```
POST localhost:9293/api/v1/contacts

{

"name":"kamrul",

"number" : "01759050145"

}

```

  

##### Response :

```

200 OK

{

"status": "SUCCESS",

"data": {

"name": "kamrul",

"number": "01759050144"

}

}

  

```

  

400 Bad Request

```

{

"status": "FAIL",

"error": {

"type": "VALIDATION_ERROR",

"details": [

{

"message": "Invalid Mobile Number.",

"code": 0,

"field": "number"

},

{

"message": "\"name\" is required",

"code": 0,

"field": "name"

}

]

}

}

```

409 Conflict

```

{

"status": "FAIL",

"error": {

"type": "CONFLICT",

"details": [

{

"message": "CONTACT_ALREADY_EXISTS",

"code": 0

}

]

}

}

```

  
  

#### Get Contact By Number

  
##### Request :
```

GET localhost:9293/api/v1/contacts/+88017590501

```

  

##### Response :

  

200 OK :

```

{

"status": "SUCCESS",

"data": {

"name": "kamrul",

"number": "01759050145"

}

}

  

```

  

404 Not Found

```

{

"status": "ERROR",

"error": {

"type": "NO_DATA_FOUND",

"details": [

{

"message": "NOT_DATE_FOUND",

"code": 0

}

]

}

}

```

  

#### Edit Contact

  
##### Request :
```

PUT localhost:9293/api/v1/contacts/01759050145

{

"name" : "charlie"

}

```

  

##### Response :

  

200 OK :

```

{

"status": "SUCCESS",

"data": {

"name": "charlie",

"number": "01759050145"

}

}

  

```

  

404 Not Found

```

{

"status": "ERROR",

"error": {

"type": "NO_DATA_FOUND",

"details": [

{

"message": "NOT_DATE_FOUND",

"code": 0

}

]

}

}

```

  

400 Bad Request

```

{

"status": "FAIL",

"error": {

"type": "VALIDATION_ERROR",

"details": [

{

"message": "\"name\" is required",

"code": 0,

"field": "name"

}

]

}

}

```

  
  

#### Delete Contact

  
##### Request :
```
DELETE localhost:9293/api/v1/contacts/01759050145
```

  

##### Response :

  

200 OK :

```

{

"status": "SUCCESS",

"data": {

"isDeleted": true

}

}

  

```

  

#### Read All Contact

  
##### Request :
```
GET localhost:9293/api/v1/contacts/?page=0&limit=100
```

  

**page & limit are optional with default value 0 & 100

  

##### Response :

  

200 OK :

```

{

"status": "SUCCESS",

"data": {

"contacts": [

{

"number": "01759050145",

"name": "kamrul"

}

],

"next": -1,

"prev": -1,

"page": 0,

"limit": 100

}

}

```