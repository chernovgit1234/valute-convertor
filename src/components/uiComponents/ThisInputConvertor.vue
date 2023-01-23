  <template>
    <div class="convert-input">
        <div class="convert-input__input">
          <input oninput="validity.valid||(value='based')" 
            v-if="based" style="direction: rtl;" 
            type="number" min="1" 
            v-model.trim="baseValue"  
            id="input-default"
          />
          <input v-else 
            style="direction: rtl;" 
            :disabled="disabled" 
            :value="converResultValue" 
          />
        </div>
        <div class="convert-input__dropdown dropdown">
          <button 
            class="btn btn-secondary dropdown-toggle dropdown__btn" 
            type="button" id="dropdownMenu3" 
            data-bs-toggle="dropdown" 
            aria-expanded="false" 
          >
            {{convertActiveValute.CharCode}} 
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu3">
            <li v-for="item in convertNamesValute">
              <button 
                @click="based ? getItemBased(item.code) : getItemResult(item.code)" 
                :class="{'active': item.active}" 
                class="dropdown-item" 
                type="button"
              >
                {{`${item.code}, ${item.name}`}}
              </button>
            </li>
          </ul>
        </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, watchEffect, ref, computed} from "vue";
  import { useStore } from "vuex";
  
  export default defineComponent({
    props: {
      disabled: {
        default: false,
        type: Boolean
      },
      convertActiveValute: {
        type: Object
        
      },
      convertNamesValute: {
        type: Array
      },
      based: {
        default: false,
        type: Boolean
      }
    },

    setup(props) {
      const store = useStore();

      const baseValue = ref(1)

      watchEffect(() => {
        store.dispatch('calcResultConvertor', baseValue.value)
      })
    
      const converResultValue = computed(() => {
        return store.getters.converResultValue;
      });

      const nameValutes = computed(() => {
        return store.getters.nameValutes
      });

      const disabled = props.disabled

      const based = props.based

      const convertNamesValute = computed(() => {
        return props.convertNamesValute 
      });

      const convertActiveValute = computed(() => {
        return props.convertActiveValute 
      });

      function getItemBased(CharCode) {
        store.dispatch("setConvertBasedActiveValute", CharCode);
      }

      function getItemResult(CharCode) {
        store.dispatch("setConvertActiveValute", CharCode);
      }

      return {
        nameValutes, baseValue,
        disabled, convertActiveValute,
        convertNamesValute, based,
        converResultValue, getItemBased, getItemResult
      };
    },
  });
  </script>

<style lang="scss" scoped>
.convert-input {
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: row;
    gap: 0px;

    &__input {
      input {
        border-left: 1px solid rgb(66, 59, 59);
        border-top: 1px solid rgb(66, 59, 59);;
        border-bottom: 1px solid rgb(66, 59, 59);;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        height: 82px;
        padding: 28px 15px ;
        font-size: 33px;
        max-width: 250px;
        outline: none;
      }
    }
}

.dropdown {
  &__btn {
    height: 82px;
    color: rgb(253, 253, 253);
    font-weight: 700;
    font-size:  23px;
    background-color: rgb(219, 171, 12);
  }
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>