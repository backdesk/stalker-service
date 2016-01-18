var _ = require('lodash');

module.exports = function(sequelize, DataTypes) {
  var Lead = sequelize.define('lead', {
    created_at : DataTypes.DATE,

    updated_at : DataTypes.DATE,

    deleted_at : DataTypes.DATE,

    details : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true
      }
    },

    description : DataTypes.TEXT,

    status : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
      }
    },

    channel : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
      }
    }
  }, {
    underscored : true,
    paranoid : true
  });

  Lead.belongsTo(sequelize.models.source);

  return Lead;
};