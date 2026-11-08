import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return health status', () => {
    expect(appController.getHealth()).toMatchObject({
      status: 'ok',
      service: 'kirana-erp-api',
    });
  });

  it('should expose dashboard summary', () => {
    expect(appController.getDashboardSummary()).toMatchObject({
      revenue: '₹34.8L',
      dueCollection: '₹8.2L',
      inventoryValue: '₹24.6L',
      billsProcessed: '1,248',
    });
  });

  it('should expose inventory items', () => {
    expect(appController.getInventory()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          product: 'Rice 25kg',
          sku: 'RICE-25',
          stock: 145,
        }),
      ]),
    );
  });

  it('should expose customers and their balances', () => {
    expect(appController.getCustomers()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Ramesh Traders',
          balance: '₹18,400',
        }),
      ]),
    );
  });

  it('should expose processed documents', () => {
    expect(appController.getDocuments()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Invoice_3021.pdf',
          type: 'Supplier Bill',
          status: 'Verified',
        }),
      ]),
    );
  });

  it('should expose GST report totals', () => {
    expect(appController.getGstReport()).toEqual({
      gstCollected: '₹3.6L',
      taxableSales: '₹22.8L',
      returns: '₹1.1L',
      filingStatus: 'Ready for filing',
    });
  });
});
