/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.removeColumn('times', 'date');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('times', 'date', {
      type: Sequelize.DATEONLY,
      allowNull: true
    });
  }
};
