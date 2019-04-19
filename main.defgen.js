var mainDefenceGeneration = {
    
    run: function() {
        
        for(let spawn in Game.spawns){
            
            // Find free three by 
            //
            
            // Place tower
            
            //  Place RC container
            let roomName = Game.spawns[spawn].room.name;
            
            let towPlaced = false;
            let towViable = true;
            
            for(let x=-5; x <= 5; x++){
                for(let y=-5; y <= 5; y++){
                    if( ((x!=-5)||(x==5)) && (y!=-5) ){
                        y = 5;
                    }
                    
                    //console.log("x: " + x + " y: " + y);
                    
                    if(!towPlaced && (Game.map.getRoomTerrain(roomName).get(Game.spawns[spawn].pos.x + x, Game.spawns[spawn].pos.y + y) != TERRAIN_MASK_WALL)){
                        for(let x2=-1; x2 <= 1; x2++){
                            for(let y2=-1; y2 <= 1; y2++){
                                if(Game.map.getRoomTerrain(roomName).get(Game.spawns[spawn].pos.x + x + x2, Game.spawns[spawn].pos.y + y + y2) == TERRAIN_MASK_WALL){
                                    towViable = false;
                                }
                            }
                        }
                        
                        if(towViable){
                            Game.spawns[spawn].room.createConstructionSite(Game.spawns[spawn].pos.x + x, Game.spawns[spawn].pos.y + y,STRUCTURE_TOWER);
                            //console.log("Tower placed at x: " + (Game.spawns[spawn].pos.x + x) + " y: " + (Game.spawns[spawn].pos.y + y));
                            towPlaced = true;
                            for(let x2=-1; x2 <= 1; x2++){
                                for(let y2=-1; y2 <= 1; y2++){
                                        //console.log("x2: " + x2 + " y2: " + y2);
                                        Game.spawns[spawn].room.createConstructionSite(Game.spawns[spawn].pos.x + x + x2, Game.spawns[spawn].pos.y + y +y2,STRUCTURE_RAMPART);
                                }
                            }
                        }
                    } else if(towPlaced) {
                        x = 6; y = 6;
                    }
                }
            }
        }
        
        
    }
};

module.exports = mainDefenceGeneration;
