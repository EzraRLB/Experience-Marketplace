export type Experience = {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  price: number;
  duration?: string;
  created_at?: string;
  city?: {
    id: number;
    name: string;
    country: string;
    state?: string;
  };
  host?: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  images: Array<{
    id: number;
    url: string;
  }>;
};