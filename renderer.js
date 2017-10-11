import {CanvasImage} from './CanvasImage.js';
import {GreyScale,Sepia,Negatif,Noise} from './FuncImage.js';
import {masquage} from './masquage.js';

console.log("HELLO");

let app = document.querySelector("#app");
let canvas = document.createElement('canvas');

let gui = new dat.GUI();

canvas.id     = "My canvas";
canvas.width  = 800;
canvas.height = 600;
canvas.style.zIndex   = 8;
canvas.style.position = "absolute";

let img = new Image();
img.src = './assets/parrot.jpg';

img.onload = function(){
  let map = [GreyScale,Sepia,Negatif,Noise];
  let CvImg = new CanvasImage(canvas,img);

  let gui_1 = gui.add(CvImg,'alpha', 0,255).onChange(function(){
    CvImg.gpuVar(masquage.a);
  });
  let gui_2 = gui.add(CvImg,'red', 0,255).onChange(function(){
    CvImg.gpuVar(masquage.r);
  });
  let gui_3 = gui.add(CvImg,'green', 0,255).onChange(function(){
    CvImg.gpuVar(masquage.g);
  });
  let gui_4 = gui.add(CvImg,'blue', 0,255).onChange(function(){
    CvImg.gpuVar(masquage.b);
  });



  /**
  gui.add(CvImg,'datVarAlpha');
  gui.add(CvImg,'datVarRed');
  gui.add(CvImg,'datVarGreen');
  gui.add(CvImg,'datVarBlue');
  **/
  gui.add(CvImg,'reset');

}


app.appendChild(canvas);
