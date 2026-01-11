import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const generateInvoice = (order: any) => {
  const doc = new jsPDF()
  
  // Brand Color: #280559 (R:40, G:5, B:89)
  const brandColor = [40, 5, 89] as [number, number, number]

  // --- HEADER ---
  doc.setFontSize(20)
  doc.setTextColor(...brandColor)
  doc.text("INVOICE", 150, 20, { align: 'right' })

  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text("ScentHaven Perfumes", 14, 20)
  doc.text("123 Fragrance Blvd, Phnom Penh", 14, 25)
  doc.text("support@scenthaven.com", 14, 30)

  // --- ORDER INFO ---
  const orderNum = order.orderNumber || '#' + order.id.slice(-6).toUpperCase()
  const orderDate = new Date(order.createdAt).toLocaleDateString()

  doc.setFontSize(10)
  doc.setTextColor(0)
  
  // Right side info
  doc.text(`Invoice #: ${orderNum}`, 150, 40, { align: 'right' })
  doc.text(`Date: ${orderDate}`, 150, 45, { align: 'right' })
  doc.text(`Status: ${order.paymentStatus || 'UNPAID'}`, 150, 50, { align: 'right' })

  // --- BILL TO / SHIP TO ---
  doc.setFontSize(11)
  doc.setTextColor(...brandColor)
  doc.text("Bill To / Ship To:", 14, 45)

  doc.setFontSize(10)
  doc.setTextColor(0)
  const name = order.shippingAddress?.fullName || order.user?.username || 'Guest'
  const email = order.userEmail || order.email || 'N/A'
  const street = order.shippingAddress?.street || ''
  const city = order.shippingAddress?.city || ''
  const zip = order.shippingAddress?.zipCode || ''
  const phone = order.shippingAddress?.phoneNumber || ''

  doc.text(name, 14, 52)
  doc.text(email, 14, 57)
  doc.text(phone, 14, 62)
  if (street) doc.text(`${street}, ${city} ${zip}`, 14, 67)

  // --- ITEMS TABLE ---
  const tableRows = order.items.map((item: any) => [
    item.productName,
    item.quantity,
    `$${item.price.toFixed(2)}`,
    `$${(item.price * item.quantity).toFixed(2)}`
  ])

  autoTable(doc, {
    startY: 80,
    head: [['Item Description', 'Qty', 'Price', 'Total']],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: brandColor },
    columnStyles: {
      1: { halign: 'center' },
      2: { halign: 'right' },
      3: { halign: 'right' }
    }
  })

  // --- TOTALS ---
  // @ts-ignore
  let finalY = doc.lastAutoTable.finalY + 10

  const subtotal = order.totalAmount + (order.discountAmount || 0)
  const discount = order.discountAmount || 0
  const total = order.totalAmount

  doc.text(`Subtotal:`, 140, finalY, { align: 'right' })
  doc.text(`$${subtotal.toFixed(2)}`, 180, finalY, { align: 'right' })

  if (discount > 0) {
    finalY += 6
    doc.setTextColor(220, 38, 38) // Red for discount
    doc.text(`Discount:`, 140, finalY, { align: 'right' })
    doc.text(`-$${discount.toFixed(2)}`, 180, finalY, { align: 'right' })
  }

  finalY += 8
  doc.setFontSize(12)
  doc.setTextColor(0)
  doc.setFont("helvetica", "bold")
  doc.text(`Total:`, 140, finalY, { align: 'right' })
  doc.text(`$${total.toFixed(2)}`, 180, finalY, { align: 'right' })

  // --- SAVE ---
  doc.save(`Invoice_${orderNum}.pdf`)
}