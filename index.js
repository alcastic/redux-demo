const redux = require('redux')
const createStore = redux.createStore
const combineReducers = redux.combineReducers

const cakeActions = {
    BUY_CAKE: 'BUY_CAKE'
}

const iceCreamActions = {
    BUY_ICECREAM: 'BUY_ICECREAM'
}

const buyCake = () => {
    return {
        type: cakeActions.BUY_CAKE
    }
};

const buyIceCream = () => {
    return {
        type: iceCreamActions.BUY_ICECREAM
    }
}

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 50
}

const cakeReducer = (state = initialCakeState, action) => {
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

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case iceCreamActions.BUY_ICECREAM:
            return {
                ... state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})
const store = createStore(rootReducer)

console.log('initial-state =', store.getState())

const unsubscribe = store.subscribe(
    () => console.log('updated-state =', store.getState()))

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

unsubscribe()