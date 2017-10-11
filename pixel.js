export class GPU_Pixel{
  constructor(data){
    this.imgData = data;
    this.buf = new ArrayBuffer(this.imgData.length);
    this.buf8 = new Uint8ClampedArray(buf);
    this.data = new Uint32Array(buf);
  }
}
