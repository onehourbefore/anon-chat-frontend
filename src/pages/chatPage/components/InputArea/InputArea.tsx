import React from 'react'
import { useSelector } from 'react-redux'
import { v4 } from 'uuid'
import { RootState, useAppDispatch } from '../../../../store'
import { uploadFile } from '../../../../store/uploadSlice'
import { CurrentMessageType } from '../../../../models/models'
import attachIcon from '../../../../assets/attach.png'
import sendIcon from '../../../../assets/send.png'
import cl from './InputArea.module.scss'


type InputAreaProps = {
    socket: WebSocket | undefined
}

const InputArea: React.FC <InputAreaProps> = ({ socket }) => {
    const dispatch = useAppDispatch ()
    const { userID, roomID } = useSelector ((state: RootState) => state.main)
    const [currentMessage, setCurrentMessage] = React.useState <CurrentMessageType> ({
        messID: v4 (),
        event: 'chating',
        content: '',
        files: [],
        time: '',
        userID
    })
    const [addedFiles, setAddedFiles] = React.useState <Blob [] | []> ([])

    const changeCurrentMessageHandler = (e: React.ChangeEvent <HTMLTextAreaElement>) => {
        setCurrentMessage ({
            ...currentMessage, 
            content: e.target.value,
            time: new Date ().getHours () + ':' + new Date ().getMinutes ()
        })
    }

    const sendMessage = () => {
        if (!currentMessage.content) return
        
        if (addedFiles.length !== 0) {
            dispatch (uploadFile ({
                files: addedFiles, 
                roomID, 
                messID: currentMessage.messID
            }))
        }
        if (socket) socket.send (JSON.stringify (currentMessage))
        setAddedFiles ([])
        setCurrentMessage ({
            messID: v4 (),
            event: 'chating',
            content: '',
            files: [],
            time: '',
            userID
        })
    }

    const addFile = (e: any) => {
        if (addedFiles.length >= 5) return
        setAddedFiles ([...addedFiles, e.target.files [0]])
        setCurrentMessage ({...currentMessage, event: 'chating-with-files'})
    }

    return (
        <div className={cl.root}>
                <textarea 
                    className={cl.root_textarea}
                    placeholder="Введите сообщение..."
                    value={currentMessage.content}
                    onChange={changeCurrentMessageHandler}></textarea>
                <div 
                    className={cl.root_iconDiv} 
                    data-title="Прикрепить файл"
                >
                    <label 
                        htmlFor="uploadFile" 
                        className={cl.root_iconDiv_label}
                    >
                        <img 
                            className={cl.root_iconDiv_icon} 
                            src={attachIcon}
                            alt="Прикрепить файл"
                        />
                    </label>
                    {addedFiles.length !== 0 
                        && <span className={cl.root_iconDiv_count}>
                            {addedFiles.length}
                        </span>}
                    <input 
                        accept="image/jpeg,audio/mp3"
                        className={cl.root_iconDiv_inputFile} 
                        type="file" 
                        id="uploadFile"
                        onChange={addFile} />
                </div>
                <div 
                    data-title="Отправить сообщение"
                    className={cl.root_iconDiv}
                    onClick={sendMessage}>
                    <img 
                        className={cl.root_iconDiv_icon} 
                        src={sendIcon} 
                        alt="Отправить сообщение" 
                    />
                </div>
            </div>
    )
}

export default InputArea