/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "DayEvents",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        date: {
          type: Sequelize.STRING,
        },
        category: {
          type: Sequelize.INTEGER,
        },
        serviceType: {
          type: Sequelize.INTEGER,
        },
        saintType: {
          type: Sequelize.INTEGER,
        },
        title_ru: {
          type: Sequelize.TEXT,
        },
        title_en: {
          type: Sequelize.TEXT,
        },
        year: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DayEvents");
  },
};
