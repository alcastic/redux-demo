const redux = require('redux')
const createStore = redux.createStore

const actions = {
    BUY_CAKE: 'BUY_CAKE'
}

const buyCake = () => {
    return {
        type: actions.BUY_CAKE,
        info: 'first redux action'
    }
};

const initialState = {
    nomOfCakes: 10
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.BUY_CAKE:
            return {
                ... state,
                nomOfCakes: state.nomOfCakes - 1
            }
        default:
            return state
    }
}

const store = createStore(reducer)

console.log('initial-state =', store.getState())

const unsubscribe = store.subscribe(
    () => console.log('updated-state =', store.getState()))

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

unsubscribe()