import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// Placeholders for dynamic font size and width/height until you provide the files
export const vw = (percent: number) => (width * percent) / 100;
export const vh = (percent: number) => (height * percent) / 100;
export const responsiveFontSize = (size: number) => size;
