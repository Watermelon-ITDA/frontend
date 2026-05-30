export interface PinInfo {
  id: number;
  role: string;
  profile: string;
  name: string;
  lat: number;
  lng: number;
  location: string;
  content: string | null;
  score: number | null;
}
