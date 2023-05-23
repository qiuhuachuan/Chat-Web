<script setup lang="ts">
import { computed, ref } from 'vue';
import VantField from 'vant/lib/field';
import VantButton from 'vant/lib/button';
import axios from 'axios';

import { useHistoryStore } from '../stores/history';
import { ComputedRef } from 'vue';

const history = useHistoryStore();
const msg = ref('');

function guid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 发送按钮是否可用
let sendAvailable: ComputedRef<boolean> = computed(() => !msg.value.trim());
const UNIQUE_ID = guid();

// 消息发送请求
const sendSeekerMsg = () => {
  if (sendAvailable) {
    // 向后端发送请求的数据
    const seekerData = {
      owner: 'seeker',
      msg: msg.value,
      thumb_up: false,
      thumb_down: false,
      unique_id: UNIQUE_ID,
    };

    history.addItem(seekerData);
    msg.value = '';

    axios
      .post('http://172.16.75.141:8002/v1/chat', seekerData)
      .then((res: any) => {
        console.log(res);
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
        v-model="msg"
        class="seeker-input"
        rows="1"
        type="textarea"
        placeholder="和我聊聊心事吧"
        input-align="left"
        maxlength="400"
      />
      <VantButton
        text="发送"
        round
        class="seeker-button"
        @click="sendSeekerMsg"
        :disabled="sendAvailable"
      ></VantButton>
    </div>
  </div>
  <div class="footnote">@2023 Zhejiang University & Westlake University</div>
</template>

<style scoped>
.chat-footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.seeker-input {
  margin: 5px;
  border-radius: 22px;
  max-height: 40px;
  overflow-y: auto;
}
.seeker-button {
  font-size: 14px;
  color: #000;
  width: 80px;
  margin: 5px;
  background-color: #17e6b9;
}
.footnote {
  font-size: 15px;
  margin: auto;
  text-align: center;
  margin-bottom: 5px;
}
</style>
