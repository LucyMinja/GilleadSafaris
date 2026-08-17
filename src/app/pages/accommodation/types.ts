export type Lodge = {
  id: number;
  name: string;
  type: string;
  location: string;
  category: string;
  price: string;
  rating: number;
  img: string;
  img2: string;
  desc: string;
  amenities: string[];
  highlight: string;
  bestFor: string[];
  season: string;
};

export const categories = ['All', 'Luxury Lodges', 'Tented Camps', 'Beach Resorts'];
