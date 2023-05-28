<script setup lang="ts">
// import { useCharacters } from '@/characters/composables/useCharacters';
import type { Character } from '@/characters/interfaces/character';
import CharacterCard from "@/characters/components/CharacterCard.vue";

const props = defineProps<{characters: Character}>();

//! 1- Normal suspense
// const { data: characters } = await breakingBadApi.get<Character>('/character');
// const characters = ref<Character>(data);

//! 2- Composable
// const {isLoading, characters, hasError, errorMessage} = useCharacters();

//! 3- TanStack Query
// const getCharactersSlow = async():Promise<Character> => {

// return new Promise( (resolve) => {

//     setTimeout( async() => {
//         const { data } = await breakingBadApi.get<Character>('/character');
//         resolve(data);
//     }, 1);

// });

// }

// const { isLoading, isError, data: characters, error } = useQuery(
//     ['character'],
//     getCharactersSlow,
    // {
    //     cacheTime: 1000 * 60,
    //     refetchOnReconnect: 'always',
    // }
// );

</script>

<template>
   <div class="card-list" v-if="props.characters">
    <CharacterCard
        v-for="character of characters.results"
        :key="character.id"
        :character="character"
    />
   </div>
</template>

<style scoped>

.card-list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

</style>