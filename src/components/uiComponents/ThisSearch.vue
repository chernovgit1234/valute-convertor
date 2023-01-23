
<template>
    <div class="search">
      <b-form-input  
        v-model.trim="search" 
        size="lg" 
        id="input-default" 
        placeholder="Поиск по коду и названию"
      ></b-form-input>
    </div>
</template>

<script>
import { defineComponent, ref, watch} from "vue";
import { useStore } from "vuex";
export default defineComponent({

  setup() {
    const store = useStore();
    
    const search = ref('')

    watch(search, (valueSearch) => {
      if (valueSearch.length) {
        store.dispatch('searchByNameAndCode', valueSearch)
      } else {
        store.dispatch('clearFilteredValutes')
      }
    });

    return {search};
  },
});
</script>

<style lang="scss" scoped>
  .search {
    width: 500px;
  }
</style>