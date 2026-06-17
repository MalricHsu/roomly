# Roomly

以房間代碼即時聊天的 Web App。使用者註冊／登入後，輸入房間代碼即可進入聊天室，與同房間的人即時收發訊息。

採用 **大膽編輯雜誌風** 介面：米白紙質背景、超大粗體標題、粗黑框與硬投影（neo-brutalism），搭配深紅撞色。

## 技術

- **Vue 3** + `<script setup>`
- **Vite** 開發／打包
- **Vue Router** 路由與登入守衛
- **Firebase** Authentication（Email／密碼）+ Cloud Firestore（即時訊息）

## 頁面

| 路由 | 頁面 | 說明 |
| --- | --- | --- |
| `/` | 登入 | Email／密碼登入 |
| `/register` | 註冊 | 建立帳號 |
| `/forgot-password` | 重設密碼 | 寄送重設信件（目前停用） |
| `/room-select` | 選擇房間 | 輸入房間代碼，需登入 |
| `/chat/:roomId` | 聊天室 | 即時收發訊息，需登入 |

## 樣式架構

- `src/assets/main.css` — 全域樣式與設計變數（`:root` 的 `--accent`、`--ink`、`--border-w`、`--shadow` 等）。換配色只要改這裡的變數。
- 各頁面 `<style scoped>` — 頁面專屬樣式。
- `src/components/BrandMark.vue` — 共用的 `Roomly` 品牌標誌（`featured` 屬性可放大置中）。

## 環境需求

- Node.js `^20.19.0` 或 `>=22.12.0`

## 開始開發

```sh
npm install
```

### 啟動開發伺服器（熱更新）

```sh
npm run dev
```

### 打包正式版

```sh
npm run build
```

### 預覽正式版打包結果

```sh
npm run preview
```

### Lint

```sh
npm run lint
```

### 格式化

```sh
npm run format
```

## Firebase 設定

Firebase 設定目前寫在 `src/firebase.js`。若要連到自己的 Firebase 專案，請替換該檔案中的 `firebaseConfig`，並在 Firebase 主控台啟用 **Authentication（Email／密碼）** 與 **Cloud Firestore**。

## 推薦的開發環境

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（請停用 Vetur）。
