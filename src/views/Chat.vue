<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="chat-page">
    <div class="chat-header">
      <span>房間：{{ roomId }}</span>
      <span>歡迎，{{ currentUser?.displayName }}</span>
      <div class="header-actions">
        <button class="back-btn" @click="backToRooms">← 選房間</button>
        <button @click="handleLogout">登出</button>
      </div>
    </div>

    <div class="messages">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="['message', msg.uid === currentUser?.uid ? 'mine' : 'theirs']"
      >
        <div class="message-time">{{ formatTime(msg.createdAt) }}</div>
        <strong>{{ msg.displayName }}：</strong>{{ msg.text }}
      </div>
    </div>

    <form class="send-form" @submit.prevent="handleSend">
      <input v-model="newMessage" type="text" placeholder="輸入訊息..." />
      <button type="submit">送出</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../firebase'
import { currentUser } from '../auth'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
const roomId = route.params.roomId

const router = useRouter()
const messages = ref([])
const newMessage = ref('')
let unsubscribe = null

onMounted(() => {
  const q = query(collection(db, 'messages'), where('roomId', '==', roomId), orderBy('createdAt'))

  unsubscribe = onSnapshot(q, (snapshot) => {
    messages.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  })
})

const messagesContainer = ref(null)
watch(messages, () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})

const handleSend = async () => {
  if (!newMessage.value.trim()) return

  await addDoc(collection(db, 'messages'), {
    text: newMessage.value,
    uid: currentUser.value.uid,
    displayName: currentUser.value.displayName,
    roomId: roomId,
    createdAt: serverTimestamp(),
  })

  newMessage.value = ''
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate()
  return date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
}

const backToRooms = () => {
  router.push('/room-select')
}

const handleLogout = async () => {
  await signOut(auth)
  router.push('/')
}
</script>
<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 680px;
  margin: 0 auto;
  background-color: #fff;
  border-left: var(--border-w) solid var(--ink);
  border-right: var(--border-w) solid var(--ink);
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: var(--border-w) solid var(--ink);
  background-color: var(--accent);
  color: var(--on-accent);
}

.chat-header span:first-child {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.chat-header span {
  font-weight: 700;
}

.chat-header button {
  padding: 8px 14px;
  font-size: 0.75rem;
  background-color: var(--ink);
  color: var(--paper);
  flex-shrink: 0;
}

.chat-header button:active {
  background-color: #333;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.message {
  padding: 12px 15px;
  border: var(--border-w) solid var(--ink);
  border-radius: var(--radius);
  max-width: 75%;
  word-break: break-word;
  box-shadow: 4px 4px 0 var(--ink);
  animation: pop 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.message.mine {
  margin-left: auto;
  text-align: right;
  background-color: var(--accent);
  color: var(--on-accent);
}

.message.theirs {
  background-color: #fff;
}

.message strong {
  font-family: var(--font-display);
  font-weight: 800;
}

.message-time {
  font-size: 11px;
  font-weight: 600;
  color: #6b6a62;
}

.message.mine .message-time {
  color: rgba(244, 242, 233, 0.75);
}

.send-form {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: var(--border-w) solid var(--ink);
}

.send-form input {
  flex: 1;
}

.send-form button {
  flex-shrink: 0;
}

@keyframes pop {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
