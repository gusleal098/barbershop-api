/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.removeColumn('dates', 'date');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('dates', 'date', {
      type: Sequelize.DATEONLY,
      allowNull: true
    });
  }
};
