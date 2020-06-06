import React, { useContext, useReducer, createContext } from 'react'
import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer';


const LIST_POSTS = 'LIST_POSTS';
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';

const blogReducer = (state, action) => {
    switch (action.type) {
        case LIST_POSTS:
            return action.payload;
        case ADD_POST:
            return [...state,
            {
                id: Math.floor(Math.random() * 99999),
                title: action.payload.title,
                content: action.payload.content
            }
            ];
        case EDIT_POST:
            return state.map(post => post.id === action.payload.id ? action.payload : post);
        case DELETE_POST:
            return state.filter(item => item.id != action.payload)
        default:
            return state;
    }
};

const listPosts = (dispatch) => async () => {
    const result = await jsonServer.get('/blogposts');

    dispatch({ type: LIST_POSTS, payload: result.data });
}

const addPost = (dispatch) => async (newPost, callback) => {
    await jsonServer.post('/blogposts', newPost);

    // dispatch({ type: ADD_POST, payload: newPost }); old way, without jsonServer
    callback();
}

const editPost = (dispatch) => async (editPost, callback) => {
    const result = await jsonServer.put(`/blogposts/${editPost.id}`, editPost);

    dispatch({ type: EDIT_POST, payload: editPost });
    callback();
}

const deletePost = (dispatch) => async (id) => {
    const result = await jsonServer.delete(`/blogposts/${id}`);

    dispatch({ type: DELETE_POST, payload: id });
}

export const { Context, Provider } = createDataContext(blogReducer, { listPosts, addPost, editPost, deletePost }, []);