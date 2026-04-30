import React, { useState, useEffect } from 'react';
import swadLogo from '../assets/swad-logo.png';
import qrCode from '../assets/qr-code.jpeg';
import './Invoice.css';

const Invoice = () => {
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [invoiceNo, setInvoiceNo] = useState('001');
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [items, setItems] = useState([{ id: 1, description: '', qty: 1, rate: 0 }]);

    const addItem = () => {
        setItems([...items, { id: items.length + 1, description: '', qty: 1, rate: 0 }]);
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const updateItem = (id, field, value) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const calculateAmount = (qty, rate) => {
        return (parseFloat(qty || 0) * parseFloat(rate || 0)).toFixed(2);
    };

    const calculateTotal = () => {
        return items.reduce((acc, item) => acc + (parseFloat(item.qty || 0) * parseFloat(item.rate || 0)), 0).toFixed(2);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="invoice-container">
            {/* Controls */}
            <div className="controls no-print">
                <button className="btn btn-primary" onClick={handlePrint}>Print Invoice</button>
                <button className="btn btn-secondary" onClick={() => window.location.reload()}>New Invoice</button>
            </div>

            {/* Invoice Sheet */}
            <div className="invoice-sheet">
                {/* Header */}
                <header className="invoice-header">
                    <div className="logo-section">
                        <img id="brand-logo" src={swadLogo} alt="Swad Logo" style={{ maxWidth: '150px', maxHeight: '100px', marginBottom: '10px', display: 'block' }} />

                        <h1 className="brand-name">Swad Food Products</h1>
                        <p className="brand-address">
                            Acharya society, near Pariwar mart,<br />
                            Ambedkar chowk, old Jakat naka,<br />
                            warje, Pune 52
                        </p>
                    </div>
                    <div className="invoice-title">
                        <h2>INVOICE</h2>
                    </div>
                </header>

                {/* Customer & Invoice Info */}
                <section className="info-section">
                    <div className="customer-details">
                        <div className="input-group">
                            <label>M/s:</label>
                            <input
                                type="text"
                                placeholder="Customer Name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Address:</label>
                            <textarea
                                placeholder="Customer Address"
                                value={customerAddress}
                                onChange={(e) => setCustomerAddress(e.target.value)}
                                rows={2}
                            />
                        </div>
                    </div>
                    <div className="invoice-meta">
                        <div className="input-group">
                            <label>Invoice No:</label>
                            <input
                                type="text"
                                value={invoiceNo}
                                onChange={(e) => setInvoiceNo(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Date:</label>
                            <input
                                type="date"
                                value={invoiceDate}
                                onChange={(e) => setInvoiceDate(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* Product Table */}
                <section className="table-section">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>Sr.</th>
                                <th>Description of Goods</th>
                                <th style={{ width: '80px' }}>Qty</th>
                                <th style={{ width: '100px' }}>Rate</th>
                                <th style={{ width: '120px' }}>Amount</th>
                                <th className="no-print" style={{ width: '40px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            type="text"
                                            className="table-input"
                                            value={item.description}
                                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                            placeholder="Item Name"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="table-input"
                                            value={item.qty}
                                            onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="table-input"
                                            value={item.rate}
                                            onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                                        />
                                    </td>
                                    <td className="amount-cell">
                                        {calculateAmount(item.qty, item.rate)}
                                    </td>
                                    <td className="no-print">
                                        {items.length > 1 && (
                                            <button className="btn-icon" onClick={() => removeItem(item.id)}>×</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn-add no-print" onClick={addItem}>+ Add Item</button>
                </section>

                {/* Footer & Totals */}
                <section className="footer-section">
                    <div className="bank-details">
                        <h3>Bank Details</h3>
                        <div className="bank-grid">
                            <span>Bank Name:</span> <strong>Union Bank of India</strong>
                            <span>Branch:</span> <span>Warje Malwadi-Pune (411058)</span>
                            <span>A/c No:</span> <strong>608901010051378</strong>
                            <span>IFS Code:</span> <span>UBIN0560898</span>
                        </div>
                        <div className="upi-qr-placeholder">
                            <img src={qrCode} alt="QR Code" className="qr-code-img" />
                        </div>
                    </div>

                    <div className="totals">
                        <div className="total-row">
                            <span>Total:</span>
                            <span>₹ {calculateTotal()}</span>
                        </div>
                        <div className="total-row grand-total">
                            <span>Grand Total:</span>
                            <span>₹ {calculateTotal()}</span>
                        </div>
                        <div className="signature-area">
                            <br /><br /><br />
                            <p>For Swad Food Products</p>
                            <small>Auth. Signatory</small>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Invoice;
