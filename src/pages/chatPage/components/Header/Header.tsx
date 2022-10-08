import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch } from '../../../../store'
import { setGender, setAge } from '../../../../store/mainSlice'

import closeIcon from '../../../../assets/close.png'
import attentionIcon from '../../../../assets/attention.png'
import settingsIcon from '../../../../assets/settings.png'
import cl from './Header.module.scss'


type HeaderProps = {
    socket: WebSocket | undefined
}

const Header: React.FC <HeaderProps> = ({socket}) => {
    const navigate = useNavigate ()
    const dispatch = useAppDispatch ()

    const closeChat = () => {
        if (socket) socket.send (JSON.stringify ({event: 'disconnect'}))
        dispatch (setGender ({userGender: '', opponentGender: ''}))
        dispatch (setAge ({userAge: '', opponentAge: []}))
    }

    return (
        <header className={cl.root}>
            <div
                className={cl.root_icon}
                onClick={closeChat}>
                <img src={closeIcon} alt="Закрыть" />
            </div>

            <div className={cl.root_title}>
                ANON.Chat
            </div>

            <div className={cl.root_wrapperIcons}>
                <Link to="/rules" style={{textDecoration: 'none'}}>
                    <div className={cl.root_icon} data-title="Правила чата">
                        <img src={attentionIcon} alt="Правила" />
                    </div>
                </Link>

                <Link to="/settings" style={{textDecoration: 'none'}}>
                    <div className={cl.root_icon} data-title="Настройки">
                        <img src={settingsIcon} alt="Настройки" />
                    </div>
                </Link>
            </div>
        </header>
    )
}

export default Header