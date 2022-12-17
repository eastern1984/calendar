import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initDayContent = (sequelize: any, Types: any) => {
  class DayContent extends Model {
    static associate(models: any) { }
  }

  DayContent.init(
    {
      name: Types.STRING,
    },
    {
      sequelize,
      modelName: "DayContent",
      tableName: "daycontents",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return DayContent;
};

export default initDayContent(connection, DataTypes);
