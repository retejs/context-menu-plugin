<template>
<div class="search">
    <input v-model="value" @change="$emit('search', value)">
</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    props: {'value': String},
    emits: ["search"]
})
</script>


<style lang="scss" scoped>
.search {
    input {
        color: white;
        padding: 1px 8px;
        border: 1px solid white;
        border-radius: 10px;
        font-size: 16px;
        font-family: serif;
        width: 100%;
        box-sizing: border-box;
        background: transparent;
    }
}
</style>
