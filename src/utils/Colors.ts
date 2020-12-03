const colors_ = [
  '#424242',
  '#523f3d',
  '#372d1e',
  '#3f0f0f',
  '#001c43',
  '#381619',
  '#371c3d',
];

export const shuffleColors = () => {
  const shuffled = colors_.sort(() => 0.5 - Math.random());

  return shuffled;
};

export const getSimilar = (color1: string, color2: string): number => {
  // get red/green/blue int values of color1
  var r1 = parseInt(color1.substring(1, 3), 16);
  var g1 = parseInt(color1.substring(3, 5), 16);
  var b1 = parseInt(color1.substring(5, 7), 16);
  // get red/green/blue int values of color2
  var r2 = parseInt(color2.substring(1, 3), 16);
  var g2 = parseInt(color2.substring(3, 5), 16);
  var b2 = parseInt(color2.substring(5, 7), 16);
  // calculate differences between reds, greens and blues
  var r = 255 - Math.abs(r1 - r2);
  var g = 255 - Math.abs(g1 - g2);
  var b = 255 - Math.abs(b1 - b2);

  // limit differences between 0 and 1
  r /= 255;
  g /= 255;
  b /= 255;
  // 0 means opposit colors, 1 means same colors
  return (r + g + b) / 3;
};
