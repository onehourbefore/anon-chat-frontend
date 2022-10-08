import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store/index'
import { setLoader, setStatusMessages, setGender, setAge } from '../../store/mainSlice'
import Spinner from '../spinner/Spinner'
import cl from './Modal.module.scss'

type ModalProps = {
    socket?: WebSocket
}

const Modal: React.FC <ModalProps> = ({socket}) => {
    const navigate = useNavigate ()
    const dispatch = useAppDispatch ()
    const { loader, theme, messages } = useSelector ((state: RootState) => state.main)

    const cancelCommunication = () => {
        if (socket) socket.send (JSON.stringify ({event: 'disconnect'}))
    }

    const closeModal = () => {
        dispatch (setStatusMessages ('idle'))
        dispatch (setLoader ({...loader, visible: false, status: 'idle'}))
        navigate ('/')
    }

    React.useEffect (() => {
        return () => {
            dispatch (setGender ({userGender: '', opponentGender: ''}))
            dispatch (setAge ({userAge: '', opponentAge: []}))
        }
    }, [])

    console. log (messages.status)
    
    return (
        <div className={[cl.root, cl.root__active].join (' ')}>
            <div className={cl.root__content}>
                <div 
                    className={cl.root__content_header}
                    style={{background: theme.selected.value === 'light' 
                        ? 'rgb(0, 130, 206)' 
                        : 'rgba(255, 255, 255, 0.1)'}}
                    >
                    <div className={cl.root__content_header_title}>
                        Поиск собеседника
                    </div>
                </div>
                <div className={cl.root__contentWrapper}>
                    {loader.status === 'wait' && 
                        <>
                            <Spinner />
                            <div 
                                className={cl.root__content_cancel} 
                                onClick={cancelCommunication}
                            >Отмена поиска</div>
                        </>}
                    {loader.status === 'disconnect' 
                        && <div className={cl.root__content_disconnect} >
                                <h2 
                                    className={cl.root__content_disconnect_title}
                                    >{messages.status}</h2>
                                <div 
                                    className={cl.root__content_disconnect_backBtn} 
                                    onClick={closeModal}
                                    >На главную</div>
                            </div>}
                </div>
            </div>
        </div>
    )
}

export default Modal