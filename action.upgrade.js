var actionUpgrade = {
    
    run: function(creep) {
        
        // Attempt to upgrade the controller
        let result = creep.upgradeController(creep.room.controller);
        
        if(result == OK){
            
            // Upgrade successful
            return true;
            
        }else if(result == ERR_NOT_IN_RANGE) {
            
            // Move to the controller
            creep.moveTo(creep.room.controller);
            
            // Move successful
            return true;
            
        }else if(result == ERR_FULL) {
            creep.drop(RESOURCE_ENERGY);
        } else {
            creep.say(result);
        }
    }
};

module.exports = actionUpgrade;
