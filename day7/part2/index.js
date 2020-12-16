const comun = require('../../comun/index');

(async ()=>{

    var file = await comun.readFile('data',"\n");

    var objs = await ObteinObject(file);

    var number = await calculate(objs,['shiny gold'],[]);

    

    console.log(number);

})();

async function calculate(objs, finded,getted){
    
    var total = 0;

    var elements = objs.filter((value,idx,arr)=>{
           var result =  value.container.find((v)=>{
                for(var i=0; i< finded.length; i++){
                    
                    if(v.bag == finded[i]){
                        return true;
                    }
                }
                return false;
            });

            return result != undefined;
    });
    
    var total =  0;
    //console.log(`${finded} : ${total}`);
    if(elements != undefined && elements.length > 0){
            var els = [];

            for(var i=0; i<elements.length; i++){
                if(els.indexOf(elements[i].bag)<0){
                    
                    if(getted.indexOf(elements[i].bag)<0){
                        total +=1;
                        els.push(elements[i].bag);
                        getted.push(elements[i].bag);
                    }
                    
                }
                
            }
            var qty = await calculate(objs,els,getted);
            total = total + qty;
           
        }

       
    

    return total;

}



async function ObteinObject(file){

    var objs = [];

    await file.forEach(async element => {
        
        var obj = {};

        var bag = element.split('contain');

        obj.bag = bag[0].replace('bags','').trim();

        

        var splitcontainer = bag[1].split(',');

        var container = await ObtainBagsContainer(splitcontainer);
        obj.container = container;
        
        objs.push(obj);

    });

    return objs;

}

async function ObtainBagsContainer(container){
    var objs =  [];
   
    await container.forEach(async element =>{
        var number = element.substring(0,3).trim();
        var bagsplit = element.replace('\n','').replace('.','').substring(3,element.length-3).split(' ');
        objs.push({bag:`${bagsplit[0].trim()} ${bagsplit[1].trim()}`, qty: number});

    })

    return objs;
}