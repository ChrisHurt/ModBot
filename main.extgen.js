var mainExtensionGeneration = {
    
    run: function() {
        
        //const extAvail = [0,0,]
        
        for(let spawn in Game.spawns){
            // Setting a 3-thick road buffer around the controller
            let roomName = Game.spawns[spawn].room.name;
            
            for(let x = -3; x<=3; x++){
                for(let y = -3; y<=3; y++){
                    if(Game.map.getRoomTerrain(roomName).get(Game.spawns[spawn].pos.x + x,Game.spawns[spawn].pos.y + y) != TERRAIN_MASK_WALL){
                        if(((Math.abs(x % 2) == 1 && Math.abs(y % 2) == 1)||(Math.abs(x % 2) == 0 && Math.abs(y % 2) == 0)) && (x != y && y != 0)){
                            Game.spawns[spawn].room.createConstructionSite(Game.spawns[spawn].pos.x + x, Game.spawns[spawn].pos.y + y,STRUCTURE_EXTENSION);
                        }
                    }
                }   
            }
        }
        
        
    }
};

module.exports = mainExtensionGeneration;
