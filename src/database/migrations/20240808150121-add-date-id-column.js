/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('times', 'date_id', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'dates',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('times', 'date_id');
  }
};
