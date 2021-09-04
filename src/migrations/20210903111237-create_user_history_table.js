module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('user_history', {
      id: {
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      room_id: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'room',
          key: 'id',
        },
      },
      player1: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'user_game',
          key: 'id',
        },
      },
      player2: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'user_game',
          key: 'id',
        },
      },
      player1_choosen: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      player2_choosen: Sequelize.STRING,
      result: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('user_history');
  },
};
