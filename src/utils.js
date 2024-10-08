const fs = require('fs');
const csv = require('csv-parser');

// Função para ler arquivos CSV e transformar em um array de objetos
const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

module.exports = { readCSV };
