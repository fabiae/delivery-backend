import { registerAs } from "@nestjs/config"

export default registerAs('typeorm', () => {

  const configExample = {
    type: process.env.DB_TYPE, 
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: ['dist/entities/example/*.entity{.js,.ts}']
  }

  //ts-node in develop
  //entities: [ process.env.NODE_ENV === 'local' ? 'src/entities/**/*.entity{.ts,.js}' : 'dist/entities/**/*.entity{.js,.ts}' ]

  return {
    example: {
      ...configExample
    }
  }
})