import crypto from "crypto";
const key = "aljgla.mgh98570fdg;ghjksirl76jnf";
const iv = new Uint8Array([
  0x00,
  0x01,
  0x02,
  0x03,
  0x04,
  0x05,
  0x06,
  0x07,
  0x08,
  0x09,
  0x0a,
  0x0b,
  0x0c,
  0x0d,
  0x0e,
  0x0f
]);
export default function aesDecrypter(text) {
  let clearEncoding = "utf8";
  let cipherEncoding = "base64";
  let cipherChunks = [];
  let decipher = crypto.createDecipheriv("aes-256-cfb", key, iv);
  decipher.setAutoPadding(true);
  cipherChunks.push(decipher.update(text, cipherEncoding, clearEncoding));
  cipherChunks.push(decipher.final(clearEncoding));
  return cipherChunks.join("");
}
