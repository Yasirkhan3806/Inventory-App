export const convertToCsv = (data) => {
  if (!data || data.length === 0) return;
  // Get the headers from the first object
  const headers = ['name', 'category', 'quantity'];
  
  const csvRows = [];

  // Add header row
  csvRows.push(headers.join(','));

  // Add data rows
  for (const item of data) {
    const row = headers.map(header => {
      // Escape quotes and commas
      const cell = item[header] ?? '';
      return `"${String(cell).replace(/"/g, '""')}"`;
    });
    csvRows.push(row.join(','));
  }

  // Create CSV blob
  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  // Create temporary link and trigger download
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'low_stock_items.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const convertToPdf = (data) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Low Stock Items Report", 14, 20);

  // Define columns and rows
  const headers = [["Name", "Quantity", "Threshold"]];
  const rows = data.map(item => [
    item.name,
    item.quantity,
    item.minimumAmount
  ]);

  // Generate the table
  autoTable(doc, {
    startY: 30,
    head: headers,
    body: rows,
    theme: "striped", // or 'grid' or 'plain'
    headStyles: { fillColor: [22, 160, 133] }, // Teal header
  });

  // Save the PDF
  doc.save("low_stock_items.pdf");
};


