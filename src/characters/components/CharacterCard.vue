<script setup lang="ts">
import { toRef } from 'vue';
import type { Result } from '@/characters/interfaces/character';
import { useRouter } from 'vue-router';


interface Props {
    character: Result
}

const props = defineProps<Props>();
const character = toRef(props, 'character');

const router = useRouter();

const goTo = () => {
    router.push(`by/${ character.value.id }`)
}

</script>

<template>
    <div class="character-card" @click="goTo()">
        <img v-if="[19].includes(character.id)" src="https://static.wikia.nocookie.net/rickandmorty/images/4/49/Antenna_Rick.png/revision/latest?cb=20161121231006">
        <img v-else :src="character.image" :alt="character.name">
        <h3>{{ character.name }}</h3>
    </div>
</template>

<style scoped>
.character-card{
    margin-right: 5px;
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
}

img{
    width: 150px;
    border-radius: 5px 5px 0px 0px;
    box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.1);
}

img:hover{
    box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.5);
    transition: all .5s;
}
</style>