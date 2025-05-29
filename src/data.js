export const API_KEY = 'AIzaSyCp8574udVCdit84HUN2ChDWMjOdfVR1EU';

export const value_converter = value =>
  value > 1000000 ? `${Math.round(value / 1000000)}M` : `${Math.round(value / 1000)}K`;
