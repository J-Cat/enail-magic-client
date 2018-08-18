export const arrayBufferToString = (buf: ArrayBuffer): string => {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
};
  
export const stringToArrayBuffer = (str: string): ArrayBuffer => {
    const buf: Uint8Array = new Uint8Array(str.length);
    for (let i = 0; i<str.length; i++) {
      buf[i] = str.charCodeAt(i);
    }
    return buf.buffer;
};