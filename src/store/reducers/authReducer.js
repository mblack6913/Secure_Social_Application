const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login failed')
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login sucess')
            return {
                ...state,
                authError: null
            }
        case 'LOGOUT_SUCCESS':
            console.log('logout sucess')
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signup sucess')
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error')
            return {
                ...state,
                authError: action.err.message
            }
        case 'CREATE_GROUP_ERROR':
            console.log('Group error');
            return{
                ...state,
                authError: action.err.message
            }
        case 'CREATE_GROUP':
            console.log('Created group');
            return{
                ...state,
                authError: null
            }
        default: 
            return state;
    }
}

export default authReducer