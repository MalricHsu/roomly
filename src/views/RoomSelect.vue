<template>
  <div class="room-select">
    <BrandMark />
    <h2>輸入房間代碼</h2>
    <form @submit.prevent="enterRoom">
      <input v-model="roomCode" type="text" placeholder="輸入房間名稱或代碼" required />
      <button type="submit">進入房間</button>
    </form>
  </div>
</template>

<script setup>
import BrandMark from '@/components/BrandMark.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const roomCode = ref('')

const enterRoom = () => {
  const trimmed = roomCode.value.trim()
  if (!trimmed) return
  router.push(`/chat/${trimmed}`)
}
</script>

<style scoped>
.room-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  padding: 48px 24px;
  min-height: 100vh;
  justify-content: center;
  animation: slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.room-select h2 {
  position: relative;
  margin: 0 0 4px;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(2.4rem, 9vw, 3.4rem);
  line-height: 0.92;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.room-select h2::after {
  content: '';
  position: absolute;
  left: -4px;
  right: 20%;
  bottom: 4px;
  height: 0.32em;
  background-color: var(--accent);
  z-index: -1;
}

.room-select form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 28px 24px;
  background-color: #fff;
  border: var(--border-w) solid var(--ink);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
