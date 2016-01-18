var config = {
    local : {
        port : 3333,
        db : {
            uri : 'localhost/stalker'
        }
    }
};

module.exports = function (mode) {
    return config[mode || process.argv[2]] || config.local;
}