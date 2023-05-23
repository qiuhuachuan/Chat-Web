import { defineStore, acceptHMRUpdate } from 'pinia';
// import { useUserStore } from './user';
interface Message {
  owner: string;
  msg: string;
  thumb_up?: boolean;
  thumb_down?: boolean;
  unique_id: string;
}
export const useHistoryStore = defineStore({
  id: 'history',
  state: () => ({
    rawItems: [] as Message[],
  }),
  actions: {
    addItem(item: Message) {
      this.rawItems.push(item);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHistoryStore, import.meta.hot));
}
