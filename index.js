const redux = require('redux')
const createStore = redux.createStore

const cakeActions = {
    BUY_CAKE: 'BUY_CAKE'
}

const buyCake = () => {
    return {
        type: cakeActions.BUY_CAKE
    }
};

const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 50
}

const cakeReducer = (state = initialState, action) => {
    switch(action.type) {
        case cakeActions.BUY_CAKE:
            return {
                ... state,
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state
    }
}

const store = createStore(cakeReducer)

console.log('initial-state =', store.getState())

const unsubscribe = store.subscribe(
    () => console.log('updated-state =', store.getState()))

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

unsubscribe()