export const covertHexToRgba = (hexadecimal: string, opacity: number) => {
  // setting the value to the user input
  let hexVal = hexadecimal.replace("#", "");

  // turn 3-HEX to 6-HEX
  if (hexVal.length === 3) {
    hexVal =
      hexVal[0] + hexVal[0] + hexVal[1] + hexVal[1] + hexVal[2] + hexVal[2];
  }

  // extracting the hex values for RGB
  const red = hexVal.substr(0, 2),
    green = hexVal.substr(2, 2),
    blue = hexVal.substr(4, 2);

  // converting in decimal values
  const red10 = parseInt(red, 16),
    green10 = parseInt(green, 16),
    blue10 = parseInt(blue, 16);

  // stitching it together
  const rgb = red10 + "," + green10 + "," + blue10;

  // the final rgba CSS ouptut
  const rgba = `rgba(${rgb},${opacity})`;
  console.log(rgba);
};
