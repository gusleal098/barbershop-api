/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'phone_number', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'N/A'
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('users', 'phone_number');
  }
};
