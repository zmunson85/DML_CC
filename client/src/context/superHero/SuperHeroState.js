import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import SuperHeroContext from './superHeroContext';
import superHeroReducer from './superHeroReducer';
import {
    GET_SUPERHEROS,
    ADD_SUPERHERO,
    DELETE_SUPERHERO,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_SUPERHERO,
    FILTER_SUPERHEROS,
    CLEAR_SUPERHEROS,
    CLEAR_FILTER,
    SUPERHERO_ERROR
} from '../types';

// Create a custom hook to use the superHero context

export const useSuperHeros = () => {
    const { state, dispatch } = useContext(SuperHeroContext);
    return [state, dispatch];
};

// Action creators
// NOTE: These could be moved to a separate file like in redux but they remain here for ease of students transitioning

// Get SuperHeros
export const getSuperHeros = async (dispatch) => {
    try {
        const res = await axios.get('/api/superHeros');

        dispatch({
            type: GET_SUPERHEROS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SUPERHERO_ERROR,
            payload: err.response.msg
        });
    }
};

// Add SuperHero
export const addSuperHero = async (dispatch, superHero) => {
    try {
        const res = await axios.post('/api/superHeros', superHero);

        dispatch({
            type: ADD_SUPERHERO,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SUPERHERO_ERROR,
            payload: err.response.msg
        });
    }
};

// Delete SuperHero
export const deleteSuperHero = async (dispatch, id) => {
    try {
        await axios.delete(`/api/superHeros/${id}`);

        dispatch({
            type: DELETE_SUPERHERO,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: SUPERHERO_ERROR,
            payload: err.response.msg
        });
    }
};

// Update SuperHero
export const updateSuperHero = async (dispatch, superHero) => {
    try {
        const res = await axios.put(`/api/superHeros/${superHero._id}`, superHero);

        dispatch({
            type: UPDATE_SUPERHERO,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SUPERHERO_ERROR,
            payload: err.response.msg
        });
    }
};

// Clear SuperHeros
export const clearSuperHeros = (dispatch) => {
    dispatch({ type: CLEAR_SUPERHEROS });
};

// Set Current SuperHero
export const setCurrent = (dispatch, superHero) => {
    dispatch({ type: SET_CURRENT, payload: superHero });
};

// Clear Current SuperHero
export const clearCurrent = (dispatch) => {
    dispatch({ type: CLEAR_CURRENT });
};

// Filter SuperHeros
export const filterSuperHeros = (dispatch, text) => {
    dispatch({ type: FILTER_SUPERHEROS, payload: text });
};

// Clear Filter
export const clearFilter = (dispatch) => {
    dispatch({ type: CLEAR_FILTER });
};

const SuperHeroState = (props) => {
    const initialState = {
        superHeros: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(superHeroReducer, initialState);

    return (
        <SuperHeroContext.Provider value={{ state: state, dispatch }}>
            {props.children}
        </SuperHeroContext.Provider>
    );
};

export default SuperHeroState;