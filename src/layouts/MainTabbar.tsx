
import hom_adve from 'assets/images/home_advertising_tips_icon.png'
import ButtonImage from 'components/elements/ButtonCustom'
import bg_btn from 'assets/img_custom/public_pup_btn_received.png'
import { useStoreFarm } from 'store/useStoreFarm'
import { useState } from 'react';
import { Drawer, notification } from 'antd';
import useBreakpoint from 'hooks/useBreakpoint';
import { useTranslation } from 'react-i18next';
import { useGlobalAppStore } from 'store/useGlobalApp';
import requestService from 'api/request';
import close_icon from 'assets/img_custom/clolor_dialog_close.png'
const TabBar = () => {
  const { dataInvest } = useStoreFarm()
  const breakpoint = useBreakpoint()
  const [openConfirm, setOpenConfirm] = useState<any>(false)
  const [showInfo, setShowInfo] = useState(false)
  const [investSelected, setInvestSelected] = useState<any>(null)
  const { loading, handleLoading, handleCallbackUser } = useGlobalAppStore()
  const { t } = useTranslation()

  const handleBuyTicket = async (ticketId: string) => {
    handleLoading(true)
    try {
      const res = await requestService.post('/tickets', {
        data: {
          ticketId
        }
      })
      if (res && res.data) {
        notification.success({
          message: res.data?.message,
          duration: 3,
          placement: "top"
        })
        handleCallbackUser()
        setOpenConfirm(false)
        setInvestSelected(null)

      }
    } catch (error: any) {
      notification.error({
        message: error?.response?.data?.message,
        duration: 3,
        placement: "top"
      })
      setOpenConfirm(false)
    }
    handleLoading(false)
  }

  return (
    <div className="border-box  z-[999] bg-[#c28569]  fixed bottom-[10px] left-1/2 translate-x-[-50%] max-w-[350px]  w-full">
      <div className="border-box flex justify-between items-center relative">

        <div className="absolute right-[-15px] top-[-15px] cursor-pointer">
          <img src={hom_adve} width={25} className='object-cover' />
        </div>
        {
          dataInvest?.map((i: any, idx: number) => (
            <div className="relative flex flex-col items-center justify-center" key={idx}>
              <img src={i?.urlImage} width={50} />
              <ButtonImage bgImg={bg_btn}
                title={
                  <div className="flex gap-2 items-center font-[500] text-[13px] text-[#000]">
                    {i?.price}
                    <img src={"https://s2.coinmarketcap.com/static/cloud/img/loyalty-program/diamond-icon.svg"} width={13} /></div>
                }
                onEvent={() => {
                  setShowInfo(true)
                  setInvestSelected(i)
                }}
                width={65}
              />
            </div>
          ))
        }
      </div>

      <Drawer

        className='modal-confirm-buy bg_custom_drawer'
        placement={breakpoint === 'mobile' ? 'bottom' : "left"}
        height={"auto"}
        closable={false}
        onClose={() => setOpenConfirm(false)}
        zIndex={9999}
        title={
          <div className='flex justify-between'>
            <div className='text-center font-[900] text-[3.5rem]'>
              {t("Xác nhận")}
            </div>
            <button className='text-yellow-700 underline text-[3rem] font-[500]'
              onClick={() => {
                setOpenConfirm(false)

              }}
            >
              <img src={close_icon} width={30} />
            </button>

          </div>
        }
        open={openConfirm}
      >
        <div className='flex flex-col gap-2 rem-3 my-[20px]'>
          <h3 className='text-center text-[16px] font-[700]'>{t("Bạn xác nhận thuê trang trại này với giá")}
            <span className='text-red-600 '> {investSelected?.price}
              <img src={'/icons/diamond-icon.svg'} width={20} className='inline-block mx-auto ml-1' />
            </span> {t("trong")}
            <span className='text-orange-600'> {investSelected?.earningDay} {t("ngày")}</span>  ?</h3>
        </div>
        <div className='flex w-full items-center justify-between py-4'>

          <button className='btn-rent w-full'
            onClick={() => handleBuyTicket(investSelected)}
            disabled={loading}
          >{t("Xác nhận")}</button>
        </div>
      </Drawer>

      <Drawer

        className='modal-confirm-buy bg_custom_drawer'
        placement={breakpoint === 'mobile' ? 'bottom' : "left"}
        height={"auto"}
        closable={false}
        onClose={() => setShowInfo(false)}
        zIndex={99999}
        title={
          <div className='flex justify-between'>
            <div className='text-center font-[900] text-[3.5rem] flex items-center gap-2'>


              {t("Thông tin trang trại")}
            </div>
            <button className='text-yellow-700 underline text-[3rem] font-[500]'
              onClick={() => setShowInfo(false)}
            >
              <img src={close_icon} width={30} />

            </button>

          </div>
        }
        open={showInfo}
      >
        <div className='flex items-center justify-between mb-[3rem] text-[16px]'>
          <h3>{t("Tên trang trại")}</h3>
          <div className='font-[900]'>
            {investSelected?.name}
          </div>

        </div>
        <div className='flex items-center justify-between mb-[3rem] text-[16px]'>
          <h3>{t("Thời gian thuê")}</h3>
          <div className='font-[900]'>
            {investSelected?.earningDay} {t('home.day')}
          </div>
        </div>
        <div className='flex items-center justify-between mb-[3rem] text-[16px] '>
          <h3>{t("Thu nhập mỗi ngày")}</h3>
          <div className='font-[900] flex items-center gap-2'>
            +{investSelected?.incomePerDay}   <img src={'/icons/diamond-icon.svg'} width={20} />
          </div>

        </div>
        <div className='flex items-center justify-between mb-[3rem] text-[16px] '>
          <h3>{t("Giá thuê")}</h3>
          <div className='font-[900] flex items-center gap-2'>
            {investSelected?.price}   <img src={'/icons/diamond-icon.svg'} width={20} />
          </div>

        </div>
        <div className='flex items-center justify-between mb-[3rem] text-[16px] '>
          <h3>{t("Tổng thu nhập")}</h3>
          <div className='font-[900] flex items-center gap-2'>
            ≈ {investSelected?.incomePerDay * investSelected?.earningDay}   <img src={'/icons/diamond-icon.svg'} width={20} />
          </div>

        </div>


        <div className='mb-[3rem] text-[16px] '>
          <button className='btn-rent w-full' onClick={() => {
            setShowInfo(false)
            setOpenConfirm(true)
          }}>
            {t("Thuê ngay")}
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default TabBar;
