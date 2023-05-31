import breakingBadApi from "@/api/breakingBadApis";
import { onMounted, ref } from "vue";
import type { Character } from "@/characters/interfaces/character";
import axios from 'axios';

const characters = ref<Character>({ info: { count: 0, pages: 0, next: '', prev: null }, results: [] });
const isLoading = ref<boolean>(true);
const hasError = ref<boolean>(false);
const errorMessage = ref<string>();

export const useCharacters = () => {

    onMounted( async() => {
        await loadCharacters();
    } );

    const loadCharacters = async () => {

        if ( characters.value.results.length > 0 ) return;

        isLoading.value = true;

        try {
        
            const { data } = await breakingBadApi.get<Character>('/character')
     
                // console.log({ data: resp.data.results[0].name })
                characters.value = data;
                isLoading.value = false;

            
        } catch (error) {
            hasError.value = true;
            
            if ( axios.isAxiosError(error) ) {
                return errorMessage.value = error.message;
            }

            errorMessage.value = JSON.stringify(error);
        }

    }

    return {
         characters,
         isLoading,
         hasError,
         errorMessage,
    }
}