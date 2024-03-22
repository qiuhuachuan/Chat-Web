import { defineStore, acceptHMRUpdate } from 'pinia';

export const useModelNameStore = defineStore({
  id: 'modelName',
  state: () => ({
    modelName: '',
  }),
  actions: {
    changeModelName(modelName: string) {
      this.modelName = modelName;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModelNameStore, import.meta.hot));
}
