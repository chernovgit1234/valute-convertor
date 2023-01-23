<template>
    <div class="main">
      <div class="main__tabs">
        <b-tabs content-class="mt-3" fill>
          <b-tab class="test" title="Список валют" active>
            <ThisListСurrency></ThisListСurrency>
          </b-tab>
          <b-tab title="Конвертер">
            <ThisConverter></ThisConverter>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </template>
  
  <script >
  import { defineComponent, computed} from "vue";
  import ThisListСurrency from "./ThisListСurrency.vue";
  import ThisConverter from "./ThisConverter.vue";
  
  export default defineComponent({
  components: { ThisListСurrency,  ThisConverter},

  setup() {

    return {};
  },
});
</script>
