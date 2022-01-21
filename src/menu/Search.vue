<template>
<div class="search">
    <input v-model="valueRef" @change="$emit('search', valueRef)">
</div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        value: { type: String, default: '' }
    },
    emits: ["search"],
    setup(props) {
        const valueRef = ref(props.value)
        return {
            valueRef
        }
    }
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
