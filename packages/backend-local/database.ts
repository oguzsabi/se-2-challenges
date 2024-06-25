import sqlite3 from "sqlite3";
import { Database as DatabaseType } from "sqlite3";

export class Database {
  public readonly db: DatabaseType;

  private readonly dbFilePath = './database.db';

  constructor() {
    this.db = new sqlite3.Database(this.dbFilePath, (err) => {
      if (err) {
        return console.error(err.message);
      }

      console.log("Connected to the in-memory SQlite database.");
    });

    this.createTransactionTable();
  }

  private createTransactionTable(): void {
    this.db.run('DROP TABLE IF EXISTS transactions', (err) => {
      if (err) {
        return console.error(err.message);
      }

      console.log("Transactions table dropped.");

      this.db.run(
        `CREATE TABLE transactions(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key TEXT, 
          value TEXT, 
          hash TEXT,
          UNIQUE(key, hash)
        )`,
        (err) => {
          if (err) {
            return console.error(err.message);
          }

          console.log("Transactions table created.");
        }
      );
    });
  }
}
