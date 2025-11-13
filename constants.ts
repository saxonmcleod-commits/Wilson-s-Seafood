
import { FishProduct, OpeningHour } from './types';

export const INITIAL_LOGO_URL = 'https://i.imgur.com/Gq6h2rQ.png';

export const FISH_PRODUCTS: FishProduct[] = [
  { id: '1', name: 'Fresh Tassie Scallops', price: '$39.90' },
  { id: '2', name: 'Hapuku', price: '$49.90' },
  { id: '3', name: 'Pink Ling', price: '$32.90' },
  { id: '4', name: 'Flathead', price: '$30.00/kg' },
  { id: '5', name: 'Spotty Trevally', price: '$26.90/kg' },
  { id: '6', name: 'Latchet', price: '$34.90/kg' },
  { id: '7', name: 'Barramundi', price: '$36.90/kg' },
  { id: '8', name: 'Blue Grenadier', price: '$19.90/kg' },
  { id: '9', name: 'Gummy Shark', price: '$35.99/kg' },
];

export const OPENING_HOURS: OpeningHour[] = [
  { day: 'Wednesday', time: '7am - 1pm' },
  { day: 'Thursday', time: '7am - 2pm' },
  { day: 'Friday', time: '7am - 2:30pm' },
];
