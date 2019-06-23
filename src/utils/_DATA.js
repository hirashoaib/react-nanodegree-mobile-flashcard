let decks = {
    'n1f1nai3x3ihkvshb7ioj': {
        id:'n1f1nai3x3ihkvshb7ioj',
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    'k2i33shz0udqi6e3tndc5s': {
        id:'k2i33shz0udqi6e3tndc5s',
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
};


export function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getDecksOnFirstLoad(){
    return decks;
}