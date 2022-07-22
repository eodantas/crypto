import { useCrypto } from '@/composables/crypto'

export const useEncryptStorage = () => {
  const setEncryptItem = (name, value) => {
    sessionStorage.setItem(name, value)
  }

  const getEncryptItem = (name) => {
    const { decrypted, decrypt } = useCrypto()
    const data = sessionStorage.getItem(name)
    if (data) {
      decrypt(data)
      return decrypted.value
    }
    return null
  }

  return { setEncryptItem, getEncryptItem }
}
