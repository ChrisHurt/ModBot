var actionFillTower = {
    
    run: function(creep) {

        // Find the closest tower that needs refilling
        var tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,{filter: function(object){return(  (object.structureType == STRUCTURE_TOWER)  && (object.energy < object.energyCapacity))}});
         
        if(tower) {
            //Transfer energy to this tower - all energy available
            var result = creep.transfer(tower, RESOURCE_ENERGY);
            
            if(result == OK){
                
                //Transfer successful
                return true;
                
            // Was the tower in range?
            } else if(result == ERR_NOT_IN_RANGE) {
                
                // Move to the tower
                creep.moveTo(tower);
                
                // Move successful
                return true;
                
            } else {
                
                // Fill Tower action failure, say why.
                creep.say("FT: " + result);
                
                return false;
            }
        }
    }
};

module.exports = actionFillTower;
