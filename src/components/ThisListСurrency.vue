<template>
    <div class="list-currency">
        <div class="list-currency__dropdown">
            <ThisSearch></ThisSearch>
            <ThisDropdown></ThisDropdown>
        </div>
        <div class="list-currency__list">
            <ThisTable></ThisTable>
        </div>
    </div>
</template>
<script>

import { defineComponent, onMounted} from "vue";
import ThisDropdown from "./uiComponents/ThisDropdown.vue";
import ThisTable from "./uiComponents/ThisTable.vue";
import ThisSearch from "./uiComponents/ThisSearch.vue";
import { useStore } from "vuex";

export default defineComponent({

    setup() {
        const store = useStore();

        onMounted(() => {
          store.dispatch("getCurrents");
        });

        return {};
    },

    components: { ThisDropdown, ThisTable, ThisSearch }
});
</script>

<style lang="scss" scoped>
.list-currency {
    &__dropdown {
        padding: 10px;
        margin-bottom: 50px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 30px;
    }

    &__list {
    }
}

</style>