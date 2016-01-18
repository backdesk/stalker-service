var config = {
  local : {
    port : 3333,
    db : {
      host : 'localhost',
      name : 'stalker',
      username : 'postgres',
      password : ''
    }
  },
  production : {
    port : process.env.PORT,
    db: {
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      username : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD 
    }  
  }
};

module.exports = function (mode) {
  return config[mode] || config.local;
}