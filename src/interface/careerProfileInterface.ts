interface CareerItem {
  careerId: number;
  title: string;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  content: string;
}

interface CareerCertificate {
  name: string;
  status: string;
}

export interface CareerProfile {
  careerProfileId: string;
  introduce: string;
  age: string;
  field: string;
  service: string;
  method: string;
  region: string;
  priceType: string;
  price: number;
  careerItems: CareerItem[];
  careerCertificate: CareerCertificate;
}

export const initialCareerProfile: CareerProfile = {
  careerProfileId: '',
  introduce: '',
  age: '',
  field: '',
  service: '',
  method: '',
  region: '',
  priceType: '',
  price: -1,
  careerItems: [],
  careerCertificate: { name: '', status: '' },
};
