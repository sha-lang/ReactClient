import React, { useState, useEffect, useRef, Component } from 'react';
import { ACTIONS } from '../../actions';
import socketInit from '../../socket';
import styles from './Chat.module.css';

const Chat = (room, username) => {

  const handlePopstate = () => {
    window.location.reload();
  };

  window.addEventListener('popstate', handlePopstate);
  
  const socket = useRef(null);
  socket.current = socketInit();
  const [currentMsg, setCurrentMsg] = useState("");
  const [messages, setMessages] = useState([])  

  const sendMsg = async () => {
    if (currentMsg !== ""){
      const msgData = {
        room: room.room,
        author: room.username.name,
        msg: currentMsg
      };

      await socket.current.emit(ACTIONS.SEND_MSG, msgData);
      setCurrentMsg("")
    };
  };

  useEffect(()=>{
    socket.current.on(ACTIONS.RECEIVE_MSG, (data) => {
      setMessages((list) => [...list, data]);
      console.log(data)
    })
  }, [true]);

  const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          sendMsg();
          setCurrentMsg("")
        }
      };

  return(
    <>
    <div className={styles.mainWindow}>
      
       <div className={styles.aboveBottom}>
         {messages.map((message, index) => (
          <fieldset key={index} className={styles.msgBox}>
            <legend>{message.author}</legend>
            {message.msg}
          </fieldset>
        ))}
      </div>
      <br />
      <div className={styles.bottom}>
        <input
          type="text"
          placeholder="Type a Message"
          className={styles.msg}
          value={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input type="button" value="SEND" onClick={sendMsg} className={styles.send} />
      </div>
    </div>
    </>
  );
}

export default Chat;