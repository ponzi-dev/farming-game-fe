import React, { useEffect, useState } from 'react'
import botany5 from 'assets/img_custom/public_botany_9.png'
import bg_avt from 'assets/img_custom/tasks_bg_nums.png'
import home_txt from 'assets/img_custom/color_task_active_icon_1.png'
import reward_agency from 'assets/img_custom/color_integral_root_reward_hall_icon.png'
import deposit_fist from 'assets/img_custom/progress_icon_gift.png'
import AgencyReward from 'components/ui/VipReward'
import rank_icon from 'assets/img_custom/mining_bow_arrow_rank.webp'
import close_icon from 'assets/img_custom/game_caravan_icon_dialog_close.webp'
import home_land_unlock from 'assets/img_custom/home_land_bg_seedable.png';
import { Modal } from 'antd'
import { useGlobalAppStore } from 'store/useGlobalApp'
import { useAuthApp } from 'store/useAuthApp'
import chat_icon from 'assets/img_custom/me_icon_4.png'
import { socket } from 'lib/socket'
import { number } from 'framer-motion'
const LeftSidebar = () => {
  const [openVipReward, setOpenVipReward] = useState(false)
  const [openEventFirst, setOpenEventFirst] = useState(false)
  const { handleToggleModal, openModal } = useGlobalAppStore()
  const { user } = useAuthApp()
  const [countUnread, setCountUnRead] = useState(0)

  useEffect(() => {
    const handleUnreadCount = (vl: number) => {
      if (openModal.name === 'chat') return setCountUnRead(0)
      return setCountUnRead(vl);
    };


    if (user) {
      // Gửi request lấy số tin nhắn chưa đọc
      socket.emit("getUnreadCount", { userId: user._id });



      // Lắng nghe sự kiện trả về
      socket.on("unreadCount", handleUnreadCount);

    }


    // Cleanup khi unmount hoặc user thay đổi
    return () => {
      socket.off("unreadCount", handleUnreadCount);
    };
  }, [user, openModal.name]);

  return (
    <>
      {
        user &&
        <div className="fixed z-[999] top-[13%] sm:top-[15%] left-[10px] sm:left-[18%] md:left-[20%] lg:left-[27%] cursor-pointer">
          <div className='flex flex-col gap-2 '>
            {
              user.totalDep === 0 &&
              <div className="relative mb-2" onClick={() => setOpenEventFirst(true)}>
                <div className="absolute top-[px] left-[2px] w-full h-full flex justify-center items-center" >
                  <img src={deposit_fist} width={40} />
                </div>
                <img src={home_txt} width={60} />
              </div>
            }

            <div className="relative mb-2" onClick={() => setOpenVipReward(true)}>
              <div className="absolute top-[1px] left-[0.5px] w-full h-full flex justify-center items-center" >
                <img src={reward_agency} width={35} />
              </div>
              <img src={home_txt} width={60} />
            </div>
            <div className="relative mb-2" onClick={() => handleToggleModal({
              name: "ranking",
              type: "modal",
              title: "Bảng xếp hạng"
            })}>
              <div className="absolute top-[1px] left-[0.5px] w-full h-full flex justify-center items-center" >
                <img src={rank_icon} width={40} />
              </div>
              <img src={home_txt} width={60} />
            </div>
            <div className="relative mb-2" onClick={() => {
              handleToggleModal({
                name: "chat",
                type: "drawer",
                title: "Box Chat"
              })
              setCountUnRead(0)
            }}>
              {countUnread > 0 && (
                <div
                  className="z-40 absolute top-0 right-0 -translate-y-1/2 translate-x-1/2
      bg-red-600 text-white font-bold text-[9px] w-6 h-6 rounded-full
      flex justify-center items-center
      shadow-lg
      animate-bounce
      select-none
      "
                  title={`${countUnread} tin nhắn chưa đọc`}
                >
                  {countUnread > 10 ? "10+" : countUnread}
                </div>
              )}
              <div className="absolute top-[1px] left-[0.5px] w-full h-full flex justify-center items-center" >
                <img src={chat_icon} width={40} />
              </div>
              <img src={home_txt} width={60} />
            </div>
          </div>
        </div>
      }

      <AgencyReward
        open={openVipReward}
        setOpen={setOpenVipReward}
      />
      <Modal
        closeIcon={<img src={close_icon} />}
        onCancel={() => setOpenEventFirst(false)}
        footer={null} width={400} className='reward-fist' open={openEventFirst} centered>
        <div className='absolute left-1/2 top-[23%] translate-x-[-50%]'>
          Sự kiện đầu tiên
        </div>
        <div className='absolute left-1/2 top-[40%] translate-x-[-50%] max-w-[250px] w-full'>

          <div className="flex items-center justify-center flex-col mb-4">
            <img
              src={home_land_unlock}
              alt="Treasure"
              className="size-[40px] mb-2"
            />
            <h2 className="text-[15px] font-bold text-orange-700">🎁 Nạp Lần Đầu 🎉</h2>
          </div>
          <p className="text-center text-black text-[12px]">
            Chỉ cần nạp lần đầu, bạn sẽ được <strong>mở khóa miễn phí 1 chuồng</strong> cho vật nuôi,
            bắt đầu hành trình mới đầy thú vị!
          </p>

          {/* CTA */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                setOpenEventFirst(false)
                handleToggleModal({
                  name: "deposit",
                  type: "drawer",
                  title: "Nạp lần đầu"
                })
              }}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Nạp ngay
            </button>
          </div>
        </div>
      </Modal>
    </>

  )
}

export default LeftSidebar