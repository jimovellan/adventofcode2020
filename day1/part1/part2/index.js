const fs = require('fs');
var nums = [];

var data = fs.readFileSync('data',{encoding:'utf8'});
nums = data.split(/\n/);

for(var i = 0 ; i < nums.length; i++){
    var element = nums[i];
    var dif = 2020 - element;
    var posibles = nums.filter((value,inx,arr)=>{
            return value < dif && value > element;
    })

    if(posibles !== undefined && posibles.length >0){
        
        for(var j=0; j<posibles.length; j++){

            var element2 = posibles[j];
            var dif2 = 2020 - element - element2;
            var posibles2 = posibles.filter((value,inx,arr)=>{
                return value == dif2;});
                
            if(posibles2 !== undefined && posibles2.length > 0){
                console.log(element);
                console.log(element2);
                console.log(posibles2[0]);
                console.log(parseInt(element) + parseInt(element2) + parseInt(posibles2[0]));
                console.log(parseInt(element) * parseInt(element2) * parseInt(posibles2[0]));
            }

        }

    }
}



