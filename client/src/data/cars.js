const instagram = '/instagram';

const instagramVehicles = [
  {
    id: 'lexus-suv',
    name: 'Lexus SUV',
    model: 'SUV • Instagram feature',
    category: 'SUV',
    mainImage: `${instagram}/DfFLCCnjWmp.jpg`,
    instagramPost: 'https://www.instagram.com/accelerenmotorsghltd/p/DfFLCCnjWmp/',
    description: 'Vehicle photo from the Acceleren Motors Ghana Instagram profile. Contact the team to confirm the exact model, specification, price and current availability.',
  },
  {
    id: 'toyota-pickup',
    name: 'Toyota Pickup',
    model: 'Pickup • Instagram feature',
    category: 'Pickup',
    mainImage: `${instagram}/DfFKwYJDcSN.jpg`,
    instagramPost: 'https://www.instagram.com/accelerenmotorsghltd/p/DfFKwYJDcSN/',
    description: 'Vehicle photo from the Acceleren Motors Ghana Instagram profile. Contact the team to confirm the exact model, specification, price and current availability.',
  },
  {
    id: 'toyota-van',
    name: 'Toyota Van',
    model: 'Van • Instagram feature',
    category: 'Van',
    mainImage: `${instagram}/DfCUObhDfwA.jpg`,
    instagramPost: 'https://www.instagram.com/accelerenmotorsghltd/p/DfCUObhDfwA/',
    description: 'Vehicle photo from the Acceleren Motors Ghana Instagram profile. Contact the team to confirm the exact model, specification, price and current availability.',
  },
  {
    id: 'mercedes-benz-suv',
    name: 'Mercedes-Benz SUV',
    model: 'SUV • Instagram feature',
    category: 'SUV',
    mainImage: `${instagram}/DfCR5lSjc_k.jpg`,
    instagramPost: 'https://www.instagram.com/accelerenmotorsghltd/p/DfCR5lSjc_k/',
    description: 'Vehicle photo from the Acceleren Motors Ghana Instagram profile. Contact the team to confirm the exact model, specification, price and current availability.',
  },
  {
    id: 'ram-pickup',
    name: 'RAM Pickup',
    model: 'Pickup • Instagram feature',
    category: 'Pickup',
    mainImage: `${instagram}/De9QaQdjSbf.jpg`,
    instagramPost: 'https://www.instagram.com/accelerenmotorsghltd/p/De9QaQdjSbf/',
    description: 'Vehicle photo from the Acceleren Motors Ghana Instagram profile. Contact the team to confirm the exact model, specification, price and current availability.',
  },
  {
    id: 'mercedes-benz-sedan',
    name: 'Mercedes-Benz Sedan',
    model: 'Sedan • Instagram feature',
    category: 'Luxury',
    mainImage: `${instagram}/De9KHVcjf6F.jpg`,
    instagramPost: 'https://www.instagram.com/accelerenmotorsghltd/p/De9KHVcjf6F/',
    description: 'Vehicle photo from the Acceleren Motors Ghana Instagram profile. Contact the team to confirm the exact model, specification, price and current availability.',
  },
  {
    id: 'chevrolet-corvette',
    name: 'Chevrolet Corvette',
    model: 'Sports car • Instagram feature',
    category: 'Performance',
    mainImage: `${instagram}/De9NywDN8j1.jpg`,
    instagramPost: 'https://www.instagram.com/accelerenmotorsghltd/reel/De9NywDN8j1/',
    description: 'Vehicle photo from the Acceleren Motors Ghana Instagram profile. Contact the team to confirm the exact model, specification, price and current availability.',
  },
  {
    id: 'performance-sedan',
    name: 'Performance Sedan',
    model: 'Performance • Instagram feature',
    category: 'Performance',
    mainImage: `${instagram}/De6xOZON4s0.jpg`,
    instagramPost: 'https://www.instagram.com/accelerenmotorsghltd/reel/De6xOZON4s0/',
    description: 'Vehicle photo from the Acceleren Motors Ghana Instagram profile. Contact the team to confirm the exact model, specification, price and current availability.',
  },
];

export const HERO_BG = instagramVehicles[0].mainImage;
export const SHOWROOM_BG = instagramVehicles[3].mainImage;
export const INTERIOR_1 = instagramVehicles[1].mainImage;
export const INTERIOR_2 = instagramVehicles[2].mainImage;

export const INITIAL_CARS = instagramVehicles.map((car) => ({
  ...car,
  year: null,
  price: null,
  mileage: 'Contact to confirm',
  fuel: 'Contact to confirm',
  transmission: 'Contact to confirm',
  engine: 'Contact to confirm',
  color: 'See Instagram photo',
  gallery: [car.mainImage],
  features: ['From Acceleren Motors Instagram'],
}));
