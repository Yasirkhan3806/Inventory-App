import xlsx from 'xlsx';
import fs from 'fs';

// Load the Excel file
const workbook = xlsx.readFile('Inventory.xlsx');

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = xlsx.utils.sheet_to_json(sheet);

// Save to JSON file
fs.writeFileSync('output.json', JSON.stringify(data, null, 2));

console.log('Converted to JSON successfully!');
