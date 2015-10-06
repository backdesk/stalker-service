var config = {
    local : {
        port : 3333,
        session : {
            secret : 'uDnjlvqOGNzGsEEArWd9',
            resave : false,
            saveUninitialized : false,
            cookie : { httpOnly: true, maxAge: 2419200000 }
        },
        db : {
            uri : 'localhost/stalker'
        }
    }
};

module.exports = function (mode) {
    return config[mode || process.argv[2]] || config.local;
}