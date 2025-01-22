import { Font } from "pdf-lib"; // Import Font type from pdf-lib

declare module "fontkit" {
  interface Fontkit {
    create(buffer: ArrayBuffer | Uint8Array): Font;
  }
  const fontkit: Fontkit;
  export default fontkit;
}
