import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface Product {
  name: string;
  brand: string;
  category: string;
  stock: number;
}

export const generateInventoryReport = (products: Product[]) => {
  const doc = new jsPDF()
  const today = new Date().toLocaleDateString()
  
  // --- 1. CALCULATE METRICS ---
  const totalProducts = products.length
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const lowStockItems = products.filter(p => p.stock > 0 && p.stock <= 5).length
  const outOfStockItems = products.filter(p => p.stock === 0).length
  const inStockItems = totalProducts - lowStockItems - outOfStockItems

  // Calculate Brand Breakdown
  const brandCounts: Record<string, number> = {}
  products.forEach(p => {
    brandCounts[p.brand] = (brandCounts[p.brand] || 0) + p.stock
  })
  // Get Top 3 Brands
  const topBrands = Object.entries(brandCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([brand, count]) => `${brand} (${count})`)
    .join(', ')

  // --- 2. HEADER SECTION ---
  doc.setFontSize(22)
  doc.setTextColor(40, 5, 89) // Brand Purple
  doc.text("ScentHaven", 14, 20)
  
  doc.setFontSize(12)
  doc.setTextColor(100)
  doc.text("Warehouse Inventory Report", 14, 28)
  
  doc.setFontSize(10)
  doc.text(`Generated: ${today}`, 196, 20, { align: 'right' })
  doc.text(`Total SKU: ${totalProducts}`, 196, 25, { align: 'right' })
  doc.text(`Total Units: ${totalStock}`, 196, 30, { align: 'right' })

  doc.setLineWidth(0.5)
  doc.setDrawColor(200, 200, 200)
  doc.line(14, 35, 196, 35)

  // --- 3. SUMMARY DASHBOARD (Fixed: No Emojis, Added Colors) ---
  const summaryData = [
    ['In Stock', `${inStockItems} products`, 'Top Brands (by units)'],
    ['Low Stock (<= 5)', `${lowStockItems} products`, topBrands],
    ['Out of Stock', `${outOfStockItems} products`, `Avg Stock/Item: ${(totalStock/totalProducts || 0).toFixed(1)}`]
  ]

  autoTable(doc, {
    startY: 45,
    head: [['Metric', 'Count', 'Insights']],
    body: summaryData,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fontStyle: 'bold', textColor: [80, 80, 80] },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 40 }, // Metric Name
      1: { cellWidth: 40 }, // Count
      2: { fontStyle: 'italic' } // Insights
    },
    // ✅ NEW: Add color logic to the Summary Table
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 0) {
        const text = data.cell.raw as string
        if (text.includes('In Stock')) data.cell.styles.textColor = [5, 150, 105] // Green
        if (text.includes('Low Stock')) data.cell.styles.textColor = [217, 119, 6] // Orange
        if (text.includes('Out of Stock')) data.cell.styles.textColor = [220, 38, 38] // Red
      }
    }
  })

  // --- 4. DETAILED INVENTORY TABLE ---
  
  // Prepare Table Rows
  const tableRows = products.map((p, index) => {
    let status = 'In Stock'
    let action = '-'
    
    if (p.stock === 0) {
      status = 'Out of Stock'
      action = 'RESTOCK ASAP'
    } else if (p.stock <= 5) {
      status = 'Low Stock'
      action = 'Restock Recommended'
    }

    return [
      index + 1,
      p.name,
      p.brand,
      p.category,
      p.stock,
      status,
      action
    ]
  })

  // @ts-ignore
  const finalY = (doc as any).lastAutoTable.finalY + 15

  doc.setFontSize(14)
  doc.setTextColor(40, 5, 89)
  doc.text("Detailed Stock List", 14, finalY - 5)

  autoTable(doc, {
    startY: finalY,
    head: [['#', 'Product Name', 'Brand', 'Cat', 'Stock', 'Status', 'Action Needed']],
    body: tableRows,
    theme: 'grid',
    headStyles: { 
      fillColor: [40, 5, 89], // Brand Purple
      textColor: 255,
      fontSize: 9,
      halign: 'left'
    },
    styles: { 
      fontSize: 9, 
      valign: 'middle',
      cellPadding: 3
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 60 }, // Name
      4: { halign: 'right', fontStyle: 'bold' }, // Stock
    },
    // Dynamic styling for Status/Action cells
    didParseCell: (data) => {
      if (data.section === 'body') {
        const stock = data.row.raw[4] as number 
        
        // Color the Status Text
        if (data.column.index === 5) { 
          if (stock === 0) data.cell.styles.textColor = [220, 38, 38] // Red
          else if (stock <= 5) data.cell.styles.textColor = [217, 119, 6] // Orange
          else data.cell.styles.textColor = [5, 150, 105] // Green
        }

        // Bold the Action Text if Urgent
        if (data.column.index === 6 && stock === 0) {
            data.cell.styles.fontStyle = 'bold'
            data.cell.styles.textColor = [220, 38, 38]
        }
      }
    }
  })

  // --- 5. FOOTER ---
  const pageCount = doc.getNumberOfPages()
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.text(
      `Report generated from ScentHaven Admin System • Page ${i} of ${pageCount}`, 
      105, 
      290, 
      { align: 'center' }
    )
  }

  // --- 6. SAVE ---
  const timestamp = new Date().toISOString().slice(0, 10)
  doc.save(`ScentHaven_Inventory_Report_${timestamp}.pdf`)
}