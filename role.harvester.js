var actionDedicatedHarvest = require('action.dedicatedharvest');
var actionTransfer = require('action.transfer');
var actionRenew = require('action.renew');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.source == 0){

            // TODO: Implement sourceIndex allocation and memory

            // Search for a list of sources in the given room
            let sourceArray = creep.room.find(FIND_SOURCES);
            console.log("sourceArray: " + sourceArray);

            // Search for a list of harvesters in the given room
            let harvesterArray = creep.room.find(FIND_CREEPS).filter((a)=> {
                return (a.memory.role == "harvester");
            });
            console.log("harvesterArray: " + harvesterArray);

            // Check the sourceIndex's of all other harvesters with the same homeRoom
            // Set the sourceIndex to the closest source with not enough harvesters
            let availableSourceArr = [];

            for(let index1 in sourceArray){

                let numHarvestersOnSource = 0;

                for(let index2 in harvesterArray) {
                    //TODO: Confirm this reference works
                    if(sourceArray[index1].id === harvesterArray[index2].memory.source.id){numHarvestersOnSource++;}
                }

                if(numHarvestersOnSource < 2){availableSourceArr.push(sourceArray[index1]);}

            }

            if(availableSourceArr.length > 0){
                console.log("availableSourceArr: " + availableSourceArr);
                console.log("availableSourceArr[0]: " + availableSourceArr[0]);
                console.log("availableSourceArr[0].id: " + availableSourceArr[0].id);
                
                creep.memory.source = availableSourceArr[0];
                
                console.log("creep.memory.source set: " + creep.memory.source);
            } else {
                creep.memory.source = creep.room.pos.findClosestByPath(FIND_SOURCES);
            }


        } else {
            //console.log("creep.memory.source is: " + JSON.stringify(creep.memory.source));
        }

        if(!actionRenew.run(creep)){
            if(creep.memory.working == true && creep.carry.energy == 0){
                creep.memory.working = false;
            } else if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
                creep.memory.working = true;
            }
            
            if(creep.memory.working == true){
                actionTransfer.run(creep);
            } else {
                //actionHarvest.run(creep);

                actionDedicatedHarvest.run(creep,creep.memory.source);
            }
        }
	}
};

module.exports = roleHarvester;