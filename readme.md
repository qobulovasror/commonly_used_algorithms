# commonly used algorithms

1. filter items
   ```js
    const rows = [];
        this.props.products.forEach((product) => {
            if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                return;
            }
            if (inStockOnly && !product.stocked) {
                return;
            }
            rows.push(<ProductRow product={product} key={product.name} /> );
        });
   ```
3. read, translate and write sql db
   ```js
   const mysql = require('mysql');
   // Ma'lumotlar bazasiga ulanish uchun konfiguratsiya
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'your_database_user',
      password: 'your_database_password',
      database: 'your_database_name',
    });

    // Ma'lumotlar bazasiga ulanish
    connection.connect((err) => {
      if (err) {
        console.error('Xatolik yuz berdi: ', err);
        return;
      }
      console.log('Ma\'lumotlar bazasiga muvaffaqiyatli ulanildi!');
    });
    
    // Ma'lumotlar bazasidan so'rov yuborish
    const sqlQuery = 'SELECT * FROM your_table_name';
    connection.query(sqlQuery, (err, result) => {
      if (err) {
        console.error('So\'rov yakunlanishida xatolik: ', err);
        return;
      }
      console.log('Javob: ', result);
    });
    
    // Ulanishni yopish
    connection.end((err) => {
      if (err) {
        console.error('Ulanishni yopishda xatolik: ', err);
        return;
      }
      console.log('Ma\'lumotlar bazasi bilan muvaffaqiyatli ravishda aloqa yopildi!');
    });
    ```
