/*jshint esversion: 6 */
import {GreyScale,Sepia,Negatif,Noise} from './FuncImage.js';
import {masquage} from './masquage.js';
import {Hexa_pixel} from './hexa_pixel.js';
export class CanvasImage {

  /**
  * @author Fontaine Pierre
  * @constructor CanvasImage
  * @param {htmlDoc} canvas un canvas prealablement rattaché dans
  * le dom
  */
  constructor(canvas,img) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.img = img;
    this.context.drawImage(this.img,0,0,canvas.width,canvas.height);
    this.original = this.getData();
    this.option = null;
    this.factor = 0;

    this.alpha = 255;
    this.red = 126;
    this.green = 126;
    this.blue = 126;

    /*
    this.datVarAlpha = this.gpuVar(masquage.a);
    this.datVarRed = this.gpuVar(masquage.r);
    this.datVarGreen = this.gpuVar(masquage.g);
    this.datVarBlue = this.gpuVar(masquage.b);
    */
  }

  update(){
    console.log("updating");
    this.gpuVar(masquage.a);
    this.gpuVar(masquage.r);
    this.gpuVar(masquage.g);
    this.gpuVar(masquage.b);
  }

  /**
  * @author Fontaine Pierre
  * @return retourne un array avec les data de l'img dans le context
  */
  getData(){
    return this.context.getImageData(0, 0, this.img.width, this.img.height);
  }

  /**
  * re creer l'image avec le tableau de data representant l'image passé
  * en parametre et la stock dans context
  * @author Fontaine Pierre
  * @param {Array} data un tableau representant les px de l'images
  */
  setData(data){
    return this.context.putImageData(data,0,0);
  }

  /**
  * utilise setData avec les données de la photo d'origine
  * @author Fontaine Pierre
  */
  reset(){
    this.setData(this.original);
  }

  /**
  * @author Fontaine Pierre
  */
  transform(){
    let oldpx = this.original.data;
    let newdata = this.context.createImageData(this.original);
    let newpx = newdata.data;
    let res = [];

    let fn = null;

    switch (this.option) {
      case 'GreyScale':
        fn = GreyScale;
        break;
      case 'Sepia':
        fn = Sepia;
        break;
      case 'Negatif':
        fn = Negatif;
        break;
      case 'Noise':
        fn = Noise;
        break;
      default:
        fn = GreyScale;
    }

    for (let i = 0; i < newpx.length; i += 4) {
      res = fn(oldpx[i], oldpx[i+1], oldpx[i+2], oldpx[i+3], this.factor, i);
      newpx[i]   = res[0]; // r
      newpx[i+1] = res[1]; // g
      newpx[i+2] = res[2]; // b
      newpx[i+3] = res[3]; // a
    }
    this.setData(newdata);
  }


  gpuVar(c){
    let canvasHeight = this.canvas.height;
    let canvasWidth = this.canvas.width;
    let imgData = this.context.getImageData(0,0,canvasWidth,canvasHeight);
    let data = new Uint32Array(imgData.data.buffer);
    let buf8 = new Uint8ClampedArray(imgData.data.buffer);
    for (let y = 0; y < canvasHeight; ++y) {
      for (let x = 0; x < canvasWidth; ++x) {
          let value = data[y * canvasWidth + x];
          let channel;
          switch (c.id) {
            case "alpha":
              channel = this.alpha;
              break;
            case "red":
              channel = this.red;
              break;
            case "green":
              channel = this.green;
              break;
            case "blue":
              channel = this.blue;
              break;
            default:

          }
          let a = channel << c.dec ;
          data[y * canvasWidth + x] &= c.mas;
          data[y * canvasWidth + x] |= a;
      }
    }
    imgData.data.set(buf8);
    this.setData(imgData);
  }

  gpuGreyScale(){
    let testPx = new Hexa_pixel(0xff2A92C6D0);
    console.log(testPx.getValue());
    console.log(testPx.applyGreyScale());

    let px = new Hexa_pixel();
    let canvasHeight = this.canvas.height;
    let canvasWidth = this.canvas.width;
    let imgData = this.context.getImageData(0,0,canvasWidth,canvasHeight);
    let data = new Uint32Array(imgData.data.buffer);
    let buf8 = new Uint8ClampedArray(imgData.data.buffer);

    for (let y = 0; y < canvasHeight; ++y) {
      for (let x = 0; x < canvasWidth; ++x) {
        px.setValue(data[y * canvasWidth + x]);
        data[y * canvasWidth + x] = px.applyGreyScale();
      }
    }
    imgData.data.set(buf8);
    this.setData(imgData);
  }

  gpuSepia(){
    let testPx = new Hexa_pixel(0xff2A92C6D0);
    console.log(testPx.getValue());
    console.log(testPx.applyGreyScale());

    let px = new Hexa_pixel();
    let canvasHeight = this.canvas.height;
    let canvasWidth = this.canvas.width;
    let imgData = this.context.getImageData(0,0,canvasWidth,canvasHeight);
    let data = new Uint32Array(imgData.data.buffer);
    let buf8 = new Uint8ClampedArray(imgData.data.buffer);

    for (let y = 0; y < canvasHeight; ++y) {
      for (let x = 0; x < canvasWidth; ++x) {
        px.setValue(data[y * canvasWidth + x]);
        data[y * canvasWidth + x] = px.applySepia();
      }
    }
    imgData.data.set(buf8);
    this.setData(imgData);
  }
};
