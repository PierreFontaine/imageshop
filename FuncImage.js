/*jshint esversion: 6 */
let GreyScale = function (r,g,b){
  let avg = 0.3  * r + 0.59 * g + 0.11 * b;
  return [avg, avg, avg, 255];
};

let Sepia = function(r, g, b) {
  let avg = 0.3  * r + 0.59 * g + 0.11 * b;
  return [avg + 100, avg + 50, avg, 255];
};

let Negatif = function(r, g, b) {
  return [255 - r, 255 - g, 255 - b, 255];
};

let Noise = function(r, g, b, a, factor) {
  let rand =  (0.5 - Math.random()) * factor;
  return [r + rand, g + rand, b + rand, 255];
};

export {GreyScale,Sepia,Negatif,Noise};
