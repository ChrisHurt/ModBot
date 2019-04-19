let actionLongDistanceHarvest = {
    
    run: function(creep) {
        
        if(creep.memory.sourceIndex == null){
            creep.memory.sourceIndex = 0;
            //console.log("Null value fixed, where did you come from?");
        }
        
        if(creep.room.name == creep.memory.target && creep.memory.sourceIndex != 0 && creep.memory.sourceIndex != null){
            //console.log("?");
            
            
            // problem area...
            //let source = creep.room.find(FIND_SOURCES)[creep.memory.sourceIndex.id[0]];
            let ldsource = Game.getObjectById(creep.memory.sourceIndex.id)
            
            //console.log("source is: " + source);
            //console.log("creep.memory.sourceIndex.room.name is: " + creep.memory.sourceIndex.room.name);
            //console.log("creep.memory.sourceIndex.id is: " + creep.memory.sourceIndex.id);

            let result = creep.harvest(ldsource);
            
            if(result == ERR_NOT_IN_RANGE){
                //console.log("Moving to source: " + source);
                creep.moveTo(ldsource);
            }
            
        } else {
            //console.log("Home!");
            let exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        
    }
};

module.exports = actionLongDistanceHarvest;
