<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import type { Character, Result } from '@/characters/interfaces/character';
import characterStore from '../../store/characters.store';
import breakingBadApi from '@/api/breakingBadApis';



const route = useRoute();

const { id } = route.params as { id: string };

const getCharacterCacheFirst = async( characterId: string ):Promise<Character> => {
    if (  characterStore.checkIdInStore(characterId) ) {
        return characterStore.ids.list[characterId];
    }

    const { data } = await breakingBadApi.get<Result>(`/character/${characterId}`);
    const response = {
        info: {
                count: 1,
                pages: 1,
                next: '',
                prev: null,
            },
            results: [data]
    };
    return response;
}

const { data: character } = useQuery(
    ['character', id],
    () => getCharacterCacheFirst(id),
    {
        onSuccess(character) {
            characterStore.loadedCharacter(character);
        }
    }
);

</script>

<template>
    <h1 v-if="!character">Loading...</h1>
    <div v-else>
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