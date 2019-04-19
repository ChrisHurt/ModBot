var actionHarvest = {
    
    run: function(creep) {
        let source = creep.pos.findClosestByPath((FIND_SOURCES_ACTIVE||FIND_DROPPED_ENERGY||FIND_DROPPED_RESOURCES));

        
                //console.log("Unknown type of resource found by: " + creep.name);
        let result = creep.harvest(source);
        if(result == OK) {
            return
        } else if(result == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        } else if(result == ERR_INVALID_TARGET) {
            //console.log("Cannot move to pos: " + source);
        } else if (result == ERR_NOT_ENOUGH_ENERGY){
            if(creep.memory.role == "harvester"){
                source = creep.room.find(FIND_STRUCTURES,{filter: function(object){return(object.structureType == STRUCTURE_CONTAINER && object.store[RESOURCE_ENERGY] > 0)}});
                //console.log("source is " + source);
                //console.log("source is[0] " + source[0]);
                
                //source
                let result2 = creep.withdraw(source);
                
                if(result2 == OK) {
                    return;
                } else {
                    creep.moveTo(source);
                }
                creep.say("Pylons!");
                creep.memory.working = true;
            }
        }
    }
};

module.exports = actionHarvest;