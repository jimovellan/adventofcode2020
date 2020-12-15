const comun =  require('../../comun');



async function generateObject(file){

var objs = []
var total = 0;

await file.forEach(async (element,idx) => {
    var questions = element.split("\n");
    var responsesPerPersonGroup = []
    var responses = [];
    var difResponsesPerGroup = 0;
    
    await questions.forEach(async (element,idx)=>{
            var person = {id: idx, responses: []};
            
            

            for(var i=0; i<element.length; i++){
                
                person.responses.push(element[i]);
                if(responses.indexOf(element[i])<0){
                    responses.push(element[i]);
                    difResponsesPerGroup += 1;
                    total +=1;
                }

            }
            responsesPerPersonGroup.push(person);
            
            
    })
    
    objs.push({responsesPerPersonGroup:responsesPerPersonGroup,groupid:idx,responsesPerGroup:responses,difResponsesPerGroup:difResponsesPerGroup });
});

console.log(objs[10])
console.log(total);

return objs;

}


async function calculate(responses){
    
    var total = 0

    await responses.forEach(async element=>{

        for(var i=0; i< element.responsesPerGroup.length ; i++){
            var response = element.responsesPerGroup[i];
            
            var find = true
            for(var j=0; j < element.responsesPerPersonGroup.length; j++){
                 if(element.responsesPerPersonGroup[j].responses.indexOf(response)<0){
                    find = false;
                    break;
                 }
            }

            if(find){
                total +=1;
            }

        }
        

    });

    console.log(total);

}


(async()=>{
    var file = await comun.readFile('data', "\n\n");
  

    var data = await generateObject(file);

    await calculate(data);


})();