<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import useCharacter from '@/characters/composables/useCharacter';
import { watchEffect } from 'vue';



const route = useRoute();
const router = useRouter();

const { id } = route.params as { id: string };
const { character, hasError, errorMessage, isLoading } = useCharacter(id);

watchEffect( () => {
    if (!isLoading.value && hasError.value) {
        router.replace('/characters');
    } 
});

</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>
    <h1 v-else-if="hasError">{{ errorMessage }}</h1>
    <div v-else-if="character">
        <h1>{{  character.results[0].name  }}</h1>
        <div class="character-container">
            <img :src="character.results[0].image" :alt="character.results[0].name">
            <ul>
                <li>Especie: {{ character.results[0].species }}</li>
                <li>Genero: {{ character.results[0].gender }}</li>
                <li>Estado: {{ character.results[0].status }}</li>
                <li>Origen: {{ character.results[0].origin.name }}</li>
                <li>Ubicación: {{ character.results[0].location.name }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

.character-container {
    display: flex;
    flex-direction: row;
}

img {
    width: 150px;
    border-radius: 5px;
}

</style>