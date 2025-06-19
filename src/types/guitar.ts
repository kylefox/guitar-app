export interface Guitar {
  id?: number;
  brand: string;
  model: string;
  year?: number;
  type: GuitarType;
  serialNumber?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  currentValue?: number;
  color?: string;
  notes?: string;
  photos?: string[];
  createdAt: string;
  updatedAt: string;
}

export type GuitarType = 
  | 'electric'
  | 'acoustic'
  | 'classical'
  | 'bass'
  | 'electric-acoustic'
  | 'twelve-string'
  | 'resonator'
  | 'other';

export type ServiceType = 
  | 'string-change'
  | 'setup'
  | 'repair'
  | 'cleaning'
  | 'modification'
  | 'inspection'
  | 'other';

export interface ServiceRecord {
  id?: number;
  guitarId: number;
  date: string;
  type: ServiceType;
  description: string;
  cost?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GuitarFormData {
  brand: string;
  model: string;
  year?: number;
  type: GuitarType;
  serialNumber?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  currentValue?: number;
  color?: string;
  notes?: string;
}

export interface ServiceRecordFormData {
  date: string;
  type: ServiceType;
  description: string;
  cost?: number;
  notes?: string;
}