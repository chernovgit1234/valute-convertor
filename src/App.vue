<template>
  <div class="app">
    <div class="app__header">
      <header></header>
    </div>
    <div class="app__main">
      <this-main></this-main>
    </div>
    <div class="app__footer">
      <footer>Чернов С.Д.</footer>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted} from "vue";
import ThisMain from "./components/ThisMain.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { ThisMain },
  setup() {
    const store = useStore()

    return {}
  },
});

</script>

<style lang="scss" >
.app {
  min-height: 100%;
	display: flex;
	flex-direction: column;


  &__header {
    height: 60px;
    background-color: #373b3e;
  }

  &__main {

    height: 100%;
    padding: 20px 200px;
    flex: 1 1 auto;
  }

  &__footer {
    height: 60px;
    background-color: #373b3e;
    color: aliceblue; 
  }
}

</style>