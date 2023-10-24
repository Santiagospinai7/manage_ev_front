import axios from 'axios';

export const getLatLongFromAddress = async (address) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
  const { results } = response.data;

  if (results.length > 0) {
    console.log('result', results[0].geometry.location)
    const { lat, lng } = results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  }
  return null;
};
