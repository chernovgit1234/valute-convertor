<template>
  <div class="dropdown">
    <button 
      class="btn btn-secondary dropdown-toggle" 
      type="button" id="dropdownMenu2" 
      data-bs-toggle="dropdown" 
      aria-expanded="false" 
    >
      {{`${activeValute.CharCode}, ${activeValute.Name}`}}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
      <li v-for="item in nameValutes">
        <button 
          @click="getItem(item.name)" 
          class="dropdown-item"  
          :class="{'active': item.active}" 
          type="button"
        >
          {{item.name}}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, computed} from "vue";
import { useStore } from "vuex";
export default defineComponent({

  setup() {
    const store = useStore();
   
    const activeValute = computed(() => {
      return store.getters.activeValute
    });

    const nameValutes = computed(() => {
        return store.getters.nameValutes
    });

    function getItem(CharCode) {
      store.dispatch("setActiveValute", CharCode);
    }

    return { getItem, nameValutes, activeValute };
  },
});
</script>

<style lang="scss" scoped>
.dropdown {
  button {
    height: 50px;
  }
}
.dropdown-toggle {
  min-width: 400px;
}
.dropdown-menu {
  max-height: 300px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;              
  }
  &::-webkit-scrollbar-track {
    background: rgba(200, 200, 209, 0.87);   
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(116, 115, 115);   
    border-radius: 4px;    
  }
}
</style>