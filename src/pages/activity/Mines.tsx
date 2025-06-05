import { message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthApp } from 'store/useAuthApp'
import requestService from 'api/request'
import { useGlobalAppStore } from 'store/useGlobalApp'
import clsx from 'clsx'
import RandomReward from './components/RandomReward'
import hom_adve from 'assets/images/home_advertising_tips_icon.png'
import box from 'assets/images/guess_btn_bg.png'
const Treasure = () => {

  const { t, i18n } = useTranslation()
  const { handleCallbackUser, configApp, handleLoading } = useGlobalAppStore()
  const { user, onSetUser } = useAuthApp()
  const [openInfo, setOpenInfo] = useState(false)
  const [itemWinner, setItemWinner] = useState<any>(null)
  const [openModalReward, setOpenModaReward] = useState(false)
  const [isClick, setIsClick] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [openModaTicker, setOpenModalTicker] = useState(false)

  const rewardItems = [
    { id: 1, img: "/icons/diamond-icon.svg", label: "$0.1", reward: "0.1" },
    { id: 2, img: "/icons/diamond-icon.svg", label: "$0.15", reward: "0.15" },
    { id: 3, img: "/icons/diamond-icon.svg", label: "$0.2", reward: "0.2" },
    { id: 4, img: "/icons/diamond-3.svg", label: "$0.5", reward: "0.5" },
    { id: 5, img: "/icons/diamond-3.svg", reward: "x1_duck", label: "+1" },
    { id: 6, img: "/icons/diamond-5.svg", reward: "x2_duck", label: "+2" },
    { id: 7, img: "/icons/diamond-5.svg", reward: "x5_duck", label: "+5" },
    { id: 8, img: "/icons/diamond-6.svg", reward: "Lucky_Clover" },
    { id: 9, img: "/icons/diamond-7.svg", reward: "Lucky_Clover" },

  ];
  const randomRewardBox = () => {
    // Chọn một ID ngẫu nhiên trong phạm vi từ 0 đến 9
    let randomIndex = Math.floor(Math.random() * 10); // ID từ 0 đến 9
    return randomIndex;
  };


  const handleMine = async (index: number) => {

    setIsClick(true)
    if (isClick) return
    try {
      const res = await requestService.post('/checkin/mine')
      if (res && res.data && user) {
        onSetUser({
          ...user,
          realBalance: user?.realBalance - 0.2
        })
        const resultReward = res.data.data;
        const targetIndex = rewardItems.findIndex((item) => item.reward === resultReward);
        if (targetIndex === -1) throw new Error("Reward not found");
        setActiveIndex(index)
        setItemWinner(rewardItems[targetIndex])
        handleCallbackUser()
        // setTimeout(() => {
        //     setOpenItemWin(true)
        // }, 1000);
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message)
      setIsClick(false)
    }


  }

  useEffect(() => {
    // Nếu itemWinner có giá trị, bắt đầu setTimeout
    if (itemWinner) {
      const timeoutId = setTimeout(() => {
        setItemWinner(null);  // Đặt lại itemWinner sau 5 giây
        setIsClick(false);    // Đặt lại trạng thái isClick
      }, 4000);

      // Dọn dẹp (cleanup) khi itemWinner thay đổi hoặc component unmount
      return () => clearTimeout(timeoutId);
    }
  }, [itemWinner]);  // Chạy lại khi itemWinner thay đổi



  return (
    <div className='  '>
      <div className="game--card relative z-10 p-[3rem]">
        <div className='mb-2 flex justify-between items-center'>
          <div>
            Lượt quay : <span>{user?.mineNum || 0}</span>
          </div>
          <div>
            <img src={hom_adve} width={20} className='object-cover cursor-pointer' />
          </div>
        </div>
        <div className="mine-box-wrapper" >
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="mine-box mineBox gold-box " id={`mine${index + 1}`}
              onClick={() => {
                // return message.warning("Open on Monday")
                handleMine(index)
              }}
            >
              {
                index === activeIndex && itemWinner ?
                  <div className="mine-box-wrapper" key={index}>
                    <div className={clsx("mine-box-front", {
                      "border-[.3rem] border-yellow-500": index === activeIndex
                    })}>
                      <img
                        src={itemWinner?.img}
                        alt="image"
                        className='animation-bounceCard !w-[6rem] !h-[6rem]'

                      />
                      {
                        itemWinner?.label &&
                        <div className='text-[3.5rem] text-[#fff] font-[700]'>
                          {itemWinner?.label}
                        </div>
                      }
                    </div>
                    <div className="mine-box-hidden" />
                  </div>
                  :
                  itemWinner ?

                    <RandomReward key={index} />
                    :
                    <div className="mine-box-wrapper" key={index}>
                      <div className="mine-box-front">
                        <img
                          src={box}
                          alt="image"
                          className='animation-bounceCard'
                        />
                      </div>
                      <div className="mine-box-hidden" />
                    </div>
              }

            </div>
          ))}
        </div>


      </div>
    </div>
  )
}

export default Treasure