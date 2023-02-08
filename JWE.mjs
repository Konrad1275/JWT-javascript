import { CompactEncrypt } from 'jose/jwe/compact/encrypt'
import { generateKeyPair } from 'jose/util/generate_key_pair'
import { compactDecrypt } from 'jose/jwe/compact/decrypt'

const { publicKey, privateKey } = await generateKeyPair('PS256')
const encoder = new TextEncoder()
const decoder = new TextDecoder()

//Tworzenie tokena + weryfikacja 
var jwe = await new CompactEncrypt(encoder.encode('It’s a dangerous business, Frodo, going out your door.'))
  .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
  .encrypt(publicKey)
console.log('zaszyfrowany żeton')
console.log(jwe)
var { plaintext, protectedHeader } = await compactDecrypt(jwe, privateKey)

console.log(protectedHeader)
console.log('Odszyfrowana wiadomość')
console.log(decoder.decode(plaintext))

//Sprawdzenie czasów dla 1,10,100,1000 tokenów 
var i=0,time1,time2;
time1=Date.now()
for(i=0;i<1;i++){
 var jwe = await new CompactEncrypt(encoder.encode('Przykładowy tekst do zakodowania'))
  .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
  .encrypt(publicKey)
}
time2=Date.now()
console.log("Czas wykonania dla " + i + " obiektów: " + (time2-time1)+ " ms")

for(i=0;i<10;i++){
  var jwe = await new CompactEncrypt(encoder.encode('Przykładowy tekst do zakodowania'))
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
    .encrypt(publicKey)
  }
  time2=Date.now()
  console.log("Czas wykonania dla " + i + " obiektów: " + (time2-time1)+ " ms")

for(i=0;i<100;i++){
  var jwe = await new CompactEncrypt(encoder.encode('Przykładowy tekst do zakodowania'))
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
    .encrypt(publicKey)
  }
  time2=Date.now()
  console.log("Czas wykonania dla " + i + " obiektów: " + (time2-time1)+ " ms")

for(i=0;i<1000;i++){
  var jwe = await new CompactEncrypt(encoder.encode('Przykładowy tekst do zakodowania'))
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
    .encrypt(publicKey)
  }
  time2=Date.now()
  console.log("Czas wykonania dla " + i + " obiektów: " + (time2-time1)+ " ms")

//Tworzenie tokena, zmiana + odszyfrowanie
var jwe_m = await new CompactEncrypt(encoder.encode('It’s a dangerous business, Frodo, going out your door.'))
  .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
  .encrypt(publicKey)
console.log('zaszyfrowany żeton')
console.log(jwe_m)
var jwe_m2 = jwe_m.substring(0,jwe_m.length-1)+"s";
console.log(jwe_m2)
var { plaintext, protectedHeader } = await compactDecrypt(jwe_m2, privateKey)
console.log('Odszyfrowana wiadomość')
console.log(decoder.decode(plaintext))