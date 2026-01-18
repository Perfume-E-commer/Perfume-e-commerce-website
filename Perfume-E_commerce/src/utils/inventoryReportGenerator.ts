import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// Updated Interface to handle Variants
interface ProductVariant {
  size: string;
  stock: number;
  minStock?: number;
}

interface Product {
  name: string;
  brand: string;
  category: string;
  stock: number;
  minStockLevel?: number;
  variants?: ProductVariant[];
}

export const generateInventoryReport = (products: Product[]) => {
  const doc = new jsPDF()
  const today = new Date().toLocaleDateString()

  // --- 1. FLATTEN DATA (Handle Variants) ---
  // Convert hierarchical products into a flat list of SKUs
  const flatInventory = products.flatMap(p => {
    // If product has variants, create a row for each variant
    if (p.variants && p.variants.length > 0) {
      return p.variants.map(v => ({
        name: `${p.name} - ${v.size}`, // e.g. "Sauvage Dior - 100ml"
        brand: p.brand,
        category: p.category,
        stock: v.stock,
        minStock: v.minStock || p.minStockLevel || 5
      }))
    } 
    // Otherwise, just use the base product
    else {
      return [{
        name: p.name,
        brand: p.brand,
        category: p.category,
        stock: p.stock,
        minStock: p.minStockLevel || 5
      }]
    }
  })
  
  // --- 2. CALCULATE METRICS (Based on SKUs, not parent products) ---
  const totalSKUs = flatInventory.length
  const totalStock = flatInventory.reduce((sum, item) => sum + item.stock, 0)
  
  const lowStockItems = flatInventory.filter(item => item.stock > 0 && item.stock <= item.minStock).length
  const outOfStockItems = flatInventory.filter(item => item.stock === 0).length
  const inStockItems = totalSKUs - lowStockItems - outOfStockItems

  // Calculate Brand Breakdown
  const brandCounts: Record<string, number> = {}
  flatInventory.forEach(item => {
    brandCounts[item.brand] = (brandCounts[item.brand] || 0) + item.stock
  })
  
  // Get Top 3 Brands
  const topBrands = Object.entries(brandCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([brand, count]) => `${brand} (${count})`)
    .join(', ')

  // --- 3. HEADER SECTION ---
  doc.setFontSize(22)
  doc.setTextColor(40, 5, 89) // Brand Purple
  doc.text("ScentHaven", 14, 20)
  
  doc.setFontSize(12)
  doc.setTextColor(100)
  doc.text("Warehouse Inventory Report", 14, 28)
  
  doc.setFontSize(10)
  doc.text(`Generated: ${today}`, 196, 20, { align: 'right' })
  doc.text(`Total SKU: ${totalSKUs}`, 196, 25, { align: 'right' })
  doc.text(`Total Units: ${totalStock}`, 196, 30, { align: 'right' })

  doc.setLineWidth(0.5)
  doc.setDrawColor(200, 200, 200)
  doc.line(14, 35, 196, 35)

  // --- 4. SUMMARY DASHBOARD ---
  const avgStock = totalSKUs > 0 ? (totalStock / totalSKUs).toFixed(1) : '0'
  
  const summaryData = [
    ['In Stock', `${inStockItems} SKUs`, 'Top Brands (by units)'],
    ['Low Stock', `${lowStockItems} SKUs`, topBrands],
    ['Out of Stock', `${outOfStockItems} SKUs`, `Avg Stock/SKU: ${avgStock}`]
  ]

  autoTable(doc, {
    startY: 45,
    head: [['Metric', 'Count', 'Insights']],
    body: summaryData,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fontStyle: 'bold', textColor: [80, 80, 80] },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 40 },
      1: { cellWidth: 40 },
      2: { fontStyle: 'italic' }
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 0) {
        const text = data.cell.raw as string
        if (text.includes('In Stock')) data.cell.styles.textColor = [5, 150, 105] // Green
        if (text.includes('Low Stock')) data.cell.styles.textColor = [217, 119, 6] // Orange
        if (text.includes('Out of Stock')) data.cell.styles.textColor = [220, 38, 38] // Red
      }
    }
  })

  // --- 5. DETAILED INVENTORY TABLE ---
  
  const tableRows = flatInventory.map((item, index) => {
    let status = 'In Stock'
    let action = '-'
    
    if (item.stock === 0) {
      status = 'Out of Stock'
      action = 'RESTOCK ASAP'
    } else if (item.stock <= item.minStock) {
      status = 'Low Stock'
      action = 'Restock Recommended'
    }

    return [
      index + 1,
      item.name,
      item.brand,
      item.category,
      item.stock,
      status,
      action
    ]
  })

  // @ts-ignore
  const finalY = (doc as any).lastAutoTable.finalY + 15

  doc.setFontSize(14)
  doc.setTextColor(40, 5, 89)
  doc.text("Detailed Stock List (Including Variants)", 14, finalY - 5)

  autoTable(doc, {
    startY: finalY,
    head: [['#', 'Product Name', 'Brand', 'Cat', 'Stock', 'Status', 'Action Needed']],
    body: tableRows,
    theme: 'grid',
    headStyles: { 
      fillColor: [40, 5, 89],
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
      1: { cellWidth: 70 }, // Name (wider for variants)
      4: { halign: 'right', fontStyle: 'bold' },
    },
    didParseCell: (data) => {
      if (data.section === 'body') {
        const stock = (data.row.raw as any)[4] as number
        
        // Color the Status Text
        if (data.column.index === 5) { 
          if (stock === 0) data.cell.styles.textColor = [220, 38, 38]
          else if (stock <= 5) data.cell.styles.textColor = [217, 119, 6] 
          else data.cell.styles.textColor = [5, 150, 105]
        }

        // Bold Action Text
        if (data.column.index === 6 && stock === 0) {
            data.cell.styles.fontStyle = 'bold'
            data.cell.styles.textColor = [220, 38, 38]
        }
      }
    }
  })

  // --- 6. FOOTER ---
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

  // --- 7. SAVE ---
  const timestamp = new Date().toISOString().slice(0, 10)
  doc.save(`ScentHaven_Inventory_Report_${timestamp}.pdf`)
}