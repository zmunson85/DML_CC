import {
    GET_SUPERHEROS,
    ADD_SUPERHERO,
    DELETE_SUPERHERO,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_SUPERHERO,
    FILTER_SUPERHEROS,
    CLEAR_FILTER,
    SUPERHERO_ERROR,
    CLEAR_SUPERHEROS
} from '../types';

const superHeroReducer = (state, action) => {
    switch (action.type) {
        case GET_SUPERHEROS:
            return {
                ...state,
                superHeros: action.payload
            };
        case ADD_SUPERHERO:
            return {
                ...state,
                superHeros: [action.payload, ...state.superHeros]
            };
        case UPDATE_SUPERHERO:
            return {
                ...state,
                superHeros: state.superHeros.map((superHero) =>
                    superHero._id === action.payload._id ? action.payload : superHero
                )
            };
        case DELETE_SUPERHERO:
            return {
                ...state,
                superHeros: state.superHeros.filter(
                    (superHero) => superHero._id !== action.payload
                )
            };
        case CLEAR_SUPERHEROS:
            return {
                ...state,
                superHeros: null,
                filtered: null,
                error: null,
                current: null
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_SUPERHEROS:
            return {
                ...state,
                filtered: state.superHeros.filter(({ name, homeTown }) => {
                    const testString = `${name}${homeTown}`.toLowerCase();
                    return testString.includes(action.payload.toLowerCase());
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case SUPERHERO_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            throw new Error(`Unsupported type of: ${action.type}`);
    }
};

export default superHeroReducer;