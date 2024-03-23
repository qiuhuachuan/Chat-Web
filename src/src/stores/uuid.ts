import { defineStore, acceptHMRUpdate } from 'pinia';

export const useUniqueIdStore = defineStore({
  id: 'unique_id',
  state: () => ({
    uniqueId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    ),
  }),
  actions: {
    changeUniqueId() {
      this.uniqueId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUniqueIdStore, import.meta.hot));
}
