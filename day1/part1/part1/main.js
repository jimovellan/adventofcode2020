//read file from 
const fs = require('fs');
const { exit } = require('process');

fs.readFile('data','utf8',function(err,data){

    var nums = []
    if(err)
    {
        console.log(err);
    }
    else{
        nums = data.split(/\n/);
       
        
        for(let i= 0; i< nums.length ; i++){

            var num = nums[i];
            var dif =  2020 - num;
            var result =  nums.filter((val,idx, arr)=>{
                return val == dif;
                
            });

            if(result !== undefined && result.length > 0)
            {
                console.log(`elemento 1 ${nums[i]}` );
                console.log(`elemento 2 ${result[0]}`);
                console.log(`multiplicacion ${nums[i] * result[0]}`)
                break;
            }
            else{
                
                // console.log('NO');
                // console.log(`dif ${dif}`);
                // console.log(`elemento 1 ${nums[i]}` );

            }


        }

    }

})