var mainClearMem = {
    
    run: function() {
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
    }
};

module.exports = mainClearMem;
