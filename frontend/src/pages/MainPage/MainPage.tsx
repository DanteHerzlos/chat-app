import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import cl from "./MainPage.module.less";
import ExitBtn from "../../components/UI/ExitBtn/ExitBtn";
import CreateInput from "../../components/UI/CreateInput/CreateInput";
import ChatBtn from "../../components/UI/ChatBtn/ChatBtn";
import { observer } from "mobx-react-lite";
import room from "../../store/room";
import { useNavigate } from "react-router-dom";
import user from "../../store/user";

const MainPage = observer(() => {
  const [roomName, setRoomName] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRooms = async () => {
      await room.getRooms();
    };
    fetchRooms();
  }, []);

  const createHandler = async () => {
    await room.addRoom(roomName)
    setRoomName('')
  };

  const onClickChatBtn = (id: string) =>{
    navigate('/room/' + id)
  }

  const logoutHandler = () => {
    user.logout()
  }

  return (
    <div className={cl.mainPage}>
      <ExitBtn onClick={logoutHandler} className={cl.exitBtn} />
      <div className={cl.menu}>
        <div className={cl.title}>
          <span>Выберете / создайте чат</span>
        </div>
        <Divider />
        <div className={cl.menuContainer}>
          <div className={cl.chatsContainer}>
            {room.rooms.map((r) => (
              <ChatBtn onClick={() => onClickChatBtn(r.id)} Title={r.name} key={r.id} />
            ))}
          </div>
          <CreateInput
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
            onClick={createHandler}
          />
        </div>
      </div>
    </div>
  );
});

export default MainPage;
