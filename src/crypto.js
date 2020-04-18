import crypto from 'crypto'

// Set unique identifier
export const UNIQUE_IDENTIFIER = 'app.uniqueIdentifier'
export const PUBLIC_KEY =  'app.publicKey'
export const PRIVATE_KEY = 'app.privateKey'
const passphrase = 'top_secret'

export let identifier = localStorage.getItem(UNIQUE_IDENTIFIER)
  || hash(`${Date.now()}-${Math.random()}-${Math.random()}`)

localStorage.setItem(UNIQUE_IDENTIFIER, identifier)

const asymmetricKeyPair = crypto.generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase
  }
})

localStorage.setItem(PRIVATE_KEY, asymmetricKeyPair.privateKey)
localStorage.setItem(PUBLIC_KEY, asymmetricKeyPair.publicKey)

export function encrypt(toEncrypt, publicKey) {
  let encryptBuffer = Buffer.from(toEncrypt, 'utf-8')
  return crypto.publicEncrypt(crypto.createPublicKey(publicKey), encryptBuffer).toString('base64')
}

export function decrypt(toDecrypt, privateKey) {
  let decryptBuffer = Buffer.from(toDecrypt, 'base64')
  return crypto.privateDecrypt(crypto.createPrivateKey({
    key: privateKey,
    passphrase
  }), decryptBuffer).toString('utf-8')
}

export function hash(data) {
  return crypto.createHash('sha256')
    .update(data)
    .digest('hex')
}

export function getUniqueId() {
  return hash(`${Date.now()}-${Math.random()}-${Math.random()}`)
}
