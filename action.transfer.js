var roleUpgrader = require('role.upgrader');

var actionTransfer = {
    
    run: function(creep) {
        //for(var spawn in Game.spawns)
        
        var transferSubstrate = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,{
            filter: function(object){return(  (/*(object.room.name == creep.memory.mySpawn.room.name)&&*/
            (object.structureType == STRUCTURE_EXTENSION)||(object.structureType == STRUCTURE_SPAWN))  &&
            (object.energy < object.energyCapacity))}
            
        });
        
        var result = creep.transfer(transferSubstrate, RESOURCE_ENERGY);
        if(result == OK){
            return;
        } else if(result == ERR_NOT_IN_RANGE) {
            creep.moveTo(transferSubstrate);
        } else {
            //creep.say("UP");
            roleUpgrader.run(creep);
        }
    }
};

module.exports = actionTransfer;
