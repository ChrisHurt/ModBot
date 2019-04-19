let actionWithdraw = {
    
    run: function(creep) {
        
        // Find creep's carry capacity
        //let creepCap = creep.carryCapacity;
        //console.log("creepCap:" + creepCap);
        
        
        
        // Find Lists of energy sources

        // Find all structures in room of creep
        let structs = creep.room.find(FIND_STRUCTURES);
        
        // Find containers with energy greater than the creep's carry capacity
        let containers = structs.filter(filterContainers);
        
        // Find extensions or spawns with energy greater than the creep's carry capacity
        let spawnEnergy = structs.filter(filterExtensionsAndSpawn);
        
        
        
        // Find active sources with energy greater than the creep's carry capacity
        let activeSources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        
        // Find the closest loaded container
        let cont = creep.pos.findClosestByPath(containers);
        
        // Find the closest loaded extension or spawn
        let se = creep.pos.findClosestByPath(spawnEnergy);
        
        //console.log("activeSources:" + activeSources);        
        //console.log("cont:" + cont);                
        //console.log("se:" + se);
        
        creep.say(creep.memory.task);
        
        // Conditions for container withdraw preference, implement new memory group 'creep.memory.task'
        if((creep.memory.task == 'contwdw')||((creep.memory.task == 'none')&&(cont && se && activeSources)||(cont && !(se) && !(activeSources))||(cont && se && !(activeSources)))){
            
            // Will need to implement new memory group to keep creeps on one task. 
            creep.memory.task = 'contwdw';
            
            //console.log("cont loop");
            
            // Withdraw from the container
            let result = creep.withdraw(cont,RESOURCE_ENERGY);
            
            if(result == OK) {
                
                // Withdraw successful
                return true;
                
            // Was the container in range?
            } else if(result == ERR_NOT_IN_RANGE) {
                
                // Move to the container
                creep.moveTo(cont);
                
                // Move successful
                return true;
                
            } else {
                // Withdraw action failure, say why.
                creep.say("contwdw:" + result);
                
                // Reset task memory
                creep.memory.task = 'none';
                
                return false;
            }
            
        } else if(( creep.memory.task == 'extwdw')||((creep.memory.task == 'none')&&(se && activeSources && !(cont))||(se && !activeSources && !(cont)))){
            
            // Will need to implement new memory group to keep creeps on one task. 
            
            creep.memory.task = 'extwdw';
            
            // Withdraw from the container
            let result = creep.withdraw(se,RESOURCE_ENERGY);
            
            if(result == OK) {
                
                // Withdraw successful
                return true;
                
            // Was the container in range?
            } else if(result == ERR_NOT_IN_RANGE) {
                
                // Move to the extension or spawn
                creep.moveTo(se);
                
                // Move successful
                return true;
                
            } else {
                // Withdraw action failure, say why.
                creep.say("sewdw: " + result);
                
                // Reset task memory
                creep.memory.task = 'none';
                
                return false;
            }
            
        } else if((creep.memory.task == 'secwdw')||((creep.memory.task == 'none')&&(se && !activeSources && cont))){
            
            creep.memory.task = 'secwdw';
            
            // Find the closest loaded extension, spawn or container
            let sec = creep.pos.findClosestByPath([se,cont]);
            
            // Withdraw from the container
            let result = creep.withdraw(sec,RESOURCE_ENERGY);
            
            if(result == OK) {
                
                // Withdraw successful
                return true;
                
            // Was the container in range?
            } else if(result == ERR_NOT_IN_RANGE) {
                
                // Move to the extension or spawn
                creep.moveTo(sec);
                
                // Move successful
                return true;
                
            } else {
                // Withdraw action failure, say why.
                creep.say("sewcontdw: " + result);
                
                // Reset task memory
                creep.memory.task = 'none';
                
                return false;
            }
        } else {
            // Reset task memory
            creep.memory.task = 'harvest';
    
            // Move to the nearest active source
            creep.moveTo(activeSources);
            
            // Move successful - returns false as no withdraw occurs
            return false;
        }
    }
};

module.exports = actionWithdraw;

function filterContainers(contents,creepCap){
    
    
    return ((contents.structureType == STRUCTURE_CONTAINER && contents.store[RESOURCE_ENERGY] > 25));
}
function filterExtensionsAndSpawn(contents){
    
    
    return ((contents.structureType == STRUCTURE_EXTENSION && contents.energy > 25)||(contents.structureType == STRUCTURE_SPAWN && contents.energy > 25));
}
