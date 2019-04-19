let actionBuild = {
    
    run: function(creep) {
        
        // Find the closest construction site
        let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        
        // Is there a valid construction site?
        if(constructionSite != undefined){
            
            // Build the construction site
            let result = creep.build(constructionSite);
            if(result == OK){
                
                // Build action successful
                return true;
                
            // Was the construction site in range?
            } else if(result == ERR_NOT_IN_RANGE){
                
                // Move to the construction site
                creep.moveTo(constructionSite);
                
                // Move action successful
                return true;
                
            } else {
                
                // Build action failure, say why.
                creep.say("B: " + result);
                
                return false;
                
            }
        }
        
        // No construction Site
        return false;
    }
};

module.exports = actionBuild;


