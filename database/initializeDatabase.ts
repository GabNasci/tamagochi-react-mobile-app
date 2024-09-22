import { type SQLiteDatabase } from "expo-sqlite"

export async function initializeDatabase(database: SQLiteDatabase) {

    // await database.execAsync(`
    //   DROP TABLE IF EXISTS ducks;
    // `);

    

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS ducks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        status INTEGER,
        hungry INTEGER NOT NULL,
        joy INTEGER NOT NULL,
        sleep INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    
      );
    `);

    await database.execAsync(`
      CREATE TRIGGER IF NOT EXISTS after_insert_ducks
      AFTER INSERT ON ducks
      BEGIN
        UPDATE ducks
        SET status = NEW.hungry + NEW.joy + NEW.sleep
        WHERE id = NEW.id;
      END;
    `);

    await database.execAsync(`
      CREATE TRIGGER IF NOT EXISTS after_update_ducks
      AFTER UPDATE OF hungry, joy, sleep ON ducks
      BEGIN
        UPDATE ducks
        SET status = NEW.hungry + NEW.joy + NEW.sleep
        WHERE id = NEW.id;
      END;
    `);
}
