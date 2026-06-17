<template>
  <h1 :class="['brand', { 'brand--featured': featured }]">Roomly</h1>
</template>

<script setup>
defineProps({
  featured: { type: Boolean, default: false },
})
</script>

<style scoped>
.brand {
  align-self: flex-start;
  margin: 0 0 4px;
  padding: 6px 14px;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--on-accent);
  background-color: var(--accent);
  border: var(--border-w) solid var(--ink);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

/* 登入頁：置中、放大 */
.brand--featured {
  align-self: center;
  margin-bottom: 12px;
  padding: 12px 28px;
  font-size: clamp(2.6rem, 11vw, 4rem);
  letter-spacing: 0.01em;
  box-shadow: var(--shadow-lg);
}
</style>
