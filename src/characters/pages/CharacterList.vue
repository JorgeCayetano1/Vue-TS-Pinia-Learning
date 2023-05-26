<script setup lang="ts">
import CardList from '@/characters/components/CardList.vue'

const props = defineProps<{ title: string, visible:boolean, }>();

</script>

<template>

        <h1>{{ props.title }}</h1>

        <CardList />

</template>

<style scoped>

</style>