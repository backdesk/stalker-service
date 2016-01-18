module.exports = function(sequelize, DataTypes) {
  var Source = sequelize.define('source', {
    created_at : {
      type: DataTypes.DATE,
      validate : {
        isDate: true,
      }
    },

    updated_at : {
      type: DataTypes.DATE,
      validate : {
        isDate: true,
      }
    },

    deleted_at : {
      type : DataTypes.DATE,
      validate : {
        isDate : true,
      }
    },

    name : {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true
      }
    },

    type : {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true,
      }
    },

    tickles : {
      type: DataTypes.INTEGER
    },

    scratches : {
      type: DataTypes.INTEGER
    },

    status : {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
      }
    },

    notes : DataTypes.TEXT,
    phone : DataTypes.STRING,
    company_id : DataTypes.INTEGER
  }, {
    underscored : true,
    paranoid : true
  });



  return Source;
};