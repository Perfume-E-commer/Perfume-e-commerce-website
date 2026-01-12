import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const generateInvoice = (order: any) => {
  const doc = new jsPDF()
  
  // Brand Color: #280559 (R:40, G:5, B:89)
  const brandColor = [40, 5, 89]
  const lightGray = [249, 250, 251]
  const darkGray = [107, 114, 128]
  const greenColor = [34, 197, 94]
  const redColor = [239, 68, 68]

  // --- HEADER SECTION ---
  // Brand header with color block
  doc.setFillColor(brandColor[0], brandColor[1], brandColor[2])
  doc.rect(0, 0, 210, 35, 'F')
  
  // Company name in white
  doc.setFontSize(22)
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.text("ScentHaven", 20, 22)
  
  // Subtitle (lighter white)
  doc.setFontSize(10)
  doc.setTextColor(230, 230, 230)
  doc.setFont("helvetica", "normal")
  doc.text("Premium Fragrances", 20, 28)

  // Invoice title
  doc.setFontSize(28)
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.text("INVOICE", 180, 25, { align: 'right' })

  // --- INVOICE DETAILS ---
  const orderNum = order.orderNumber || '#' + order.id.slice(-6).toUpperCase()
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const invoiceDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Calculate totals
  const subtotal = order.totalAmount + (order.discountAmount || 0)
  const discount = order.discountAmount || 0
  const total = order.totalAmount

  // Invoice details box
  doc.setFillColor(255, 255, 255)
  doc.setDrawColor(brandColor[0], brandColor[1], brandColor[2])
  doc.setLineWidth(0.5)
  doc.roundedRect(130, 40, 70, 28, 3, 3, 'FD')
  
  doc.setFontSize(9)
  doc.setTextColor(brandColor[0], brandColor[1], brandColor[2])
  doc.setFont("helvetica", "bold")
  doc.text("INVOICE #", 135, 47)
  doc.text("DATE", 135, 54)
  doc.text("DUE DATE", 135, 61)
  
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "normal")
  doc.text(orderNum, 195, 47, { align: 'right' })
  doc.text(invoiceDate, 195, 54, { align: 'right' })
  doc.text(orderDate, 195, 61, { align: 'right' })

  // --- BILLING & SHIPPING INFORMATION ---
  const startY = 75
  
  // Billing section header
  doc.setFontSize(12)
  doc.setTextColor(brandColor[0], brandColor[1], brandColor[2])
  doc.setFont("helvetica", "bold")
  doc.text("BILL TO", 20, startY)
  
  // Shipping section header
  doc.text("SHIP TO", 110, startY)
  
  // Billing section content
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "normal")
  
  const name = order.shippingAddress?.fullName || (order.user?.firstName ? `${order.user.firstName} ${order.user.lastName || ''}`.trim() : 'Guest Customer')
  const email = order.userEmail || order.email || order.user?.email || 'N/A'
  const addressLine1 = order.shippingAddress?.addressLine1 || order.shippingAddress?.street || ''
  const addressLine2 = order.shippingAddress?.addressLine2 || ''
  const city = order.shippingAddress?.city || ''
  const postalCode = order.shippingAddress?.postalCode || order.shippingAddress?.zipCode || ''
  const phone = order.shippingAddress?.phoneNumber || order.user?.phone || ''
  const country = order.shippingAddress?.country || ''

  let currentY = startY + 7
  doc.text(name, 20, currentY)
  
  // Ship to information
  let shipY = startY + 7
  if (order.shippingAddress && Object.keys(order.shippingAddress).length > 0) {
    const shipName = order.shippingAddress.fullName || name
    const shipAddress1 = order.shippingAddress.addressLine1 || order.shippingAddress.street || ''
    const shipAddress2 = order.shippingAddress.addressLine2 || ''
    const shipCity = order.shippingAddress.city || ''
    const shipPostalCode = order.shippingAddress.postalCode || order.shippingAddress.zipCode || ''
    const shipPhone = order.shippingAddress.phoneNumber || phone
    const shipCountry = order.shippingAddress.country || ''
    
    doc.text(shipName, 110, shipY)
    shipY += 6
    
    if (shipPhone && shipPhone !== phone) {
      doc.text(`Phone: ${shipPhone}`, 110, shipY)
      shipY += 6
    }
    
    if (shipAddress1) {
      doc.text(shipAddress1, 110, shipY)
      shipY += 6
    }
    
    if (shipAddress2) {
      doc.text(shipAddress2, 110, shipY)
      shipY += 6
    }
    
    if (shipCity || shipPostalCode) {
      const shipCityZip = `${shipCity}${shipCity && shipPostalCode ? ', ' : ''}${shipPostalCode}`
      doc.text(shipCityZip, 110, shipY)
      shipY += 6
    }
    
    if (shipCountry) {
      doc.text(shipCountry, 110, shipY)
      shipY += 6
    }
  } else {
    doc.text("Same as billing address", 110, shipY)
  }

  // Continue billing information
  currentY += 6
  if (email) {
    doc.text(email, 20, currentY)
    currentY += 6
  }
  
  if (phone) {
    doc.text(`Phone: ${phone}`, 20, currentY)
    currentY += 6
  }
  
  if (addressLine1) {
    doc.text(addressLine1, 20, currentY)
    currentY += 6
  }
  
  if (addressLine2) {
    doc.text(addressLine2, 20, currentY)
    currentY += 6
  }
  
  if (city || postalCode) {
    const cityZip = `${city}${city && postalCode ? ', ' : ''}${postalCode}`
    doc.text(cityZip, 20, currentY)
    currentY += 6
  }
  
  if (country) {
    doc.text(country, 20, currentY)
    currentY += 6
  }

  // --- ITEMS TABLE ---
  const tableStartY = Math.max(currentY, shipY) + 10
  
  // Using autoTable for better layout control
  autoTable(doc, {
    startY: tableStartY,
    head: [['#', 'Description', 'Unit Price', 'Qty', 'Total']],
    body: order.items.map((item: any, index: number) => [
      (index + 1).toString(),
      item.productName || item.name || 'Product',
      `$${(item.price || 0).toFixed(2)}`,
      (item.quantity || 1).toString(),
      `$${((item.price || 0) * (item.quantity || 1)).toFixed(2)}`
    ]),
    theme: 'grid',
    styles: { 
      cellPadding: 5,
      fontSize: 10,
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      halign: 'left', // Default alignment
      valign: 'middle'
    },
    headStyles: {
      fillColor: brandColor,
      textColor: [255, 255, 255],
      fontSize: 11,
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: lightGray
    },
    columnStyles: {
      0: { cellWidth: 15, halign: 'center' }, // #
      1: { cellWidth: 90, halign: 'left' },     // Description
      2: { cellWidth: 25, halign: 'right' },    // Unit Price
      3: { cellWidth: 15, halign: 'center' },   // Qty
      4: { cellWidth: 25, halign: 'right' }     // Total
    },
    // CENTER THE TABLE HORIZONTALLY
    margin: { left: 20, right: 20 } // This centers the table between left=20 and right=20
  });

  const finalY = (doc as any).lastAutoTable.finalY;

  // --- TOTALS SECTION ---
  const totalsY = finalY + 15
  
  // Calculate box height based on whether there's a discount
  const boxHeight = discount > 0 ? 45 : 35
  
  // Totals box
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
  doc.setDrawColor(brandColor[0], brandColor[1], brandColor[2])
  doc.setLineWidth(0.5)
  doc.roundedRect(120, totalsY, 70, boxHeight, 5, 5, 'FD')

  doc.setFontSize(11)
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFont("helvetica", "normal")

  // Align labels to the left, values to the right within the box
  doc.text("Subtotal:", 135, totalsY + 10, { align: 'left' })
  doc.text(`$${subtotal.toFixed(2)}`, 185, totalsY + 10, { align: 'right' })

  if (discount > 0) {
    doc.setTextColor(greenColor[0], greenColor[1], greenColor[2])
    doc.text("Discount:", 135, totalsY + 18, { align: 'left' })
    doc.text(`-$${discount.toFixed(2)}`, 185, totalsY + 18, { align: 'right' })
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]) // Reset color
  }

  // Separator line
  const lineY = totalsY + (discount > 0 ? 26 : 18)
  doc.setDrawColor(brandColor[0], brandColor[1], brandColor[2])
  doc.setLineWidth(0.5)
  doc.line(125, lineY, 185, lineY)

  // Total - label left, value right
  doc.setFontSize(14)
  doc.setTextColor(brandColor[0], brandColor[1], brandColor[2])
  doc.setFont("helvetica", "bold")
  doc.text("Total:", 135, lineY + 10, { align: 'left' })
  doc.text(`$${total.toFixed(2)}`, 185, lineY + 10, { align: 'right' })

  // Payment status badge
  const paymentStatus = order.paymentStatus || 'PAID'
  const statusBgColor = paymentStatus === 'PAID' ? greenColor : redColor
  
  doc.setFillColor(statusBgColor[0], statusBgColor[1], statusBgColor[2])
  doc.roundedRect(20, totalsY, 40, 12, 6, 6, 'F')
  
  doc.setFontSize(9)
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.text(paymentStatus, 40, totalsY + 8, { align: 'center' })

  // Payment method if available
  if (order.paymentMethod) {
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.setFont("helvetica", "normal")
    doc.text(`Paid via: ${order.paymentMethod}`, 20, totalsY + 22)
  }

  // --- FOOTER ---
  const pageHeight = doc.internal.pageSize.height
  const footerY = pageHeight - 30
  
  // Footer separator
  doc.setDrawColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setLineWidth(0.3)
  doc.line(20, footerY, 190, footerY)
  
  // Company info
  doc.setFontSize(8)
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFont("helvetica", "normal")
  
  doc.text("ScentHaven Perfumes", 20, footerY + 6)
  doc.text("123 Fragrance Boulevard, Phnom Penh, Cambodia", 20, footerY + 11)
  doc.text("support@scenthaven.com • +855 23 123 456", 20, footerY + 16)
  
  // Terms
  doc.text("Terms: Payment due upon receipt", 190, footerY + 6, { align: 'right' })
  doc.text("Thank you for your business!", 190, footerY + 11, { align: 'right' })
  
  // Page number
  doc.text(`Invoice ${orderNum} • ${invoiceDate}`, 105, footerY + 16, { align: 'center' })

  // --- SAVE ---
  doc.save(`Invoice_${orderNum}.pdf`)
}