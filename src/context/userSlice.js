import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogged: false,
    user: {},
};

export const userlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveData: (state, action) => {
            const { userData } = action.payload;
            state.user = userData; // Corrected this line
            console.log('Usuario guardado: ', action.payload);
        },
        loggin: (state) => {
            state.isLogged = true;
        },
        logout: (state) => {
            state.isLogged = false;
            state.user = {};
        },
    },
});


// Export the actions
export const { loggin, logout, saveData } = userlice.actions;

// Export the reducer
export default userlice.reducer;
