var mainCreepExecute = require('main.creepexecute');
var mainSpawn = require('main.spawn');
var mainClearMem = require('main.clearmem');
var mainExtensionGeneration = require('main.extgen');
var mainContainerGeneration = require('main.contgen');
var mainDefenceGeneration = require('main.defgen');
var mainTowerAI = require('main.towerai');

module.exports.loop = function () {
    mainClearMem.run();
    mainSpawn.run(mainCreepExecute.run());
    mainExtensionGeneration.run();
    
    //if(numMiners > 0)
    mainContainerGeneration.run();

    mainDefenceGeneration.run();
    mainTowerAI.run();
}