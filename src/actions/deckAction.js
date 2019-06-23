import { 
    RECEIVE_DECKS, 
    ADD_DECK,
    ADD_CARD
} from "./types";
import { 
    getDecks, 
    saveDeckTitle, 
    addCardToDeck  
} from "../utils/api";

export function handleAllDecks(){
    return (dispatch) => {
        return getDecks()
        .then((decks) => {
            dispatch(getAllDecks(decks));
        })
    }
}

export function handleSaveDecks(title){
    return (dispatch) => {
        return saveDeckTitle(title)
        .then((deck) => {
            dispatch(addDeck(deck));
        })
    }
}

export function handleAddCard(id, card){
    return (dispatch) => {
        return addCardToDeck(id, card)
        .then(() => {
            dispatch(addCard(id, card));
        })
    }
}

export function getAllDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addCard (id, card) {
    return {
        type: ADD_CARD,
        id,
        card
    }
}
/*
export function resetNewDeckId () {
    return {
        type: RESET_NEW_DECK_ID
    }
}
*/