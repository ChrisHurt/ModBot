var actionTransfer = require('action.transfer');

let actionLongDistanceTransfer = {
    
    run: function(creep) {
        //console.log("LD Transfer");
        
        if(creep.room.name == creep.memory.mySpawn.room.name){
            actionTransfer.run(creep);
        } else {
            let exit = creep.room.findExitTo(creep.memory.mySpawn.room);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            //creep.moveTo(Game.rooms[creep.memory.mySpawn.room]);
        }
        
    }
};

module.exports = actionLongDistanceTransfer;
