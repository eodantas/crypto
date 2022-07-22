import { util, cipher, random } from 'node-forge'
import { ref } from 'vue'

export const useCrypto = () => {
  const key = '82PmZi8zf5E5btT8UCM6Y2s6uhfBFGAe'
  const iv = util.decode64('hEDITs4OF9MQ29JgW8nAVQ==')
  let decrypted = ref('')

  const decrypt = (dados) => {
    const encryptedBytes = util.decode64(dados)
    const decipher = cipher.createDecipher('AES-CBC', key)
    decipher.start({ iv: iv })
    const length = encryptedBytes.length
    const chunkSize = 1024 * 64
    let index = 0
    let buf = null
    do {
      decrypted.value += decipher.output.getBytes()
      buf = util.createBuffer(encryptedBytes.substring(index, chunkSize))
      decipher.update(buf)
      index += chunkSize
    } while (index < length)
    decipher.finish()
    decrypted.value += decipher.output.getBytes()
  }

  const generateIV = () => {
    return util.encode64(random.getBytesSync(16))
  }

  return { decrypted, decrypt, generateIV }
}
