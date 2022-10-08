import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { setTheme } from '../../store/mainSlice'

import Gender from './components/Gender'
import Age from './components/Age'
import Modal from '../../components/modal/Modal'

import cl from './Start.module.scss'

type StartProps = {
    socket: WebSocket | undefined,
    connectToWs: () => void
}

const Start: React.FC <StartProps> = ({ socket, connectToWs }) => {
    const dispatch = useAppDispatch ()
    const { gender, age, loader, theme } = useSelector ((state: RootState) => state.main)
    const { showThemeSelection } = theme
    
    const colorThemeHandler = (themeObj: {value: string, name: string}) => {
        if (themeObj.value === theme.selected.value) return
        dispatch (setTheme (themeObj))
    }

    const connect = () => {
        if (gender.userGender === '' || 
            gender.opponentGender === '' || 
            age.userAge === '' || 
            age.opponentAge.length === 0) return
        connectToWs ()
    }

    return (
        <div className={cl.root}>
            <header className={cl.root__header}>
                ANON.Chat
            </header>

            <div className={cl.root__settings}>
                <Gender />
                <Age />

                <div className={showThemeSelection 
                    ? cl.root__settings_colorTheme 
                    : cl.root__noVisible}
                    >
                    <h3>Цветовая схема:</h3>
                    <div className={cl.root__settings_colorTheme_wrapper}>
                        {theme.values.map (item => 
                            <button 
                                key={item.value}
                                className={item.value === theme.selected.value
                                    ? [cl.root__settingsItem, cl.root__settingsItem_active].join (' ')
                                    : cl.root__settingsItem}
                                onClick={() => colorThemeHandler (item)}
                            >{item.name}</button>)}
                    </div>
                </div>
            </div>

            <button 
                className={cl.root__startBtn} 
                onClick={connect}
            >Начать общение</button>

            {loader.visible && <Modal socket={socket} />}
        </div>
    )
}

export default Start