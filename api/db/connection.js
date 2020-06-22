import Sequelize from 'sequelize';

// Option 1: Passing parameters separately
/*const sequelize = new Sequelize('klass-7', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
});*/

const sequelize = new Sequelize('postgres://postgres:password@127.0.0.1:5433/database');

export default sequelize;