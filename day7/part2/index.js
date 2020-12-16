const comun = require('../../comun/index');

(async ()=>{

    var file = await comun.readFile('data',"\n");

    var objs = await ObteinObject(file);

    var number = await calculate(objs,['shiny gold'],[],0);

    

    console.log(number);

})();

async function calculate(objs, finded,getted,number){
    
    var total = 0;

    var elements = objs.filter((value,idx,arr)=>{
           return value.bag == finded[0];
    });
    
    console.log(elements[0]);

    var total = 0;
  
    if(elements != undefined && elements.length > 0 && elements[0].container.length > 0){
        
            var els = [];

            for(var i=0; i<elements[0].container.length; i++){
                els.push(elements[0].container[i].bag);

                
                

               

                if(!isNaN(elements[0].container[i].qty)){

                    
                    var qtyelement =  parseInt(elements[0].container[i].qty);
                    var qty = await calculate(objs,[elements[0].container[i].bag],getted,qtyelement);    

                    

                    total = total + qty;
                    
                    console.log(total);
                    

                }
                
            }
            
           
        }
        if(number==0){
            return (total);
        }
    return (total*number) + number;

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