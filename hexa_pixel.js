export class Hexa_pixel{
  /**
   *
   * @author Fontaine Pierre
   * @param {Number} v valeur de la couleur en hexa
   * @copyright 2017
   */
  constructor(v){
    this.value = v;
    this.alpha = (this.value & 0xff000000)>> 24;
    this.red = (this.value & 0x00ff0000)>> 16;
    this.green = (this.value & 0x0000ff00)>> 8;
    this.blue = this.value & 0x000000ff;
  }

  majValue(){
    this.value = this.alpha << 24 | this.red << 16 | this.green << 8 | this.blue;
  }

  setValue(v){
    this.value = v;
    this.alpha = (this.value & 0xff000000)>> 24;
    this.red = (this.value & 0x00ff0000)>> 16;
    this.green = (this.value & 0x0000ff00)>> 8;
    this.blue = this.value & 0x000000ff;
  }

  getValue(){
    return this.value;
  }

  applyGreyScale(){
    let avg =  0.3  * this.red + 0.59 * this.green + 0.11 * this.blue;

    this.alpha = 255;
    this.red = this.green = this.blue = avg;
    this.majValue();
    return this.value;
  }

  applySepia(){
    let avg = 0.3  * this.red + 0.59 * this.green + 0.11 * this.blue;
    this.alpha = 255;
    this.red = Math.min(avg+100,255);
    this.green = Math.min(avg+50,255);
    this.blue = avg;

    this.majValue();
    return this.value;
  }

  applyNegative(){
    this.alpha = 255;
    this.red = 255 - this.red;
    this.green = 255 - this.green;
    this.blue = 255 - this.blue;
    this.majValue();
    return this.value;
  }
}
