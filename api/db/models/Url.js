import Sequelize from 'sequelize';
import sequelize from "../connection";

const Url = sequelize.define('url', {
    // attributes
    shortened_url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    original_url: {
        type: Sequelize.STRING(1234),
        allowNull: false,
        unique: true
    }
}, {
    // options
});

export default Url;