'use strict';

import Sequelize from "sequelize";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('urls',{
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
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('urls')
  }
};
