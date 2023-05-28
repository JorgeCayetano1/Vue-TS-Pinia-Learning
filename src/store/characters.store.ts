import { reactive } from 'vue';
import type { Character } from '../characters/interfaces/character';
import breakingBadApi from '@/api/breakingBadApis';

interface Store {
    character: {
        list: Character;
        count: number;
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },
    ids: {
        list: {
            [id: string]: Character,
        };
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },

    // Metodos de Characters
    startLoadingCharacters: () => void;
    loadedCharacters: ( data: Character ) => void;
    loadCharactersFailed: ( error: string ) => void;

    // Metodos de Characters por IDs
    startLoadingCharacter: ( id: string ) => void;
    checkIdInStore: ( id: string ) => boolean;
    loadedCharacter: ( character: Character ) => void;
}

const characterStore = reactive<Store>({
    character: {
        count: 0,
        errorMessage: null,
        hasError: false,
        isLoading: true,
        list: {
            info: {
                count: 0,
                pages: 0,
                next: '',
                prev: null
            },
            results: []
        }
    },
    
    ids: {
        list: {},
        isLoading: false,
        hasError: false,
        errorMessage: null,
    },

    async startLoadingCharacters() {
        const { data } = await breakingBadApi.get<Character>('/character');
        this.loadedCharacters( data );
    },
    loadedCharacters( data: Character | string) {

        if( typeof data === 'string' ) {
            return this.loadCharactersFailed('La respuesta es un error de petición.');
        }

        const characters = {
            info: data.info,
            results: data.results.filter( character => ![19].includes(character.id) )
        };

        this.character = {
            count: data.results.length,
            errorMessage: null,
            hasError: false,
            isLoading: false,
            list: characters
        }
    },
    loadCharactersFailed( error: string ) {
        this.character = {
            count: 0,
            errorMessage: error,
            hasError: true,
            isLoading: false,
            list: {
                info: {
                    count: 0,
                    pages: 0,
                    next: '',
                    prev: null
                },
                results: []
            }
        }
    },
    startLoadingCharacter() {
        this.ids = {
            ...this.ids,
            isLoading: true,
            hasError: false,
            errorMessage: null,
        }
    },
    checkIdInStore(id: string) {
        return !!this.ids.list[id]; 
    },
    loadedCharacter( character: Character ) {
        this.ids.isLoading = false;
        character.results.forEach(val => {
            this.ids.list[val.id] = character;
        });
    }
});

characterStore.startLoadingCharacters();

export default characterStore;