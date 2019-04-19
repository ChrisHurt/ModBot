var actionRenew = {
    
    run: function(creep) {
        
        if(creep.memory.renewing){
            
            creep.memory.working = false;
            
            //console.log("creep.memory.mySpawn is: " + creep.memory.mySpawn);
            //console.log("creep.memory.mySpawn.name" + creep.memory.mySpawn.name);
            var renewAttempt = Game.spawns[creep.memory.mySpawn.name].renewCreep(creep);

            if(renewAttempt == ERR_NOT_IN_RANGE){
              creep.moveTo(Game.spawns[creep.memory.mySpawn.name]);
            } else if(renewAttempt == ERR_FULL || (renewAttempt == ERR_NOT_ENOUGH_ENERGY && creep.ticksToLive > 300 && !creep.transfer(Game.spawns[creep.memory.mySpawn.name] ,RESOURCE_ENERGY))){
                  creep.memory.renewing = false;
            } 
            
            return true;
            
        } else if(creep.ticksToLive < 75 || (creep.ticksToLive < 150 && creep.memory.role == "miner")){
            const harvesterUnitCost = 250,
                  builderUnitCost = 250,
                  upgraderUnitCost = 250
                  minerUnitCost = 350;
            
            switch(creep){
                
            }
    
            var spawn;
            var smallestDistance = Infinity;
            var distance;
            
            for(var spawnLocation in Game.spawns){
                if(creep.room == Game.spawns[spawnLocation].room){
                    if(Game.spawns[spawnLocation].pos.y == creep.pos.y){
                        distance = Math.abs(Game.spawns[spawnLocation].pos.x - creep.pos.x);
                    } else if(Game.spawns[spawnLocation].pos.x == creep.pos.x){
                        distance = Math.abs(Game.spawns[spawnLocation].pos.y - creep.pos.y);
                    } else {
                        distance = ( Math.sqrt(Math.pow((Game.spawns[spawnLocation].pos.y - creep.pos.y),2) / Math.pow((Game.spawns[spawnLocation].pos.x - creep.pos.x),2)));
                    }
                    //console.log("distance to spawn: " + distance);
                    if(distance < smallestDistance){
                        smallestDistance = distance;
                        spawn = spawnLocation;
                    }
                } 
            }
            
            if(Game.spawns[spawn] != undefined){
                var spawnEnergy = Game.spawns[spawn].energy;
                var structureList = Game.spawns[spawn].room.find(  FIND_MY_STRUCTURES , {filter: function(object) {return(object.structureType == STRUCTURE_EXTENSION)}} );
        
                for(var structure in structureList)    {
                    if(structureList[structure].structureType == STRUCTURE_EXTENSION){
                        spawnEnergy += structureList[structure].energy;
                    }  
                }
            } else {
                spawnEnergy = 0;
            }
            //console.log("spawnEnergy is: " + spawnEnergy);
                
            var bodyCost = 0;
            for(var bodyPart in creep.body){
                bodyCost += BODYPART_COST[creep.body[bodyPart].type];
            }
            
            var unitCost;
            switch(creep.memory.role){
                case "harvester":
                    unitCost = harvesterUnitCost;
                    break;
                case "upgrader":
                    unitCost = upgraderUnitCost;
                    break;
                case "builder":
                    unitCost = builderUnitCost;
                    break;
                case "miner":
                    unitCost = minerUnitCost;
                    break;
                default:
                    unitCost = harvesterUnitCost;
                    break;
            }
            
            if(Game.spawns[spawn] != undefined){
                if(bodyCost + unitCost >= spawnEnergy){
                    let renewAttempt = Game.spawns[spawn].renewCreep(creep);
                    //console.log("Renew Attempted, Outcome: " + renewAttempt);
                    if(renewAttempt == OK){
                        creep.say("Elixer!");
                        creep.memory.renewing = true;
                    } else if(renewAttempt == ERR_NOT_IN_RANGE){
                        creep.moveTo( Game.spawns[spawn]);
                        //creep.say("Renewing...");
                        return true;
                    } else if(renewAttempt == ERR_FULL){
                        //creep.say("Immortality!");
                        return false;
                    } else if(renewAttempt == ERR_NOT_ENOUGH_ENERGY){
                        creep.say("Wait");
                        return true;
                    } else {
                        creep.moveTo( Game.spawns[spawn]);
                        //creep.say("Renew fail!");
                        return true;
                    }
        
                } else {
                     let recycleAttempt = Game.spawns[spawn].recycleCreep(creep);
                    //console.log("Recycle Attempted, Outcome: " + recycleAttempt);
                    if(recycleAttempt == OK){
                        //console.log("Creep recycled");
                    } else if(recycleAttempt == ERR_NOT_IN_RANGE){
                        creep.moveTo( Game.spawns[spawn]);
                        creep.say("Renewing...");
                        return true;
                    } else if(recycleAttempt == ERR_FULL){
                        creep.say("Immortality!");
                        return false;
                    } else if(recycleAttempt == ERR_NOT_ENOUGH_ENERGY){
                        creep.say("Renew_Wait");
                        return true;
                    } else {
                        creep.moveTo( Game.spawns[spawn]);
                        //creep.say("Renew fail!");
                        return true;
                    }
                }
            } else {
                creep.say("No Home :'(")
            }
            return false;
        }
        // unsure of this
        return false;
    }
};

module.exports = actionRenew;
