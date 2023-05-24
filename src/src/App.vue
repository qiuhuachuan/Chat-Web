<script setup lang="ts">
import Chat from './components/Chat.vue';
</script>

<template>
  <Chat class="chat" />
</template>

<style scoped>
.chat {
  height: 100vh;
}
@media only screen and (max-width: 767px) {
  .chat {
    height: 90vh;
  }
}
</style>
