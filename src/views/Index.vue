<template>
    <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ElPagination } from 'element-plus'

export default defineComponent({
    name: 'App',
    components: {
        ElPagination
    },
})
</script>