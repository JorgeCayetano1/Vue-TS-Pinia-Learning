import { ref, computed } from 'vue';
import type { Character } from '@/characters/interfaces/character';
import { useQuery } from '@tanstack/vue-query';
import breakingBadApi from '@/api/breakingBadApis';

const characters = ref<Character>({ info: { count: 0, pages: 0, next: '', prev: null }, results: [] });
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacters = async(): Promise<Character> => {

    if ( characters.value.results.length > 0 ) {
            return characters.value;
    }
    
            const { data } = await breakingBadApi.get<Character>('/character');
            return data;
    
};

const loadedCharacters = ( data: Character | string ) => {
    hasError.value = false;
    errorMessage.value = null;
    if (typeof data === 'string') {
        hasError.value = true;
        errorMessage.value = 'Error al cargar los personajes';

    } else {
        characters.value = {
            info: data.info,
            results: data.results.filter( character => ![19].includes(character.id) )
        }
    }
}

const useCharacters = () => {

    const { isLoading } = useQuery(
        ['characters'],
        getCharacters,
        {
                onSuccess(data) {
                    loadedCharacters(data);
                },
                onError(error) {
                    loadedCharacters(JSON.stringify(error));
                }
        }
    );
    
    return {
        // Properties
        characters,
        errorMessage,
        hasError,
        isLoading,

        // Getters
        count: computed( ()=> characters.value.results.length ),

        // Methods
    }
}

export default useCharacters;