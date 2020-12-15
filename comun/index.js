const fs = require('fs');
const { sep } = require('path');

async function readFile(datafile,separator){

    var data_part = [];

    var data = fs.readFileSync(datafile,{encoding:'utf8'});
    
    data_part = data.split(separator);
    return data_part;

}


module.exports = {readFile}