<template>
  <div class="auth-page">
    <BrandMark />
    <h2>重設密碼</h2>
    <p class="notice">⚠ 此功能請不要使用</p>
    <form @submit.prevent="handleReset">
      <input v-model="email" type="email" placeholder="Email" required />
      <button type="submit">寄送重設信件</button>
    </form>
    <p v-if="message">{{ message }}</p>
    <router-link to="/">返回登入</router-link>
  </div>
</template>
<script setup>
import BrandMark from '@/components/BrandMark.vue'
import { auth } from '@/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { ref } from 'vue'

const email = ref('')
const message = ref('')

const handleReset = async () => {
  message.value = ''
  try {
    await sendPasswordResetEmail(auth, email.value)
  } catch (error) {
    message.value = '發生錯誤，請確認 Email 是否正確' || error
  }
}
</script>

<style scoped>
.notice {
  margin: 0;
  padding: 12px 16px;
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--on-accent);
  background-color: var(--accent);
  border: var(--border-w) solid var(--ink);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  text-transform: none;
}
</style>
