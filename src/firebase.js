// 匯入需要的 Firebase SDK
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// 建立一個名為 firebaseConfig 的 JavaScript 物件
const firebaseConfig = {
  apiKey: 'AIzaSyCv9cNnwpUBVMA5ej1BpRvGQov7YO0oM0I',
  authDomain: 'chat-app-2dd7e.firebaseapp.com',
  projectId: 'chat-app-2dd7e',
  storageBucket: 'chat-app-2dd7e.firebasestorage.app',
  messagingSenderId: '851766491473',
  appId: '1:851766491473:web:e34fdaf22b068d31983b70',
}
// 初始化 Firebase
const app = initializeApp(firebaseConfig)

// 匯出 auth 和 firestore 的實例
export const auth = getAuth(app)
export const db = getFirestore(app)
