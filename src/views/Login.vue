<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="auth-page">
    <BrandMark featured />
    <h2>登入</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="密碼" required />
      <button type="submit">登入</button>
    </form>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <router-link to="/register">還沒有帳號？前往註冊</router-link>
    <br />
    <router-link to="/forgot-password">忘記密碼？</router-link>
  </div>
</template>
<script setup>
import BrandMark from '@/components/BrandMark.vue'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMsg = ref('')

const errorMessages = {
  'auth/user-not-found': '找不到這個帳號',
  'auth/wrong-password': '密碼錯誤',
  'auth/invalid-credential': '帳號或密碼錯誤',
  'auth/too-many-requests': '嘗試次數過多，請稍後再試',
}

const handleLogin = async () => {
  errorMsg.value = ''
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/room-select')
  } catch (error) {
    errorMsg.value = errorMessages[error.code] || '登入失敗，請稍後再試'
  }
}
</script>
