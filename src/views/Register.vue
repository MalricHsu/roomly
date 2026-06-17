<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="auth-page">
    <BrandMark />
    <h2>註冊帳號</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="name" type="text" placeholder="姓名" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="密碼（至少6字元）" required />
      <button type="submit">註冊</button>
    </form>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <router-link to="/">已經有帳號？前往登入</router-link>
  </div>
</template>
<script setup>
import BrandMark from '@/components/BrandMark.vue'
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const name = ref()
const email = ref()
const password = ref()
const errorMsg = ref('')

const errorMessages = {
  'auth/email-already-in-use': '這個 Email 已經被註冊過了',
  'auth/invalid-email': 'Email 格式不正確',
  'auth/weak-password': '密碼至少需要 6 個字元',
}

const handleRegister = async () => {
  errorMsg.value = ''
  try {
    const result = await createUserWithEmailAndPassword(auth, email.value, password.value)
    await updateProfile(result.user, { displayName: name.value })
    router.push('/')
  } catch (error) {
    errorMsg.value = errorMessages[error.code] || '註冊失敗，請稍後再試'
    console.log('錯誤代號:', error.code)
    console.log('完整錯誤:', error)
  }
}
</script>
