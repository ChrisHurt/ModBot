var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleLongDistanceHarvester = require('role.ldharvester');

var mainCreepExecute = {
    
    run: function() {
        
        var creepCount = {numHarvesters: 0, numUpgraders: 0, numBuilders: 0, numMiners: 0, numLongDistanceHarvesters: 0};

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
                creepCount["numHarvesters"]++;
            } else if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
                creepCount["numUpgraders"]++;
            } else if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
                creepCount["numBuilders"]++;
            } else if(creep.memory.role == 'miner') {
                roleMiner.run(creep);
                creepCount["numMiners"]++;
            } else if(creep.memory.role == 'ldharvester') {
                roleLongDistanceHarvester.run(creep);
                creepCount["numLongDistanceHarvesters"]++;
            }
            
        }
    //console.log("There are " + creepCount["numHarvesters"] +  " harvesters, " + creepCount["numUpgraders"] + " upgraders, " + creepCount["numBuilders"]  + " builders.");
    return creepCount;
    }
};

module.exports = mainCreepExecute;
