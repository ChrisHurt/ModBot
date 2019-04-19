var actionLongDistanceHarvest = require('action.ldharvest');
var actionLongDistanceTransfer = require('action.ldtransfer');
var actionRenew = require('action.renew');

var roleLongDistanceHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        //console.log("creep.room.name is: " + creep.room.name);
        //console.log("creep.memory.mySpawn.room.name is: " +creep.memory.mySpawn.room.name);
        //console.log("creep.memory.target is: " +creep.memory.target);
        //console.log("creep.memory.sourceIndex is: " + creep.memory.sourceIndex);
        
        
        
        
        if(creep.memory.target == 0 && creep.room.name == creep.memory.mySpawn.room.name){
            //move to random room
            let exit = (Math.floor(Math.random()*4)) * 2 + 1;
            
            //console.log("exit is: " + exit);
            creep.memory.target = exit;
            //console.log("new target is: " + creep.room.name);
            
        } else if(creep.memory.sourceIndex == 0 && creep.memory.target != 0 && creep.room.name == creep.memory.mySpawn.room.name){
            //console.log("Moving to creep.memory.target: " + creep.memory.target);
            
            let result = creep.moveTo(creep.pos.findClosestByRange(creep.memory.target));
            if(result == ERR_NO_PATH || result == ERR_INVALID_TARGET){
                // reset creep memory
                creep.memory.target = 0;
            } else if (result != 0){
                creep.say(result);
            }

   
        } else if(creep.memory.sourceIndex == 0 && creep.room.name != creep.memory.mySpawn.room.name){
            //console.log("Assigning source & re-assigning target");
            creep.memory.target = creep.room.name;
            creep.memory.sourceIndex = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);     
        } else {
            //console.log("Fully initialised");
        }
        
        if(!actionRenew.run(creep)){
            if(creep.memory.working == true && creep.carry.energy == 0){
                creep.memory.working = false;
            } else if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
                creep.memory.working = true;
            }
            
            if(creep.memory.working == true){
                //console.log("Working");
                actionLongDistanceTransfer.run(creep);
            } else {
                //console.log("Not Working");
                actionLongDistanceHarvest.run(creep);
            }
        }
	}
};

module.exports = roleLongDistanceHarvester;