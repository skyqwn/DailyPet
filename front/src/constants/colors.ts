const colors = {
  GREEN_500: '#27ae60',
  GREEN_400: '#2ecc71',
  GREEN_300: '#58d68d',
  GREEN_200: '#82e0aa',
  GREEN_100: '#abebc6',
  BLUE_500: '#0D8AFF',
  RED_500: '#FF5F5F',
  RED_300: '#FFB4B4',
  BLUE_400: '#B4E0FF',
  WHITE: '#FFF',
  BLACK: '#000',
  GRAY_100: '#F8F8F8',
  GRAY_200: '#E7E7E7',
  GRAY_300: '#D8D8D8',
  GRAY_500: '#8E8E8E',
  GRAY_700: '#575757',
  PINK_400: '#EC87A5',
  YELLOW_400: '#FFE594',
  YELLOW_500: '#FACC15',
  PURPLE_400: '#C4C4E7',
} as const;

const colorHex = {
  RED: colors.PINK_400,
  BLUE: colors.BLUE_400,
  GREEN: colors.GREEN_200,
  YELLOW: colors.YELLOW_400,
  PURPLE: colors.PURPLE_400,
} as const;

export {colors, colorHex};
