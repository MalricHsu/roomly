// 匯入需要的模組
import { ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

// 建立一個名為 user 的 ref，用來儲存目前登入的使用者資訊
export const currentUser = ref(null)
// 建立一個名為 authReady 的 ref，用來儲存目前是否已完成驗證
export const authReady = ref(false)

// 建立一個 onAuthStateChanged 的監聽器，用來監聽使用者的登入狀態
onAuthStateChanged(auth, (user) => {
  currentUser.value = user
  authReady.value = true
})
