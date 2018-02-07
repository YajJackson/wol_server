module.exports = function(sequelize, DataTypes) {
  let Shoe = sequelize.define('shoe', {
    shoetype: DataTypes.STRING,
    shoename: DataTypes.STRING,
    shoeurl: DataTypes.STRING
  })
  return Shoe
}