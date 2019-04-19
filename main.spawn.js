var mainSpawn = {
    
    run: function(creepCount) {
        
        for(var spawn in Game.spawns){
            var roomEnergy = Game.spawns[spawn].energy;

            var structureList = Game.spawns[spawn].room.find(  FIND_MY_STRUCTURES , {filter: function(object) {return (object.structureType == STRUCTURE_EXTENSION)}} );

            for(var structure in structureList)    {
                if(structureList[structure].structureType == STRUCTURE_EXTENSION){
                    roomEnergy += structureList[structure].energy;
                }  
            }
            
            //Use number of sources in the given room as the limit for harvesters
            let numSources = Game.spawns[spawn].room.find(FIND_SOURCES).length;
            let numContainers = 0;
            let sourceList = Game.spawns[spawn].room.find(FIND_SOURCES);
            
            //Use number of 2*sources in the given room as the limit for harvesters
            for(let index in sourceList){
                numContainers += Game.spawns[spawn].room.find(FIND_STRUCTURES, {filter: function(object) {return (  (object.structureType == STRUCTURE_CONTAINER)  && (object.pos.isNearTo(sourceList[index])) ) }}).length;
            }
            
            
            // Replace numRole counts to values local to the room 
            // This makes the spawn behaviour room sensitive
            let numHarvesters = Game.spawns[spawn].room.find(FIND_CREEPS, {filter: function(creep){return (creep.memory.role == "harvester")}}).length;
            let numMiners = Game.spawns[spawn].room.find(FIND_CREEPS, {filter: function(creep){return (creep.memory.role == "miner")}}).length;
            
            //console.log("numMiners: " + numMiners);
            //console.log("numContainers: " + numContainers);
            
            
            if(numHarvesters < 2*numSources && (roomEnergy >= 250)){
                
                var creepBody = [];
                while(roomEnergy >= 250 && creepBody.length < 36){
                    creepBody.push(WORK); creepBody.push(CARRY); creepBody.push(MOVE); creepBody.push(MOVE);
                    
                    roomEnergy -= 250;
                }
                Game.spawns.Spawn1.createCreep(creepBody,'Harvester ' + Game.time.toString(36),{role:'harvester',renewing: false, task: "none", working: false, mySpawn: Game.spawns[spawn], source: 0});
                
            } else if (creepCount["numUpgraders"] < 1 && (roomEnergy >= 200)){
                
                var creepBody = [];
                while(roomEnergy >= 250 && creepBody.length < 46){
                    creepBody.push(WORK); creepBody.push(CARRY); creepBody.push(MOVE); creepBody.push(MOVE);
                    
                    roomEnergy -= 250;
                }
                Game.spawns.Spawn1.createCreep(creepBody,'Upgrader ' + Game.time.toString(36),{role:'upgrader',renewing: false, task: "none", working: false, mySpawn: Game.spawns[spawn]});
                
            } else if (creepCount["numBuilders"] < 3  && (roomEnergy >= 200)){
                
                var creepBody = [];
                while(roomEnergy >= 250 && creepBody.length < 46){
                    creepBody.push(WORK); creepBody.push(CARRY); creepBody.push(MOVE); creepBody.push(MOVE);
                    
                    roomEnergy -= 250;
                }
                Game.spawns.Spawn1.createCreep(creepBody,'Builder ' + Game.time.toString(36),{role:'builder',renewing: false, task: "none", working: false, mySpawn: Game.spawns[spawn]});
            } else if (numMiners < numContainers  && (roomEnergy >= 550)){
                
                let creepBody = [];
                creepBody.push(WORK); creepBody.push(WORK); creepBody.push(WORK);
                creepBody.push(WORK); creepBody.push(WORK); creepBody.push(MOVE);
                
                
                while(roomEnergy >= 600 && creepBody.length < 8){
                     creepBody.push(MOVE);
                    
                    roomEnergy -= 50;
                }
                
                let result = Game.spawns.Spawn1.createCreep(creepBody,'Miner ' + Game.time.toString(36),{role:'miner',renewing: false, task: "none", working: false, mySpawn: Game.spawns[spawn],source: 0});
                //console.log("Spawn attempted: " + result);
                //console.log("Body Composition: " + creepBody);
            } else if (creepCount["numLongDistanceHarvesters"] < 0  && (roomEnergy >= 200)){
                
                var creepBody = [];
                while(roomEnergy >= 250 && creepBody.length < 46){
                    creepBody.push(WORK); creepBody.push(CARRY); creepBody.push(MOVE); creepBody.push(MOVE);
                    
                    roomEnergy -= 250;
                }
                Game.spawns.Spawn1.createCreep(creepBody,'LD Harv ' + Game.time.toString(36),{role:'ldharvester',renewing: false, task: "none", working: false, mySpawn: Game.spawns[spawn], target: 0, sourceIndex: 0});
            }
        }
    }
    
};

module.exports = mainSpawn;
