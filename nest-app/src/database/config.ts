import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default {
	type: "mysql",
	host: "database",
	port: 3306,
	username: "user",
	password: "password",
	database: "instant2reve",
	synchronize: true,
	autoLoadEntities: true,
	entities: [ "dist/**/**.entity{.ts,.js}" ]
} as TypeOrmModuleOptions;
