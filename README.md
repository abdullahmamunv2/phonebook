### Introduction.
This project template, that i used, has been taken from my node-clean-architecture repository. https://github.com/kamrulhasan1203/node-clean-architecture 

### Installing

```
1. git clone
2. cd project root folder/  
3. npm install
```

### Building
You can build application in three mood.(production,staging, development(default))

```
#development
npm run build:dev   
```

### Database
I have shared a docker compose file. You can use it to run mongo server.
Otherwise change db config into root/config/default.json(MONGO_DB)

### RUN Command
You can run using either node command or docker
NODE :
```
npm run start:local
```
### Test
1. Go to browser and hit http://localhost:9293


### API LIST

-----------------------------------Commenter Signup------------------------------
POST localhost:9293/api/v1/signup/direct
{
    "username" : "+8801759050153",
    "password" : "test"
}

Response : 
200 OK
{
    "status": "SUCCESS",
    "data": {
        "isAvailable": true,
        "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjBiMWYyZDhkZjYzMTE3Yjk2ZmU5ZTkiLCJ0eXBlIjoxLCJpYXQiOjE1OTQ1NjQzOTd9.RNtNB9XEivDpWG4mHC48zJ8er1aLNwKkEY6QTxCfbExei6Qsuzc51TH5XsJ62OU82QuLVgnu2PgxmUGRXkD9Qw"
    }
}

400 : 

{
    "status": "FAIL",
    "error": {
        "type": "VALIDATION_ERROR",
        "details": [
            {
                "message": "invalid email or mobile",
                "code": 0,
                "field": "username"
            }
        ]
    }
}


-------------------- commenter Signin --------------
POST localhost:9293/api/v1/signin/direct
{
    "username" : "+8801759050153",
    "password" : "test"
}

response : 
200 OK : 

{
    "status": "SUCCESS",
    "data": {
        "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoxLCJpYXQiOjE1OTQ1NjY3NDJ9.UDdf_X1r2SXPn-adz67xYE6dj9gz46h2Y5JS6GmAw_k9idiCjByhNpECBTW87Yzlm4acDBqbX2NCeO4cSxiE-w",
        "expireIn": -1
    }
}



------------------------------Commenter profile pic uplaod-----------------
POST localhost:9293/api/v1/upload
Content-Type : form-data
Authorization : Bearer <AccessToken>

** Form data key name should be 'file'

Response : 

{
    "status": "SUCCESS",
    "data": {
        "url": "http://localhost:9293/static/brainstation/5f0b1f2d8df63117b96fe9e9/bccf04ab-b908-4867-b246-cc235f43ac69.js"
    }
}

--------------------------------- profile create/update ---------------




