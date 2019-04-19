var roleUpgrader = require('role.upgrader');

var actionRepair = {
    run: function(creep) {    

        // Find the closest damaged structure with less than 800,000 hits that we own
        let closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => ((structure.hits < structure.hitsMax) && (structure.hits < 800000) && (structure.my || structure.structureType == STRUCTURE_CONTAINER))
        });
        
        // If there is a damaged structure
        if(closestDamagedStructure) {
            
            // Repair the damaged structure
            let result = creep.repair(closestDamagedStructure);
                
            if(result == OK){
                
                // Repair successful
                return true;
            
            // Was the damaged structure in range?   
            } else if(result == ERR_NOT_IN_RANGE) {
                
                // Move to the damaged structure
                creep.moveTo(closestDamagedStructure);
                
                // Move successful
                return true;
                
            } else {
                
                // Repair action failure, say why.
                creep.say("R: " + result);
                
                return false;                
            }
        }

    }

}
module.exports = actionRepair;
