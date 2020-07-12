const mongoose = require('mongoose');


function connect(uri : string,options:object){
    return mongoose.connect(uri,options);
}

function closeAll(){
    return mongoose.disconnect();
}


export {
    connect,
    closeAll          
}