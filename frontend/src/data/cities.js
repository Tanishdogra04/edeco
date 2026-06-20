import allCitiesJson from './cities.json';

export const allCities = allCitiesJson;

export const processedCities = allCities.map((city, index) => {
  const keepIconic = [
    "bangalore", "delhi", "mumbai", "pune", "hyderabad", "chennai", "kolkata", "ahmedabad", "jaipur", "chandigarh"
  ];
  if (keepIconic.includes(city.id)) {
    return city;
  }
  const guaranteedImages = [
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1592289658098-b80c102b5e28?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80"
  ];
  return {
    ...city,
    image: guaranteedImages[index % guaranteedImages.length]
  };
});
