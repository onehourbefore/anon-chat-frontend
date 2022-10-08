import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import main from './mainSlice'
import upload from './uploadSlice'


export const store = configureStore ({
    reducer: { main, upload },
    middleware: getDefaultMiddleware => getDefaultMiddleware (),
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType <typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
