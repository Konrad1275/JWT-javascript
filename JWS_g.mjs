import { generalVerify } from 'jose/jws/general/verify'
import { GeneralSign } from 'jose/jws/general/sign'
import { generateSecret } from 'jose/util/generate_secret'

const secret = await generateSecret('HS256')
console.log(secret)

const encoder = new TextEncoder()
const decoder = new TextDecoder()

const sign = new GeneralSign(encoder.encode('It’s a dangerous business, Frodo, going out your door.'))


sign
    .addSignature(secret)
    .setProtectedHeader({ alg: 'HS256'})

const jws = await sign.sign()

const { payload, protectedHeader } = await generalVerify(jws, secret)

console.log(protectedHeader)
console.log(decoder.decode(payload))

