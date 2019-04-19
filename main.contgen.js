var mainContainerGeneration = {
    
    run: function() {
        
        for(let spawn in Game.spawns){
            
            //  Place RC container
            let roomName = Game.spawns[spawn].room.name;
            
            /*let contPlaced = false;

            for(x=-1; x <= 1; x++){
                for(y=-1; y <= 1; y++){
                    if( (x==0) && (y!=-1) ){
                        y = 1;
                    }
                    
                    //console.log("x: " + x + " y: " + y);
                    
                    if(!contPlaced && (Game.map.getRoomTerrain(roomName).get(Game.spawns[spawn].room.controller.pos.x + x, Game.spawns[spawn].room.controller.pos.y + y) != TERRAIN_MASK_WALL)){
                        Game.spawns[spawn].room.createConstructionSite(Game.spawns[spawn].room.controller.pos.x + x, Game.spawns[spawn].room.controller.pos.y + y,STRUCTURE_CONTAINER);
                        contPlaced = true;
                        //console.log("Container placed at x: " + (Game.spawns[spawn].room.controller.pos.x + x) + " y: " + (Game.spawns[spawn].room.controller.pos.y + y));
                    } else if(contPlaced) {
                        x = 3; y = 3;
                    }
                }
            }*/
            
            
            

            //  Place Source containers

            let sourceList = Game.spawns[spawn].room.find(FIND_SOURCES);

            for(let source in sourceList){
                
                contPlaced = false;
            
                for(x=-1; x <= 1; x++){
                    for(y=-1; y <= 1; y++){
                        if( (x==0) && (y!=-1) ){
                            y = 1;
                        }
                        if(!contPlaced && (Game.map.getRoomTerrain(roomName).get(sourceList[source].pos.x + x,sourceList[source].pos.y + y) != TERRAIN_MASK_WALL)){
                            Game.spawns[spawn].room.createConstructionSite(sourceList[source].pos.x + x, sourceList[source].pos.y + y,STRUCTURE_CONTAINER);
                            contPlaced = true;
                            //console.log("Container placed at x: " + (sourceList[source].pos.x + x) + " y: " + (sourceList[source].pos.y + y));
                        } else if(contPlaced) {
                            x = 3; y = 3;
                        }
                    }
                }
                
            }
        }
        
        
    }
};

module.exports = mainContainerGeneration;
