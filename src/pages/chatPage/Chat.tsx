import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/index'

import Modal from '../../components/modal/Modal'
import Header from './components/Header/Header'
import MessagesArea from './components/MessagesArea/MessagesArea'
import InputArea from './components/InputArea/InputArea'

import cl from './Chat.module.scss'


type ChatProps = {
    socket: WebSocket | undefined
}

const Chat: React.FC <ChatProps> = ({ socket }) => {
    const { loader } = useSelector ((state: RootState) => state.main)
    
    return (
        <div className={cl.root}>
            <Header socket={socket} />
            <MessagesArea />
            <InputArea socket={socket} />
            {loader.visible && <Modal />}
        </div>
    )
}

export default Chat