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

    // Trigger para inserção
    await database.execAsync(`
      CREATE TRIGGER IF NOT EXISTS after_insert_ducks
      AFTER INSERT ON ducks
      BEGIN
        UPDATE ducks
        SET status = NEW.hungry + NEW.joy + NEW.sleep
        WHERE id = NEW.id;
      END;
    `);

    // Trigger para atualização
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

// function getPatoImage(type) {
//     switch(type) {
//       case 'yellow':
//         return require('./path/to/yellow.png');
//       case 'mallard':
//         return require('./path/to/mallard.png');
//       case 'green':
//         return require('./path/to/green.png');
//       case 'purple':
//         return require('./path/to/purple.png');
//       default:
//         return require('./path/to/default.png'); // Caso o tipo seja inválido
//     }
//   }
  
//   // Exemplo de uso:
//   const patoType = 'yellow'; // Suponha que este seja o valor recuperado do banco de dados
//   const patoImage = getPatoImage(patoType);

// const patoImages = {
//     yellow: require('./path/to/yellow.png'),
//     mallard: require('./path/to/mallard.png'),
//     green: require('./path/to/green.png'),
//     purple: require('./path/to/purple.png'),
//   };
  
//   function getPatoImage(type) {
//     return patoImages[type] || patoImages.default;
//   }