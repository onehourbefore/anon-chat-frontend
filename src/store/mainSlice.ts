import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IState, GenderType, AgeType, LoaderType, CurrentMessageType } from "../models/models"

const initialState: IState = {
    gender: {
        userGender: '', 
        opponentGender: ''
    },
    age: {
        userAge: '', 
        opponentAge: []
    },
    loader: {
        visible: false, 
        status: 'idle'
    },
    theme: {
        values: [
            {value: 'light', name: 'Светлая'},
            {value: 'dark', name: 'Темная'}
        ],
        selected: {value: 'light', name: 'Светлая'},
        showThemeSelection: true
    },
    font: {
        values: [
            {value: 'small', name: 'Мелкий', size: '10px'},
            {value: 'middle', name: 'Средний', size: '12px'},
            {value: 'big', name: 'Большой', size: '14px'}
        ],
        selected: {value: 'middle', name: 'Средний', size: '12px'}
    },
    roomID: '',
    messages: {
        status: 'idle',
        chat: []
    },
    userID: ''
}

export const mainSlice = createSlice ({
    name: 'main',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction <{value: string, name: string} | null>) => {
            if (action.payload) state.theme.selected = action.payload
        },
        setShowThemeSelection: (state, action: PayloadAction <boolean>) => {
            action.payload 
                ? state.theme.showThemeSelection = true 
                : state.theme.showThemeSelection = false
        },
        setFont: (state, action: PayloadAction <{value: string, name: string, size: string}>) => {
            state.font.selected = action.payload
        },
        setGender: (state, action: PayloadAction <GenderType>) => {
            state.gender = action.payload
        },
        setAge: (state, action: PayloadAction <AgeType>) => {
            state.age = action.payload
        },
        setLoader: (state, action: PayloadAction <LoaderType>) => {
            state.loader = action.payload
        },
        setStatusMessages: (state, action: PayloadAction <string>) => {
            state.messages.status = action.payload
        },
        setRoomID: (state, action: PayloadAction <string>) => {
            state.roomID = action.payload
        },
        setChatMessages: (state, action: PayloadAction <CurrentMessageType>) => {
            state.messages.chat = [...state.messages.chat, action.payload]
        },
        clearChatMessages: (state) => {
            state.messages.chat = []
        },
        setUserID: (state, action: PayloadAction <string>) => {
            state.userID = action.payload
        }
    }
})

const { actions, reducer } = mainSlice
export default reducer
export const { 
    setTheme,
    setShowThemeSelection,
    setFont,
    setGender, 
    setAge, 
    setLoader,
    setRoomID,
    setStatusMessages, 
    setChatMessages,
    setUserID,
    clearChatMessages
} = actions