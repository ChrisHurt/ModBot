var actionWithdraw = require('action.withdraw');
var actionUpgrade = require('action.upgrade');
var actionRenew = require('action.renew');
var actionBuild = require('action.build');
var actionHarvest = require('action.harvest');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!actionRenew.run(creep)){
            if(creep.memory.working == true && creep.carry.energy == 0){
                creep.memory.working = false;
            } else if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
                creep.memory.working = true;
            }
            
            let task = null;
            
            if(creep.memory.working == true){
                
                // Only priority. Upgrade Controller.
                task = actionUpgrade.run(creep);
                
                // No priority. Shouldn't be possible - upgrading is always in demand.
                if(!task){
                    creep.say("No job?");

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

module.exports = roleUpgrader;