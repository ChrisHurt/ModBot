var actionDedicatedHarvest = {
    
    run: function(creep, inputSource) {

        // TODO: Set source from sourceIndex
        let source = inputSource;
        
        let result = creep.harvest(Game.getObjectById(source.id));
        //creep.say(result);
        if(result == OK) {
            return
        } else if(result == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(source.id));
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

module.exports = actionDedicatedHarvest;