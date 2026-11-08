import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'kirana-erp-api',
      timestamp: new Date().toISOString(),
    };
  }

  getDashboardSummary() {
    return {
      revenue: '₹34.8L',
      dueCollection: '₹8.2L',
      inventoryValue: '₹24.6L',
      billsProcessed: '1,248',
    };
  }

  getInventory() {
    return [
      { product: 'Rice 25kg', sku: 'RICE-25', stock: 145, stockLevel: 'Healthy', supplier: 'Vijay Foods', value: '₹67,500' },
      { product: 'Toor Dal', sku: 'DAL-10', stock: 48, stockLevel: 'Low', supplier: 'Asha Wholesale', value: '₹18,200' },
      { product: 'Sunflower Oil', sku: 'OIL-5', stock: 68, stockLevel: 'Healthy', supplier: 'South India Oils', value: '₹55,800' },
      { product: 'Detergent Powder', sku: 'DET-2', stock: 22, stockLevel: 'Critical', supplier: 'Cleanline Retail', value: '₹9,600' },
    ];
  }

  getCustomers() {
    return [
      { name: 'Ramesh Traders', phone: '+91 98980 22221', balance: '₹18,400', lastPaid: '2 days ago', risk: 'Low' },
      { name: 'Anita General Store', phone: '+91 98112 55995', balance: '₹34,200', lastPaid: '5 days ago', risk: 'Medium' },
      { name: 'Laxmi Provision', phone: '+91 97656 21189', balance: '₹51,500', lastPaid: '1 week ago', risk: 'High' },
    ];
  }

  getDocuments() {
    return [
      { name: 'Invoice_3021.pdf', type: 'Supplier Bill', status: 'Verified', confidence: '98.2%', owner: 'OCR Agent' },
      { name: 'Ledger_0427.jpg', type: 'Khata Page', status: 'Review', confidence: '94.1%', owner: 'Shop Owner' },
      { name: 'RateList_08.pdf', type: 'Price List', status: 'Auto-synced', confidence: '96.8%', owner: 'Operations Team' },
    ];
  }

  getGstReport() {
    return {
      gstCollected: '₹3.6L',
      taxableSales: '₹22.8L',
      returns: '₹1.1L',
      filingStatus: 'Ready for filing',
    };
  }
}
