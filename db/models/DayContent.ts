import { Model, DataTypes } from "sequelize";
import connection from "../connection";

export interface IContent {
  weekInfo: string,
  description: string,
  readings: string,
  lang: string;
  events: {
    category: number;
    serviceType: number;
    saintType: number;
    title: string;
    year: string;
  }[]
}

export interface IDayContent {
  id?: number,
  date: string,
  content: IContent[]
}

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
