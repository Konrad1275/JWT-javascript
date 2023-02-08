import { FlattenedEncrypt } from 'jose/jwe/flattened/encrypt'
import { flattenedDecrypt } from 'jose/jwe/flattened/decrypt'
import { generateKeyPair } from 'jose/util/generate_key_pair'

const { publicKey, privateKey } = await generateKeyPair('RSA-OAEP-256')
const decoder = new TextDecoder()
const encoder = new TextEncoder()


//Tworzenie tokena + weryfikacja 
var jwe = await new FlattenedEncrypt(encoder.encode('Oto tekst do zaszyfrowania'))
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
    .setAdditionalAuthenticatedData(encoder.encode('dodatkowy'))
    .encrypt(publicKey)
  console.log('zaszyfrowany żeton')
  console.log(jwe)
var {plaintext,protectedHeader,additionalAuthenticatedData} = await flattenedDecrypt(jwe, privateKey)
  
  console.log(protectedHeader)
  console.log('odszyfrowana wiadomość')
  console.log(decoder.decode(plaintext))
  console.log(decoder.decode(additionalAuthenticatedData))


//Sprawdzenie czasów dla 1,10,100,1000 tokenów 
var i,time1,time2;
time1=Date.now()
for(i=0;i<1;i++){
 var jwe = await new FlattenedEncrypt(encoder.encode('Oto tekst do zaszyfrowania'))
   .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
   .setAdditionalAuthenticatedData(encoder.encode('zostanie on zaszyfrowany'))
   .encrypt(publicKey)
}
time2=Date.now()
console.log("Czas wykonania dla " + i + " obiektów: " + (time2-time1)+ " ms")

for(i=0;i<10;i++){
  var jwe = await new FlattenedEncrypt(encoder.encode('Oto tekst do zaszyfrowania'))
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
    .setAdditionalAuthenticatedData(encoder.encode('zostanie on zaszyfrowany'))
    .encrypt(publicKey)
  }
  time2=Date.now()
  console.log("Czas wykonania dla " + i + " obiektów: " + (time2-time1)+ " ms")

for(i=0;i<100;i++){
  var jwe = await new FlattenedEncrypt(encoder.encode('Oto tekst do zaszyfrowania'))
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
    .setAdditionalAuthenticatedData(encoder.encode('zostanie on zaszyfrowany'))
    .encrypt(publicKey)
  }
  time2=Date.now()
  console.log("Czas wykonania dla " + i + " obiektów: " + (time2-time1)+ " ms")

for(i=0;i<1000;i++){
  var jwe = await new FlattenedEncrypt(encoder.encode('Oto tekst do zaszyfrowania'))
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
    .setAdditionalAuthenticatedData(encoder.encode('zostanie on zaszyfrowany'))
    .encrypt(publicKey)
  }
  time2=Date.now()
  console.log("Czas wykonania dla " + i + " obiektów: " + (time2-time1)+ " ms")


//Tworzenie tokena, zmiana + odszyfrowanie
var jwe_m = await new FlattenedEncrypt(encoder.encode('Oto tekst do zaszyfrowania'))
 .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
 .setAdditionalAuthenticatedData(encoder.encode('zostanie on zaszyfrowany'))
 .encrypt(publicKey)
console.log('zaszyfrowany żeton')
console.log(jwe_m)
jwe_m.ciphertext='3Q7wdwRJeNdAcmKyJ7ZTAYq2FyfvZkyJbDs'
//jwe_m.iv='fPW7oFL5erZ4qZ7T'
//jwe_m.tag='DwKJCHqhtnijUCIy0f3g6W'