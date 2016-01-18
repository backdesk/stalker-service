module.exports = function(sequelize, DataTypes) {
  var Feed = sequelize.define('feed', {
    actor : {
      type : DataTypes.JSONB,
      allowNull : false,
      validate : {
        notEmpty : true
      }
    },

    verb : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true
      }
    },

    object : {
      type : DataTypes.JSONB,
      allowNull : false,
      validate : {
        notEmpty : true
      }
    },

    created_at :  {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
      }
    }
  }, {
    underscored : true,
    timestamps : false,
    tableName : 'feed',
    freezeTableName : true
  });

  return Feed;
};