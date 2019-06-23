import { ADD_DECK  } from '../actions/types';


export default function saveDeckId (state = {}, action) {
    switch(action.type){
        case ADD_DECK :
            const { deck } = action; 
            return {
                ...state,
                saveDeckId: deck.id
            }
        default :
            return state;
    }
}