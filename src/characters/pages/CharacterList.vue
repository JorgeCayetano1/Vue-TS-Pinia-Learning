<script setup lang="ts">
import CardList from '@/characters/components/CardList.vue'
import { useQuery } from '@tanstack/vue-query';
import breakingBadApi from '@/api/breakingBadApis';
import type { Character } from '../interfaces/character';
import characterStore from '../../store/characters.store';

const props = defineProps<{ title: string, visible:boolean, }>();

const getCharactersListCacheFirst = async(): Promise<Character> => {

        if ( characterStore.character.count > 0 ) {
                return characterStore.character.list;
        }
        
                const { data } = await breakingBadApi.get<Character>('/character');
                return data;
        
};

useQuery(
        ['characters'],
        getCharactersListCacheFirst,
        {
                onSuccess(data) {
                        characterStore.loadedCharacters(data);
                },
                onError(error) {
                        characterStore.loadedCharacters(JSON.stringify(error));
                }
        }
);

</script>

<template>

        <h1 v-if="characterStore.character.isLoading">Loading...</h1>

        <div v-else-if="characterStore.character.hasError">
                <h1>Error al cargar</h1>
                <p>{{ characterStore.character.errorMessage }}</p>
        </div>

        <h1>{{ props.title }}</h1>

        <CardList :characters="characterStore.character.list" />

</template>

<style scoped>

</style>