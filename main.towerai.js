var maintowerAI = {
    run: function() {    

        
        for(let spawn in Game.spawns){
            let towerList = Game.spawns[spawn].room.find(FIND_MY_STRUCTURES,{filter: function(object){return(  (object.structureType == STRUCTURE_TOWER))}});
            
            //let transferSubstrate = creep.room.find(FIND_STRUCTURES,{filter: function(object){return(  (object.structureType == STRUCTURE_CONTAINER)  && (object.pos.isNearTo(source)))}});
            
            for(let tower in towerList){

                if(towerList[tower]) {
                    let closestHostile = towerList[tower].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if(closestHostile) {
                        towerList[tower].attack(closestHostile);
                    }
                    let closestDamagedCreep = towerList[tower].pos.findClosestByRange(FIND_MY_CREEPS, {
                        filter: (creep) => (((creep.hits < creep.hitsMax)))
                    });
                    
                    if(closestDamagedCreep) {
                        towerList[tower].repair(closestDamagedCreep);
                    }
                    let closestDamagedStructure = towerList[tower].pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => (((structure.hits < 0.8 * structure.hitsMax)&&(structure.hits < 800000)) && (structure.my || structure.structureType == STRUCTURE_CONTAINER))
                    });
                    
                    if(closestDamagedStructure) {
                        towerList[tower].repair(closestDamagedStructure);
                    }
            

                }
            }
            
    
        }
    }
}
module.exports = maintowerAI;