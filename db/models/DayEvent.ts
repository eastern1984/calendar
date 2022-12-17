import { Model, DataTypes, Sequelize } from "sequelize";
import { CATEGORY, SAINT_TYPE, SERVICE_TYPE } from "../../interfaces/types";
import connection from "../connection";

export const getServiceType = (text: string) => {
  const index = SERVICE_TYPE.findIndex(v => v.name === text);
  return (index === -1) ? null : index;
}

export const getCategory = (text: string) => {
  const index = CATEGORY.findIndex(v => v === text);
  return (index === -1) ? null : index;
}

export const getSaintType = (text: string) => {
  const index = SAINT_TYPE.findIndex(v => v === text);
  return (index === -1) ? null : index;
}

const initDayEvent = (sequelize: Sequelize, Types: any) => {
  class DayEvent extends Model {
    static associate(models: any) { }
  }

  DayEvent.init(
    {
      date: Types.STRING,
      category: Types.INTEGER,
      serviceType: Types.INTEGER,
      saintType: Types.INTEGER,
      title_ru: Types.STRING,
      title_en: Types.STRING,
      year: Types.STRING,
    },
    {
      sequelize,
      modelName: "DayEvent",
      tableName: "dayevents",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return DayEvent;
};

export const getLangContentFromEvent = (lang: string, event: any) => ({
  category: event.category,
  serviceType: event.serviceType,
  saintType: event.saintType,
  title: (event as any)[`title_${lang}`],
  year: event.year
})

export default initDayEvent(connection as Sequelize, DataTypes);
