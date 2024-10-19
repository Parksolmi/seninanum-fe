interface CareerItem {
  careerId: number;
  title: string;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  content: string;
}

export interface CareerProfile {
  careerProfileId: '';
  progressStep: 0;
  certificateName: '';
  certificateStatus: '';
  introduce: '';
  age: '';
  field: '';
  service: '';
  method: '';
  region: '';
  priceType: '';
  price: -1;
  careerItemList: CareerItem[];
}
