import { 
    RECEIVE_DECKS,
    ADD_DECK, 
    ADD_CARD
} from '../actions/types';

export default function decks (state = {}, action) {
    switch(action.type){
        case RECEIVE_DECKS : 
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK :
            const { deck } = action; 
            return {
                ...state,
                [deck.id] : deck,
            }
        case ADD_CARD :
            const { id, card } = action; 
            return {
                ...state,
                [id] : {
                    ...state[id],
                    questions: state[id].questions.concat([card])
                }
            }
        default :
            return state;
    }
}