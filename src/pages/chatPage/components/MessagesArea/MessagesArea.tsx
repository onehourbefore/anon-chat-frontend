import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { getCorrectPath } from '../../../../utils/getCorrectPath'
import { getCorrectTime } from '../../../../utils/getCorrectTime'
import { CurrentMessageType } from '../../../../models/models'
import cl from './MessagesArea.module.scss'


const MessagesArea: React.FC = () => {
    const { userID } = useSelector ((state: RootState) => state.main)
    const { chat } = useSelector ((state: RootState) => state.main.messages)
    const parentRef = React.useRef <HTMLDivElement | null> (null)
    const lastMess = React.useRef <HTMLDivElement | null> (null)

    const startMessage = (mess: CurrentMessageType) => {
        return (
            <div 
                key={mess.content} 
                style={{color: 'white'}}
                className={cl.root_message_start}
            >{mess.content}</div>)}

    const messageWithFiles = (mess: CurrentMessageType, last: boolean) => {
        const [hours, minutes] = getCorrectTime (mess.time)
        return (
            <div 
                ref={last ? lastMess : null}
                key={mess.messID}
                style={{color: 'white'}}
                className={mess.userID === userID
                    ? [cl.root_message, cl.root_message_my].join (' ') 
                    : [cl.root_message, cl.root_message_opponent].join (' ')}
            >
                <div className={cl.root_message_content}>
                    {mess.content}
                    {mess.files.map ((fileObj: any) => {
                        return (
                            <div key={fileObj.name} className={cl.root_message_content_files}>
                            <a href={getCorrectPath (fileObj.path)} target="_blank">{fileObj.name}</a>
                        </div>
                        )
                    })}
                </div>
                <div className={cl.root_message_time}>
                    {hours}:{minutes}
                </div>
            </div>)}

    const message = (mess: CurrentMessageType, last: boolean) => {
        const [hours, minutes] = getCorrectTime (mess.time)
        return (
            <div
                ref={last ? lastMess : null}
                key={mess.messID}
                style={{color: 'white'}}
                className={mess.userID === userID
                    ? [cl.root_message, cl.root_message_my].join (' ') 
                    : [cl.root_message, cl.root_message_opponent].join (' ')}
            >
                <div className={cl.root_message_content}>
                    {mess.content}
                </div>
                <div className={cl.root_message_time}>
                    {hours}:{minutes}
                </div>
            </div>)}
    
    const lastMessage = (mess: CurrentMessageType) => {
        if (mess.files.length !== 0) {
            const messageLast = messageWithFiles  (mess, true)
            return messageLast
        }
        const messageLast = message (mess, true)
        return messageLast
    }

    const scrollIntoView = (elem: HTMLDivElement) => {
        elem.scrollIntoView (false)
        return elem
    }

    React.useEffect (() => {
        if (lastMess.current) {
            scrollIntoView (lastMess.current)
            console. log (lastMess.current)
        }
    }, [lastMess.current])

    return (
        <div className={cl.root}>
            <div ref={parentRef} className={cl.root_wrapper}>
                {chat.map ((mess, i) => {
                    if (i === 0) return startMessage (mess)
                    if (i !== chat.length - 1 && mess.files.length !== 0) return messageWithFiles (mess, false)
                    if (chat.length > 0 && i === chat.length - 1) {
                        console. log ('Выполнение lastMessage')
                        return lastMessage (mess)
                    }
                    return message (mess, false)
                })}
            </div>
        </div>
    )
}

export default MessagesArea