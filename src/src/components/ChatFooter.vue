<script setup lang="ts">
import { computed, ref } from 'vue';
import VantField from 'vant/lib/field';
import VantButton from 'vant/lib/button';
import axios from 'axios';

import { useHistoryStore } from '../stores/history';
import { useModelNameStore } from '../stores/models';
import { useUniqueIdStore } from '../stores/uuid';

import { ComputedRef } from 'vue';

const history = useHistoryStore();
const modelNameObj = useModelNameStore();
const uniqueIdObj = useUniqueIdStore();
const content = ref('');

const URL = 'mechat.westlake.ink:6001';

// 发送按钮是否可用
let sendAvailable: ComputedRef<boolean> = computed(() => {
  return !content.value.trim();
});

// 消息发送请求
const sendUserContent = () => {
  if (sendAvailable && !!modelNameObj.modelName.length) {
    // 向后端发送请求的数据
    const userData = {
      role: 'user',
      content: content.value.trim(),
      unique_id: uniqueIdObj.uniqueId,
      model_name: modelNameObj.modelName,
    };

    history.addItem(userData);
    content.value = '';

    axios.post(`http://${URL}/v1/chat`, userData).then((res: any) => {
      // console.log(res);
      if (res.data.responseCode === 200) {
        history.addItem(res.data.item);
      }
    });
  }
};
</script>

<template>
  <div class="chat-footer-outer van-hairline--top">
    <div class="chat-footer-inner">
      <VantField
        v-model="content"
        @keydown.enter.prevent="sendUserContent"
        class="user-input"
        rows="1"
        type="textarea"
        placeholder="和我聊聊吧"
        input-align="left"
        maxlength="400"
      />
      <VantButton
        text="发送"
        round
        class="user-button"
        @click="sendUserContent"
        :disabled="sendAvailable"
      ></VantButton>
    </div>
  </div>
  <div class="footnote">@2024 西湖大学深度学习实验室</div>
</template>

<style scoped>
.chat-footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.user-input {
  margin: 5px 0 0 5px;
  border-radius: 22px;
  max-height: 40px;
  overflow-y: auto;
}
.user-button {
  font-size: 14px;
  color: #000;
  width: 80px;
  margin: 5px 0 0 5px;
  background-color: #17e6b9;
}
.footnote {
  font-size: 12px;
  margin: auto;
  text-align: center;
  margin-bottom: 5px;
}
</style>
