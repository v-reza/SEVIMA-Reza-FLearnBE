import { SequelizeOptions } from 'sequelize-typescript'

const sequelizeConfig: SequelizeOptions = {
  database: 'sevima_hackathon',
  username: 'sev_hack',
  password: 'Hackathon1234!',
  host: '147.139.182.64',
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  port: 3306,
}

export default sequelizeConfig