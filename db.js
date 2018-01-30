let Sequelize = require('sequelize')

let sequelize = new Sequelize('WorkoutLog', 'postgres', 'nickman12', {
  host: 'localhost',
  dialect: 'postgres'
})

sequelize.authenticate().then(
  () => console.log('connected to WorkoutLog postgres db'),
  (err) => console.log(err)
)

module.exports = sequelize