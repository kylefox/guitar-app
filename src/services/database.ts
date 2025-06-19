import Dexie, { Table } from 'dexie';
import { Guitar, ServiceRecord } from '../types/guitar';

export class GuitarDatabase extends Dexie {
  guitars!: Table<Guitar>;
  serviceRecords!: Table<ServiceRecord>;

  constructor() {
    super('GuitarCollectionDB');
    
    this.version(1).stores({
      guitars: '++id, brand, model, type, year, createdAt, updatedAt',
      serviceRecords: '++id, guitarId, date, type, createdAt, updatedAt'
    });
  }
}

export const db = new GuitarDatabase();

// Guitar CRUD operations
export class GuitarService {
  static async create(guitarData: Omit<Guitar, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    const now = new Date().toISOString();
    const guitar: Guitar = {
      ...guitarData,
      createdAt: now,
      updatedAt: now
    };
    return await db.guitars.add(guitar);
  }

  static async getAll(): Promise<Guitar[]> {
    return await db.guitars.orderBy('updatedAt').reverse().toArray();
  }

  static async getById(id: number): Promise<Guitar | undefined> {
    return await db.guitars.get(id);
  }

  static async update(id: number, updates: Partial<Guitar>): Promise<number> {
    const updatedGuitar = {
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return await db.guitars.update(id, updatedGuitar);
  }

  static async delete(id: number): Promise<void> {
    await db.transaction('rw', db.guitars, db.serviceRecords, async () => {
      // Delete the guitar
      await db.guitars.delete(id);
      // Delete all associated service records
      await db.serviceRecords.where('guitarId').equals(id).delete();
    });
  }

  static async search(query: string): Promise<Guitar[]> {
    const lowerQuery = query.toLowerCase();
    return await db.guitars
      .filter(guitar => 
        guitar.brand.toLowerCase().includes(lowerQuery) ||
        guitar.model.toLowerCase().includes(lowerQuery) ||
        guitar.serialNumber?.toLowerCase().includes(lowerQuery) ||
        guitar.notes?.toLowerCase().includes(lowerQuery)
      )
      .toArray();
  }

  static async getByType(type: string): Promise<Guitar[]> {
    return await db.guitars.where('type').equals(type).toArray();
  }
}

// Service Record CRUD operations
export class ServiceRecordService {
  static async create(recordData: Omit<ServiceRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    const now = new Date().toISOString();
    const record: ServiceRecord = {
      ...recordData,
      createdAt: now,
      updatedAt: now
    };
    return await db.serviceRecords.add(record);
  }

  static async getByGuitarId(guitarId: number): Promise<ServiceRecord[]> {
    return await db.serviceRecords
      .where('guitarId')
      .equals(guitarId)
      .orderBy('date')
      .reverse()
      .toArray();
  }

  static async getById(id: number): Promise<ServiceRecord | undefined> {
    return await db.serviceRecords.get(id);
  }

  static async update(id: number, updates: Partial<ServiceRecord>): Promise<number> {
    const updatedRecord = {
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return await db.serviceRecords.update(id, updatedRecord);
  }

  static async delete(id: number): Promise<void> {
    await db.serviceRecords.delete(id);
  }

  static async getAll(): Promise<ServiceRecord[]> {
    return await db.serviceRecords.orderBy('date').reverse().toArray();
  }
}