<script setup>
import { onMounted, ref } from 'vue'
import { useEncryptStorage } from '@/composables/encryptStorage'
import axios from 'axios'

const { setEncryptItem, getEncryptItem } = useEncryptStorage()
const http = axios.create({ baseURL: 'http://api-crypto.test/api' })
const user = ref(null)
const enc = ref(null)
const dec = ref(null)

onMounted(async () => {
  const response = await http.get('/user')
  user.value = JSON.stringify(response.data.user)
  enc.value = response.data.enc
  setEncryptItem('user', response.data.enc)

  dec.value = JSON.parse(getEncryptItem('user'))
})
</script>

<template>
  <main class="flex flex-col">
    <h1 class="text-2xl">Usuário</h1>
    <h2 class="text-xl ml-3">Encriptado</h2>
    <span class="ml-6">{{ enc }}</span>
    <h2 class="text-xl ml-3">Decriptado</h2>
    <span class="ml-6">{{ dec }}</span>
  </main>
</template>
