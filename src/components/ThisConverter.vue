<template>
  <div class="convertor">
    <div class="convertor__contain">
      <div class="convertor__blocks">
        <div class="convertor__block">
          <ThisInputConvertor 
            :convertActiveValute="convertActiveValuteBased"
            :convertNamesValute="convertNamesValuteBased"
            :based="true"
          ></ThisInputConvertor>
        </div>
        <div class="convertor__block" @click="replaceValute()">
          <div class="convertor__block-action">
            <span class="convertor__arrow-left">→</span>
            <span class="convertor__arrow-right">←</span>
          </div>
        </div>
        <div class="convertor__block">
          <ThisInputConvertor 
            :disabled="true" 
            :convertActiveValute="convertActiveValute"
            :convertNamesValute="convertNamesValute"
            :based="false"
          ></ThisInputConvertor>
        </div>
      </div>
      <div class="convertor__info">
        <span>{{ `1 ${convertActiveValuteBased.Name} = ${(converResultValue / baseValue).toFixed(4)} ${convertActiveValute.Name}` }}</span>
      </div>
    </div>
  </div>
</template>

<script >
import { defineComponent, computed, watch, ref, watchEffect, reactive} from "vue";
import ThisInputConvertor from "./uiComponents/ThisInputConvertor.vue";
import { useStore } from "vuex";

export default defineComponent({
    setup() {
      const store = useStore(); 
      
      const converResultValue = computed(() => {
          return store.getters.converResultValue; 
      });

      const baseValue = computed(() => {
          return store.getters.baseValue; 
      });

      const convertActiveValuteBased = computed(() => {
          return store.getters.convertActiveValuteBased; 
      });
      const convertNamesValuteBased = computed(() => {
          return store.getters.convertNamesValuteBased;
      });

      const convertActiveValute = computed(() => {
          return store.getters.convertActiveValute;
      });
      const convertNamesValute = computed(() => {
          return store.getters.convertNamesValute;
      });

      function replaceValute() {
        store.dispatch("replaceValute");
      }

      return { 
        replaceValute, convertActiveValuteBased, 
        convertNamesValuteBased, convertActiveValute, 
        convertNamesValute, converResultValue, baseValue
      };
    },
    components: { ThisInputConvertor }
});
</script>

<style lang="scss" scoped>
 
 .convertor {
  padding: 200px 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__blocks {
    width: 800px;
    display: flex;
    flex-direction: row;
    gap: 25px;
    align-items: center;
    justify-content: space-between;
  }

  &__block {

  }

  &__contain {
    display: flex;
    flex-direction: column;
  }

  &__block-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 45px;

    padding: 8px;
    cursor: pointer;
    transition: all 0.3s ease 0s;

    @media (any-hover: hover){
      &:hover{
        background-color: rgb(219, 171, 12);

        span {
          color: white;
        }
        
      }
    }

    span {
      color: rgb(66, 59, 59);
      margin: -12px 11px;
    }
  }

  &__info {
    font-size: 23px;
    color: rgb(99, 86, 86);
  }
}

</style>