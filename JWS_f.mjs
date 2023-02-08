import { FlattenedSign } from 'jose/jws/flattened/sign'
import { flattenedVerify } from 'jose/jws/flattened/verify'
import { generateKeyPair } from 'jose/util/generate_key_pair'

const { publicKey, privateKey } = await generateKeyPair('ES256')
const encoder = new TextEncoder()
const decoder = new TextDecoder()

//Tworzenie tokena + weryfikacja 
const jws = await new FlattenedSign(encoder.encode('It’s a dangerous business, Frodo, going out your door.'))
  .setProtectedHeader({ alg: 'ES256' })
  .sign(privateKey)
console.log(jws)
const { payload, protectedHeader } = await flattenedVerify(jws, publicKey)

console.log(decoder.decode(payload))
console.log(protectedHeader)

//Sprawdzenie czasów dla 1,10,100,1000 tokenów 
var i;
var time1, time2
time1= Date.now()
for (i = 0; i < 1; i++) {
const jws = await new FlattenedSign(encoder.encode('It’s a dangerous business, Frodo, going out your door.'))
  .setProtectedHeader({ alg: 'ES256' })
  .sign(privateKey)
}
time2 = Date.now()
console.log("Czas wykonania dla " + i + " obiektu: " + (time2-time1)+ " ms")


var j;
time1= Date.now()
for (j = 0; j < 10; j++) {
const jws = await new FlattenedSign(encoder.encode('It’s a dangerous business, Frodo, going out your door.'))
  .setProtectedHeader({ alg: 'ES256' })
  .sign(privateKey)
}
time2 = Date.now()
console.log("Czas wykonania dla " + j + " obiektów: " + (time2-time1)+ " ms")


var k;
time1= Date.now()
for (k = 0; k < 100; k++) {
const jws = await new FlattenedSign(encoder.encode('It’s a dangerous business, Frodo, going out your door.'))
  .setProtectedHeader({ alg: 'ES256' })
  .sign(privateKey)
}
time2 = Date.now()
console.log("Czas wykonania dla " + k + " obiektów: " + (time2-time1)+ " ms")


var l;
time1= Date.now()
for (l = 0; l < 1000; l++) {
const jws = await new FlattenedSign(encoder.encode('It’s a dangerous business, Frodo, going out your door.'))
  .setProtectedHeader({ alg: 'ES256' })
  .sign(privateKey)
}
time2 = Date.now()
console.log("Czas wykonania dla " + l + " obiektów: " + (time2-time1)+ " ms")


//Tworzenie tokena, zmiana + weryfikacja
const jws_modified = await new FlattenedSign(encoder.encode('It’s a dangerous business, Frodo, going out your door.'))
  .setProtectedHeader({ alg: 'ES256' })
  .sign(privateKey)
console.log(jws_modified)
jws_modified.payload = 'SXTigJlzIGEgZGFuZ2Vyb3VzIGJ1c2luZXNzLCBGcm9kbywgZ29pbmcgb3V0IHlvdXIgZG9vci5'
console.log(jws_modified)
const { payload_modified, protectedHeader_modified} = await flattenedVerify(jws_modified, publicKey)
console.log(protectedHeader_modified)
console.log(decoder.decode(payload_modified))