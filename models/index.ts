import { Sequelize } from 'sequelize-typescript';
import { mainDbConfig } from ':config';
import { clampSpaces } from ':helpers/stringUtils';

import { User } from './User';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: mainDbConfig.host,
  database: mainDbConfig.name,
  username: mainDbConfig.user,
  password: mainDbConfig.password,
  define: { underscored: true, timestamps: true, freezeTableName: true },

  // eslint-disable-next-line no-console
  logging: (sql) => console.log(
    sql
      .split('\n')
      .map((row) => clampSpaces(row))
      .filter((row) => !row.startsWith('--'))
      .join(' '),
  ),

  models: [
    User,
  ],
});


export {
  User,
};
