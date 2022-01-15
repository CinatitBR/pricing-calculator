import sqlite from 'sqlite3';

const db = sqlite.Database('./financial_data.db');

const sql = `
  CREATE TABLE financial_data.product_data (
    product_cost REAL NOT NULL,
    sell_cost REAL NOT NULL,
    package_cost REAL NOT NULL,
    shipment_percentage REAL NOT NULL,
    seller_commission REAL NOT NULL,
    recommendation_commission REAL NOT NULL,
    taxes_percentage REAL NOT NULL,
    total_cost REAL NOT NULL
  );
`;

db.run(sql, (error) => {
  if (error){
    console.log(error)
    return;
  }

  console.log('TABELA CRIADA!');
});