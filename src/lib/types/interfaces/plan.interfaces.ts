export interface IPlanDataType {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  downloadLimit: string;
  uploadLimit: string;
  storageLimit: string;
  features: string[];
  maxFileSize: string;
}
