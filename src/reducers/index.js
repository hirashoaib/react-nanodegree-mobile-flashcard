import { combineReducers } from 'redux';
import decks from './deckReducer';
import saveDeckId from './saveDeckIdReducer';

export default combineReducers({
    decks,
    saveDeckId
});