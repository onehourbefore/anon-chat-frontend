
export type GenderType = {
    userGender: string, 
    opponentGender: string
}

export type AgeType = {
    userAge: string, 
    opponentAge: string [] | []
}

export type LoaderType = {
    visible: boolean, 
    status: 'idle' | 'wait' | 'disconnect'
}

export type ThemeType = {
    values: {value: string, name: string} [],
    selected: {value: string, name: string},
    showThemeSelection: boolean
}

export type FontType = {
    values: {value: string, name: string, size: string} [],
    selected: {value: string, name: string, size: string}
}

export type CurrentMessageType = {
    messID: string,
    event: string,
    content: string,
    files: [] | any [],
    time: string,
    userID: string
}

export type MessagesType = {
    status: string,
    chat: [] | CurrentMessageType []
}

export interface IState {
    gender: GenderType,
    age: AgeType,
    loader: LoaderType,
    theme: ThemeType,
    font: FontType,
    roomID: string,
    messages: MessagesType,
    userID: string
}