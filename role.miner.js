var actionHarvest = require('action.harvest');
var actionMine = require('action.mine');
var actionRenew = require('action.renew');

var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.source == 0){

            // TODO: Implement sourceIndex allocation and memory

            // Search for a list of sources in the given room
            let sourceArray = creep.room.find(FIND_SOURCES);
            console.log("sourceArray: " + sourceArray);

            // Search for a list of harvesters in the given room
            let minerArray = creep.room.find(FIND_CREEPS).filter((a)=> {
                return (a.memory.role == "miner");
            });
            console.log("minerArray: " + minerArray);

            // Check the sourceIndex's of all other harvesters with the same homeRoom
            // Set the sourceIndex to the closest source with not enough harvesters
            let availableSourceArr = [];

            for(let index1 in minerArray){

                let numMinersOnSource = 0;

                for(let index2 in minerArray) {
                    //TODO: Confirm this reference works
                    if(sourceArray[index1].id === minerArray[index2].memory.source.id){numMinersOnSource++;}
                }

                if(numMinersOnSource < 1){availableSourceArr.push(sourceArray[index1]);}

            }

            if(availableSourceArr.length > 0){
                console.log("availableSourceArr: " + availableSourceArr);
                console.log("availableSourceArr[0]: " + availableSourceArr[0]);
                console.log("availableSourceArr[0].id: " + availableSourceArr[0].id);
                
                creep.memory.source = availableSourceArr[0];
                
                console.log("id of creep.memory.source set: " + creep.memory.source.id);
            } else {
                creep.memory.source = creep.room.pos.findClosestByPath(FIND_SOURCES);
            }


        } else {
            //console.log("creep.memory.source is: " + JSON.stringify(creep.memory.source));
        }

        creep.memory.working = true;
        
        if(creep.memory.working == true){
            //creep.say("Mine!");
            actionMine.run(creep,creep.memory.source);
        } else {
            //creep.say("I only mine.")
        }

	}
};

module.exports = roleMiner;