import { DataSource } from "typeorm";

export class Database {
  public static instance: Database;
  static appDataSource: any;

  constructor() {
	Database.appDataSource = new DataSource({
	  type: "mysql",
	  host: "localhost",
	  port: 3306,
	  username: "root",
	  password: "password",
	  database: "warehouse",
	  entities: ["src/**/*.entity.ts"],
	  synchronize: true,
	  logging: true,
	});

	// to initialize the initial connection with the database, register all entities
	// and "synchronize" database schema, call "initialize()" method of a newly created database
	// once in your application bootstrap
	Database.appDataSource
	  .initialize()
	  .then(() => {
		// here you can start to work with your database
	  })
	  .catch((error: any) => console.log(error));
  }

  static getInstance() {
	if (this.instance) {
	  return this.appDataSource;
	}
	this.instance = new Database();
	return this.appDataSource;
  }
}
