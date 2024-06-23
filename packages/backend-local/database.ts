import sqlite3 from "sqlite3";
import { Database as DatabaseType } from "sqlite3";

export class Database {
  public readonly db: DatabaseType;

  constructor() {
    this.db = new sqlite3.Database(":memory:", (err) => {
      if (err) {
        return console.error(err.message);
      }

      console.log("Connected to the in-memory SQlite database.");
    });

    this.db.run(
      `CREATE TABLE transactions(
        key TEXT, 
        value TEXT, 
        hash TEXT,
        PRIMARY KEY(key),
        UNIQUE(hash)
      )`,
      (err) => {
        if (err) {
          return console.error(err.message);
        }

        console.log("Transactions table created.");
      }
    );
  }
}
