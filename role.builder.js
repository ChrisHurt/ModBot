var roleUpgrader = require('role.upgrader');
var actionHarvest = require('action.harvest');
var actionBuild = require('action.build');
var actionRenew = require('action.renew');
var actionUpgrade = require('action.upgrade');
var actionWithdraw = require('action.withdraw');
var actionfillTower = require('action.filltower');
let actionRepair = require('action.repair');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!actionRenew.run(creep)){
            if(creep.memory.working == true && creep.carry.energy == 0){
                creep.memory.working = false;
                creep.memory.task = 'none';
            } else if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
                creep.memory.working = true;
                creep.memory.task = 'none';
            }
            
            let task = null;
            
            if(creep.memory.working == true){
                
                // First priority. Build construction sites.
                task = actionBuild.run(creep);
                
                if(!task){
                    
                    // Second priority. Reload towers.
                    task = actionfillTower.run(creep);
                    
                    if(!task){
                        
                        // Third Priority. Repair decayed structures.
                        task = actionRepair.run(creep);
                        if(!task){
                            
                            // Fourth Priority. Upgrade Controller.
                            task = actionUpgrade.run(creep);
                            
                            // No priority. Shouldn't be possible - upgrading is always in demand.
                            if(!task){
                                creep.say("No job?");
                            }
                        } 
                    }
                }
                
                
                
            } else {
                task = actionWithdraw.run(creep);
                
                if(!task){
                    task = actionHarvest.run(creep);
                }
            }
        }
	}
};

module.exports = roleBuilder;