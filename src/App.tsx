import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { RootState, useAppDispatch } from './store/index'
import { WS_HOST} from './api/api'
import { 
  setLoader, 
  setStatusMessages, 
  setChatMessages, 
  setUserID, 
  clearChatMessages, 
  setRoomID 
} from './store/mainSlice'

import Start from './pages/startPage/Start'
import Chat from './pages/chatPage/Chat'
import Rules from './pages/rulesPage/Rules'
import Settings from './pages/settingsPage/Settings'

import cl from './App.module.scss'


const App: React.FC = () => {
  const dispatch = useAppDispatch ()
  const navigate = useNavigate ()
  const { gender, age, loader, theme, font } = useSelector ((state: RootState) => state.main)
  const socket = React.useRef <WebSocket> ()
  
  const connectToWs = () => {
    socket.current = new WebSocket (`${WS_HOST}`)
    socket.current.onopen = () => {
      const message = {
          event: 'connection',
          user: {userID: v4 (), gender, age},
      }
      dispatch (setUserID (message.user.userID))
      if (socket.current) socket.current.send (JSON.stringify (message))
    }

    socket.current.onmessage = (event: any) => {
      const message = JSON.parse (event.data)
      switch (message.status) {
        case 'ready': 
          dispatch (setLoader ({...loader, visible: false, status: 'idle'}))
          dispatch (setChatMessages (message))
          dispatch (setStatusMessages ('idle'))
          dispatch (setRoomID (message.roomID))
          navigate (`/chat`)
          break
        case 'wait':
          dispatch (setLoader ({...loader, visible: true, status: 'wait'}))
          dispatch (setStatusMessages (message.content))
          break
        case 'chating':
          dispatch (setChatMessages (message))
          break
        case 'disconnect':
          dispatch (setLoader ({...loader, visible: true, status: 'disconnect'}))
          dispatch (setStatusMessages ('Соединение разорвано'))
          dispatch (clearChatMessages ())
          break
        default: break
      }
    }

    socket.current.onclose = () => {
      console. log ('Socket disconnect')
    }

    socket.current.onerror = () => {
      console. log ('Socket error')
    }
  }

  React.useEffect (() => {
    document.body.style.fontSize = font.selected.size
  }, [font.selected])

  return (
    <div className={theme.selected.value === "light" 
      ? [cl.app, cl.app__light].join (' ') 
      : [cl.app, cl.app__dark].join (' ')}
    >
      <div className={cl.app__container}>
        <Routes>
          <Route path="/" element={
            <Start socket={socket.current} connectToWs={connectToWs} />
          }/>
          <Route path="/chat" element={
            <Chat socket={socket.current} />
          }/>
          <Route path="/rules" element={<Rules />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
