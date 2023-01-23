<template>
  <div class="table">
    <b-table  
      borderless 
      bordered
      table-variant="dark"
      hover 
      :items="filteredValutes.length ? filteredValutes : valutes"
      :fields="fields"
    >
      <template #cell(Delta)="data">
        <span :class="[ ( Number(data.item.Value) - Number(data.item.Previous) ) > 0 ? 'up': 'down']">
          {{ ( Number(data.item.Value) - Number(data.item.Previous) ).toFixed(4) }}
        </span>
      </template>
      <template #cell(Codes)="data" class="table-cell">
          <span class="table-cell__code-current">
            {{ `${data.item.CharCode}`}} 
          </span>
          <span> — </span>
          <span class="table-cell__code-active">
            {{`${activeValute.CharCode}`}} 
          </span>
      </template>
      <template #cell(Dependencies)="data">
          <span class="table-cell__code-current">{{ `1${data.item.CharCode}` }}</span>
          <span> — </span>
          <span class="table-cell__code-active">{{ `${(Number(data.item.Value)/Number(activeValute.Value)).toFixed(4)}` }}</span> 
          <span class="table-cell__code-active">{{ `, 1${activeValute.CharCode}` }}</span>
          <span> — </span>
          <span class="table-cell__code-current">{{ `${(Number(activeValute.Value)/Number(data.item.Value)).toFixed(4)} ${data.item.CharCode}` }}</span> 
      </template>
    </b-table>
  </div>
  </template>
  
  <script>
  import { defineComponent, computed, ref} from "vue";
  import { useStore } from "vuex";
  export default defineComponent({

  setup() {
    const store = useStore();
      
    const fields = ref([
      {
        key: 'Name',
        label: 'Наименование'
      },
      {
        key: 'Codes',
        label: 'Код'
      },
      {
        key: 'Dependencies',
        label: 'Соотношение курсов'
      },
      {
        key: 'Delta',
        label: 'Изменение'
      }
    ])

    const valutes = computed(() => {
        return store.getters.valutes;
    });

    const activeValute = computed(() => {
        return store.getters.activeValute;
    });

    const filteredValutes = computed(() => {
        return store.getters.filteredValutes;
    });

    return { valutes, fields, activeValute, filteredValutes };
  },
  });
  </script>

<style lang="scss" >
.table {
  border-radius: 22px;
  height: 900px;
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
.up {
  color: green;
}
.up:before {
  content: '↑';
  font-size: 25px;
  margin-right: 8px;
}
.down:before {
  content: '↓';
  font-size: 25px;
  margin-right: 8px;
}
.down {
  color: red;
}

.table-cell {
  &__code-current {
    color: rgb(224, 193, 105);
  }

  &__code-active {
    color: rgb(63, 189, 189);
  }
}
</style>