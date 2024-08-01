/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.removeColumn('times', 'time');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('times', 'time', {
      type: Sequelize.TIME,
      allowNull: true
    });
  }
};
