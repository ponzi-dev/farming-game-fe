import { socket } from 'lib/socket';
import React, { useEffect, useRef, useState } from 'react'
import { useAuthApp } from 'store/useAuthApp';
import { useGlobalAppStore } from 'store/useGlobalApp'
import avt_default from 'assets/img_custom/public_botany_2.png'
import avt_default1 from 'assets/img_custom/uikit_emoji_icon_normal.png'
import bg_avt from 'assets/img_custom/trialtask_bg_nums.png'
import vip_0 from 'assets/images/vip-0.png'
import vip_1 from 'assets/images/vip-1.png'
import vip_2 from 'assets/images/vip-2.png'
import vip_3 from 'assets/images/vip-3.png'
import vip_4 from 'assets/images/vip-4.png'
import vip_5 from 'assets/images/vip-5.png'
import clsx from 'clsx';
interface Message {
  _id?: string
  content: string;
  sender: any;
  createdAt?: string | number | Date
}

const BoxChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuthApp();

  const renderVip = (farmVip: number) => {
    switch (farmVip) {
      case 1:
        return vip_1
      case 2:
        return vip_2
      case 3:
        return vip_3
      case 4:
        return vip_4
      case 5:
        return vip_5
      default:
        return vip_0
    }
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);


  useEffect(() => {
    if (user) {
      socket.on("newMessage", (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
      });
      socket.emit("getAllMessage", { userId: user?._id });

      socket.on("loadOldMessages", (msgs: Message[]) => {
        setMessages(msgs);
      });
      socket.emit('getUnreadCount', { userId: user._id })
    }


    return () => {
      socket.off("newMessage");
      socket.off("loadOldMessages");
    };
  }, [user]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!user || !user._id) {
      return;
    }

    const newMsg: Message = {
      content: input.trim(),
      sender: user._id, // chắc chắn có sender
    };

    socket.emit("sendMessage", newMsg);
    setInput("");
  };

  return (
    <section className="msger">

      <main className="msger-chat" ref={chatRef}>
        {messages.map(({ sender, content, createdAt, _id }, idx) => {
          console.log(sender);

          const isYou = sender?.userId === user?.userId;
          if (isYou) return (
            <div className="msg right-msg" key={_id} >
              <div
                className="msg-img"

              >
                <div className='relative'>
                  <img src={bg_avt} alt='logo' className='rounded-full w-[10rem] h-[10rem] z-10' />
                  <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
                    <img src={avt_default} alt='logo' className='rounded-full w-[10rem] h-[10rem] z-10' />
                  </div>
                  {
                    sender?.farmVip > 0 &&
                    <div className='absolute top-[-5px] right-[-5px] z-20'>
                      <span>
                        <img src={renderVip(sender?.farmVip || 0)} className={clsx('size-[15px]', {
                          "!size-[25px]": sender?.farmVip > 0
                        })} />
                      </span>
                    </div>
                  }

                </div>
              </div>
              <div className="msg-bubble">
                <div className="msg-info">
                  <div className="msg-info-name flex items-center gap-2">Bạn


                  </div>
                  <div className="msg-info-time">
                    {new Date(createdAt as Date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="msg-text whitespace-pre-line w-full break-words">
                  {content}
                </div>
              </div>
            </div>
          )
          return (
            <div className="msg left-msg" key={_id} >
              <div className='relative'>
                <img src={bg_avt} alt='logo' className='rounded-full w-[10rem] h-[10rem] z-10' />
                <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
                  <img src={!sender ? avt_default1 : avt_default} alt='logo' className='rounded-full w-[10rem] h-[10rem] z-10' />
                </div>
                {
                  sender?.farmVip > 0 &&
                  <div className='absolute top-[-5px] right-[-5px] z-20'>
                    <span>
                      <img src={renderVip(sender?.farmVip || 0)} className={clsx('size-[15px]', {
                        "!size-[25px]": sender?.farmVip > 0
                      })} />
                    </span>
                  </div>
                }
              </div>
              <div className="msg-bubble">
                <div className="msg-info">
                  <div className="msg-info-name flex items-center gap-1">{
                    !sender ? "ADMIN FARM BOT" :
                      sender?.phone}

                  </div>
                  <div className="msg-info-time">
                    {new Date(createdAt as Date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="msg-text whitespace-pre-line w-full break-words">
                  {content}
                </div>
              </div>
            </div>
          )
        })}
      </main>
      <form className="msger-inputarea" onSubmit={handleSend}>
        <input
          type="text"
          className="msger-input"
          placeholder="Enter your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="msger-send-btn">
          Send
        </button>
      </form>
    </section>

  )
}

export default BoxChat