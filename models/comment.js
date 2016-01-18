module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('comment', {
    comment : {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        notEmpty : true,
      }
    },

    object_id : {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : true,
      }
    },

    object_type : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true,
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
    paranoid : true,
    timestamps : false
  });

  return Comment;
};