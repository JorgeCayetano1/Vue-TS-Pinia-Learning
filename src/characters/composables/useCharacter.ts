import { ref, computed } from 'vue';
import type { Character, Result } from '@/characters/interfaces/character';
import breakingBadApi from '@/api/breakingBadApis';
import { useQuery } from '@tanstack/vue-query';

const characterSet = ref<{ [id: string] : Character}>({})
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacter = async( id: string ):Promise<Character> => {
    if (  characterSet.value[id] ) return characterSet.value[id];

    try {

        const { data } = await breakingBadApi.get<Result>(`/character/${id}`);
        const response = {
            info: {
                    count: 1,
                    pages: 1,
                    next: '',
                    prev: null,
                },
                results: [data]
        };

        if ( response.results.length > 0 ) return response;

    throw new Error(`No se encontro un personaje con el id ${ id }`);

    } catch (error: any) {
        throw new Error(error);
    }
}

const loadedCharacter = ( character: Character ) => {
    hasError.value = false;
    errorMessage.value = null;

    character.results.forEach( val => {
        characterSet.value[val.id] = character;
    });
}

const loadedWithError = (error: string) => {
    hasError.value = true;
    errorMessage.value = error;
}

const useCharacter = (id: string) => {

    const { isLoading } = useQuery(
        ['character', id],
        () => getCharacter(id),
        {
            onSuccess: loadedCharacter,
            onError: loadedWithError,
        }
    );

    return {
        // Properties
        errorMessage,
        hasError,
        isLoading,
        list: characterSet,

        // Getters
        character: computed<Character | null>( () => characterSet.value[id] ),

        // Methods
    }
}

export default useCharacter