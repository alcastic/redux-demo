const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const actions = {
    FETCH_USERS_LOADING: 'FETCH_USERS_LOADING',
    FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
    FETCH_USERS_FAILURE: 'FETCH_USERS_FAILURE',
}

const fetchUsersLoading = () => {
    return {
        type: actions.FETCH_USERS_LOADING,
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: actions.FETCH_USERS_SUCCESS,
        payload: users,
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: actions.FETCH_USERS_FAILURE,
        payload: error,
    }
}

const initialState = {
    loading: false,
    users: [],
    error: '',
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_USERS_LOADING:
            return {
                ... state,
                loading: true,
            }
        case actions.FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: '',
            }
        case actions.FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }
        default: return state
    }
}

const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchUsersLoading())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            users = response.data.map(user => user.id)
            dispatch(fetchUsersSuccess(users))
        }).catch(error => {
            dispatch(fetchUsersFailure(error))
        })
    }
}


const store = createStore(usersReducer, applyMiddleware(thunkMiddleware))

store.dispatch(fetchUsers())

store.subscribe(() => console.log(store.getState()))
