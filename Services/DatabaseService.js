import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('filters');

const createTable = () => {
    // clear database
    db.transaction((tx) => {
        tx.executeSql(
          'DROP TABLE menu_items;'
        );
      }, (error) => {
        console.error('Transaction error:', error);
      }, () => {
        console.log('Transaction complete.');
      });
      // Recreate table
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS menu_items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, description TEXT, category TEXT, image TEXT, price REAL);'
    );
  });
};

const saveMenuItems = (menuItems) => {
    console.log('saving');
  
    if (!Array.isArray(menuItems)) {
      console.error('menuItems is not an array');
      return;
    }
  
    db.transaction((tx) => {
      menuItems.forEach((item) => {
        tx.executeSql(
            'INSERT OR IGNORE INTO menu_items (name, description, category, image, price) VALUES (?, ?, ?, ?, ?);',
            [item.name, item.description, item.category, item.image, item.price],
            (_, result) => {
              if (result.rowsAffected > 0) {
                // This callback will be called on successful execution or when the item already exists
                console.log('Insert successful or item already exists:', result);
              } else {
                // Log that the item was ignored due to duplicate name
                console.log('Item ignored (duplicate name):', item);
              }
            },
            (_, error) => {
              // This callback will be called on error
              console.error('Insert error:', error);
            }
          );
          
        });
  
      // Perform a SELECT query after all INSERTs
      tx.executeSql(
        'SELECT * FROM menu_items',
        [],
        (_, result) => {
          console.log('Selected data:', result.rows);
        },
        (_, error) => {
          console.error('Select error:', error);
        }
      );
    }, (error) => {
      console.error('Transaction error:', error);
    }, () => {
      console.log('Transaction complete.');
    });
  };
  
const toObject = (rows) => {
    const result = rows._array.map(item => {
        // Transform each row into a more readable object
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            image: item.image,
            price: item.price,
        };
    });
    return result;
};

const filterByCategory = (categories) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
          const categoriesString = Array(categories.length).fill('?').join(', ');
      
          tx.executeSql(
            `SELECT * FROM menu_items WHERE category IN (${categoriesString})`,
            categories,
            (_, { rows }) => {
              const resultArray = toObject(rows);
              resolve(resultArray);
              console.log("db", resultArray);
            },
            (_, error) => {
              reject(error);
              return false; // Returning false in case of an error to stop the transaction
            }
          );
        });
      });
};


const filterByNameAndCategory = (query, activeCategories) => {
    
    if (activeCategories){
        const categoriesString = Array(activeCategories.length).fill('?').join(', ');
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
              tx.executeSql(
                `SELECT * FROM menu_items WHERE name LIKE '%' || ? || '%' AND category IN (${categoriesString})`,
                  [`%${query}%`, ...activeCategories],
                (_, { rows }) => {
                  const resultArray = toObject(rows);
                  resolve(resultArray);
                },
                (_, error) => {
                  reject(error);
                  return true;
                }
              );
            });
          });
    } else {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
              tx.executeSql(
                  `SELECT * FROM menu_items WHERE name LIKE ?`,
                  [`%${query}%`],
                (_, { rows }) => {
                  const resultArray = toObject(rows);
                  resolve(resultArray);
                },
                (_, error) => {
                  reject(error);
                  return true;
                }
              );
            });
          });
    }
    
    
  };

export { createTable, saveMenuItems, filterByCategory, filterByNameAndCategory };
