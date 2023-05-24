<script setup lang="ts">
import { watch } from 'vue';

import ChatHeader from './ChatHeader.vue';
import ChatBox from './ChatBox.vue';
import ChatFooter from './ChatFooter.vue';

import { useHistoryStore } from '../stores/history';

const history = useHistoryStore();

// 动态将垂直滚动条处于最底端
const updateChatBox = () => {
  const Chat: any = document.getElementById('chat');
  Chat.scrollTop = Chat.scrollHeight;
};
watch(() => history.rawItems.length, updateChatBox, { flush: 'post' });
</script>

<template>
  <div class="container">
    <div class="sub-chat-header">
      <ChatHeader></ChatHeader>
    </div>

    <ChatBox class="sub-chat-box" id="chat"></ChatBox>

    <div class="sub-chat-footer">
      <ChatFooter></ChatFooter>
    </div>
  </div>
</template>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: inherit;
  max-width: 500px;
  padding: auto;
  margin: auto;
  .sub-chat-header {
    height: 30px;
    line-height: 30px;
    text-align: right;
    background-color: #ffffff;
    font-size: 14px;
    flex-shrink: 0;
    padding-right: 60px;
  }
  .sub-chat-box {
    height: auto;
    background-color: #eee;
    flex: 1;
    width: 100%;
    overflow-y: scroll;
  }
  .sub-chat-footer {
    background-color: #ccc;
    font-size: 30px;
    flex-shrink: 0;
  }
}
@media only screen and (max-width: 767px) {
  .container {
    max-width: 100%;
    padding: 0 10px;
  }
}
</style>
