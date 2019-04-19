var actionMine = {
    
    run: function(creep,inputSource) {


        let source = Game.getObjectById(inputSource.id);
        
        //console.log("JSON.stringify(source) is: " + JSON.stringify(source));
        
        //console.log("source is: " + source);    // finds source correctly
        //console.log("Game.getObjectById(inputSource.id) is: " + ); 
        
        let transferSubstrate = creep.room.find(FIND_STRUCTURES,{filter: function(object){return(  (object.structureType == STRUCTURE_CONTAINER)  && (object.pos.isNearTo(source)))}});
        
        //console.log("transferSubstrate is: " + transferSubstrate);
        
        let result = ERR_NO_PATH;
        
        if(transferSubstrate.length > 0){
            //console.log("transferSubstrate[0].storeCapacity: " + transferSubstrate[0].storeCapacity);
            //console.log("transferSubstrate[0].store[RESOURCE_ENERGY]:" + transferSubstrate[0].store[RESOURCE_ENERGY]);
            
            //console.log("creep.pos is:" + creep.pos);
            //console.log("transferSubstrate[0].pos is:" + transferSubstrate[0].pos);
            if(source.energy > 0 && transferSubstrate[0].store[RESOURCE_ENERGY] < transferSubstrate[0].storeCapacity && (creep.pos.x == transferSubstrate[0].pos.x)&&(creep.pos.y == transferSubstrate[0].pos.y)){
                result = creep.harvest(source);
                creep.moveTo(transferSubstrate[0]);
            }
            if(result == OK){
                return;
            } else {
                creep.moveTo(transferSubstrate[0]);
            }
        }
        
    }
};

module.exports = actionMine;