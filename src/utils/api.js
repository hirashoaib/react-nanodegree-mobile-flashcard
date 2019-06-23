import {
    _getDecksOnFirstLoad,
    generateUID
} from './_DATA.js';
import { AsyncStorage } from "react-native";
const ASYNC_STORAGE_FLASHCARD_KEY = "ASYNC_STORAGE_FLASHCARD_KEY";

export async function getDecks(){
    try {
        const allDecks = await AsyncStorage.getItem(ASYNC_STORAGE_FLASHCARD_KEY);
        if(allDecks){
            const parshedDecks = JSON.parse(allDecks);
            return parshedDecks;
        }
        else {
            await AsyncStorage.setItem(ASYNC_STORAGE_FLASHCARD_KEY,JSON.stringify(_getDecksOnFirstLoad()));
            const decksObj = await AsyncStorage.getItem(ASYNC_STORAGE_FLASHCARD_KEY);
            return decksObj;
        }
    }
    catch(err){
        await AsyncStorage.setItem(ASYNC_STORAGE_FLASHCARD_KEY,JSON.stringify(_getDecksOnFirstLoad()));
        const decksObj = await AsyncStorage.getItem(ASYNC_STORAGE_FLASHCARD_KEY);
        return decksObj;
    }
}

export async function saveDeckTitle(title){
    const id = generateUID();
    const deck = {
        id: id,
        title: title,
        questions: []
    }
    
    await AsyncStorage.mergeItem(ASYNC_STORAGE_FLASHCARD_KEY, JSON.stringify({[id] : deck}))
    return deck;
}

export async function addCardToDeck(id, cardObj){
    const decks = await AsyncStorage.getItem(ASYNC_STORAGE_FLASHCARD_KEY);
    if(decks){
        const singleDeck = (JSON.parse(decks))[id];
        singleDeck.questions = singleDeck.questions.concat([cardObj]);
        let deckString = JSON.stringify({[id] : singleDeck});
        await AsyncStorage.mergeItem(ASYNC_STORAGE_FLASHCARD_KEY, deckString );
        return cardObj;
    }
}