import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { HTTP_HOST } from "../api/api"

interface IUploadState {
    uploadedFiles: [] | any [],
    status: 'idle' | 'loading' | 'success' | 'error'
}

const initialState: IUploadState = {
    uploadedFiles: [],
    status: 'idle'
}

export const uploadFile = createAsyncThunk ('uploadFile', async (filesData: {files: Blob [], roomID: string, messID: string}) => {
    const { files, roomID, messID } = filesData
    const formData = new FormData ()
    formData.append ('dirName', roomID)
    formData.append ('messID', messID)
    for (let i = 0; i < files.length; i++) {
        formData.append ('uploadedFiles', files [i])
    }
    const { data } = await axios.post (`${HTTP_HOST}/upload`, formData)
    return data
})

export const uploadSlice = createSlice ({
    name: 'upload',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase (uploadFile.pending, state => {
            state.status = 'loading'
        })
        .addCase (uploadFile.fulfilled, (state, action: PayloadAction <{messID: string, messFiles: {name: string, path: string, file: string} []} []>) => {
            state.uploadedFiles = action.payload
            state.status = 'success'
        })
        .addCase (uploadFile.rejected, state => {
            state.status = 'error'
        })
        .addDefaultCase (() => {})
    }
})

const { actions, reducer } = uploadSlice
export default reducer