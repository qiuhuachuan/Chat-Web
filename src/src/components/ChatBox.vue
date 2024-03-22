<script setup lang="ts">
import { Toast } from 'vant';
import axios from 'axios';
import { ref } from 'vue';
// import { Picker } from 'vant';

import { useHistoryStore } from '../stores/history';
import { useModelNameStore } from '../stores/models';

const history = useHistoryStore();
const modelNameObj = useModelNameStore();

const assistantAvatar = '/images/assistant.png';
const userAvatar = '/images/user.png';
// const URL = '172.16.75.141:8002';
const URL = 'mechat.westlake.ink:6001';

interface RatingContentItem {
  unique_id: string;
  thumb_up?: boolean;
  thumb_down?: boolean;
  idx: number;
}

const columns = [
  { text: 'qwen1-5-72b-chat', value: 'qwen1-5-72b-chat' },
  { text: 'yi-34b-chat', value: 'yi-34b-chat' },
  { text: 'qwen1-5-7b-chat-sft', value: 'qwen1-5-7b-chat-sft' },
];

const showPicker = ref(false);

const onConfirm = ({ selectedOptions }: any) => {
  showPicker.value = false;
  modelNameObj.modelName = selectedOptions[0].text;
  console.log(modelNameObj.modelName);
};

// 点赞和踩赞请求
const handleRating = (item: any, key: string, idx: number) => {
  item[key] = true;
  const data: RatingContentItem = {
    [key]: true,
    unique_id: item['unique_id'],
    idx: idx,
  };
  // 向后端提交点赞和踩赞的状态更新
  axios.post(`http://${URL}/v1/eval`, data).then((res: any) => {
    if (res.data.responseCode != 200) {
      Toast.fail('网络异常，评论失败。');
    }
  });
};
</script>

<template>
  <div class="chat-container">
    <van-field
      v-model="modelNameObj.modelName"
      is-link
      readonly
      label="模型"
      placeholder="选择模型"
      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>

    <div class="assistant">
      <img :src="assistantAvatar" />
      <div class="assistant-content">
        <div class="details">
          欢迎来到「小天咨询室 」，我们用心聆听你的声音。
        </div>
      </div>
    </div>

    <div :class="item.role" v-for="(item, idx) of history.rawItems" :key="idx">
      <img :src="item.role == 'assistant' ? assistantAvatar : userAvatar" />
      <div
        :class="item.role == 'assistant' ? 'assistant-content' : 'user-content'"
      >
        <div class="details">{{ item.content }}</div>
        <div
          v-if="item.role == 'assistant' && item.content"
          style="display: flex; flex-direction: row"
        >
          <div
            v-show="!item.thumb_up && !item.thumb_down"
            style="margin-left: 20px; width: 15px; height: 15px"
            class="circle"
          >
            <svg
              @click.once="handleRating(item, 'thumb_up', idx)"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 11v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3a4 4 0 0 0 4-4V6a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1-2 2h-7a3 3 0 0 1-3-3"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
          <div
            v-show="!item.thumb_down && !item.thumb_up"
            style="margin-left: 20px; width: 15px; height: 15px"
            class="circle"
          >
            <svg
              @click.once="handleRating(item, 'thumb_down', idx)"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 13V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2-2l-1-5a2 3 0 0 0-2-2h-7a3 3 0 0 0-3 3"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
          <div
            v-show="item.thumb_up"
            style="margin-left: 20px; width: 15px; height: 15px"
            class="circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 11v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3a4 4 0 0 0 4-4V6a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1-2 2h-7a3 3 0 0 1-3-3"
                :fill="!item.thumb_up ? 'none' : '#eebf52'"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
          <div
            v-show="item.thumb_down"
            style="margin-left: 20px; width: 15px; height: 15px"
            class="circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 13V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2-2l-1-5a2 3 0 0 0-2-2h-7a3 3 0 0 0-3 3"
                :fill="!item.thumb_down ? 'none' : '#59b269'"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.circle {
  border: 1px solid #ffffff;
  border-radius: 50%;
  background-color: #ffffff;
}
.chat-container {
  height: 100%;
  .assistant {
    display: flex;
    flex-direction: row;
    padding: 6px 30px 6px 6px;
    img {
      margin: 5px;
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
    .assistant-content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      .details {
        max-width: 260px;
        margin: 5px;
        margin-right: auto;
        white-space: pre-wrap;
        word-break: break-all;
        padding: 12px;
        font-size: 14px;
        text-align: left;
        flex: 1;
        background-color: #fff;
        border-top-right-radius: 16px;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
      }
      .text-title {
        margin: 5px;
        border-top-right-radius: 16px;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
        max-height: 60px;
      }
      .text-content {
        margin: 5px;
        border-top-right-radius: 16px;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
        max-height: 320px;
      }
    }
  }
  .user {
    display: flex;
    flex-direction: row-reverse;
    img {
      margin: 5px;
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
    .user-content {
      display: inline-flex;
      flex-flow: column wrap;
      div {
        max-width: 250px;
        margin: 5px;
        margin-left: auto;
        white-space: pre-wrap;
        word-break: break-all;
        padding: 12px;
        font-size: 14px;
        text-align: left;
        flex: 1;
        background-color: #59b269;
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
      }
    }
  }
}
</style>
