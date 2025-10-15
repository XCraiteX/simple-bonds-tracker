export interface Bond {
  id: string;
  name: string;
  nominal: number;
  coupon: number;
  months: number[];
  day: number;
  quantity: number;
}

export type BondFormData = Omit<Bond, 'id'>;