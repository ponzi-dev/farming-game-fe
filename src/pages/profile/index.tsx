import requestService from 'api/request'
import { AddPaymentMethod } from 'components/ui/AddPaymentMethod'
import { DrawerLang } from 'components/ui/DrawerLang'
import TeamInvite from 'components/ui/home/TeamInvite'
import InviteFriend from 'components/ui/InviteFriend'
import RecordUserHistoires from 'components/ui/RecordUserHistory'
import SecurityCenter from 'components/ui/SecurityCenter'
import { formatNumber, hidePhoneNumber, removeLocalStoreageUser } from 'lib/helpers'
import React, { useState } from 'react'
import avt_default from 'assets/img_custom/public_botany_2.png'
import icon_agency from "assets/img_custom/color_wd_invite_icon.png"
import icon_history from 'assets/img_custom/color_achievement_icon_4.png'
import icon_analys from 'assets/img_custom/color_wd_success_pop_money1.png'
import { useTranslation } from 'react-i18next'
import bg_btn_withdraw from 'assets/img_custom/me_tx_bg.9.png'
import { useAuthApp } from 'store/useAuthApp'
import vip_0 from 'assets/images/vip-0.png'
import vip_1 from 'assets/images/vip-1.png'
import vip_2 from 'assets/images/vip-2.png'
import vip_3 from 'assets/images/vip-3.png'
import vip_4 from 'assets/images/vip-4.png'
import vip_5 from 'assets/images/vip-5.png'
import bg_avt from 'assets/img_custom/trialtask_bg_nums.png'
import bg_menu from 'assets/img_custom/skill_boss_family_boss_bg.webp'
import clsx from 'clsx'

import InvestmentStatistics from 'components/ui/InvestmentStatistics'
import { useGlobalAppStore } from 'store/useGlobalApp'
const Profile = () => {
  const { user, logoutUser } = useAuthApp()
  const { handleToggleModal } = useGlobalAppStore()
  const navigate = (val: any) => alert(1)

  const [openAddMethod, setAddMethod] = useState(false)
  const [openInvitefriend, setOpenInviteFriend] = useState(false)
  const [openTeam, setOpenTeam] = useState(false)
  const [openSecurity, setOpenSecurity] = useState(false)
  const [openRecord, setOpenRecord] = useState(false)
  const [openVipReward, setOpenVipReward] = useState(false)
  const [openInvestStatistics, setOpenInvestStatistics] = useState(false)

  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    try {
      const res = await requestService.delete('/profile')
      if (res && res.data) {
        logoutUser()
        removeLocalStoreageUser()
        navigate('/login')

      }
    } catch (error) {
      console.log(error);

    }
  }

  const renderVip = () => {
    switch (user?.farmVip) {
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



  return (
    <div data-v-4f0a6390="" data-v-e697ea1f="" className="profile-page bg-no-repeat " >
      <div data-v-4f0a6390="" className="user-info">
        <div data-v-4f0a6390="" className="user-header">
          <div data-v-4f0a6390="" className="avatar-wrapper">
            <div
              data-v-4f0a6390=""
              className="van-image van-image--round "
              style={{ width: 70, height: 70, borderRadius: "50%" }}
            >
              <div className='relative w-full h-full '>
                <img src={bg_avt} alt='logo' className='rounded-full w-full h-full  z-50 object-cover' />
                <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
                  <img src={avt_default} alt='logo' className='rounded-full w-full h-full z-10' />
                </div>
              </div>
              {/**/}
              {/**/}
            </div>
            <div data-v-4f0a6390="" className="vip-badge min-w-[72px]">
              <span data-v-4f0a6390="" className="vip-icon flex items-center gap-1">
                VIP <img src={renderVip()} className={clsx('size-[20px]', {
                  'size-[35px]': user && user?.farmVip > 0
                })} />
              </span>
            </div>
          </div>
          <div data-v-4f0a6390="" className="user-detail">
            <div data-v-4f0a6390="" className="nickname">
              {user && hidePhoneNumber(user?.phone + "")}
            </div>
            <div data-v-4f0a6390="" className="user-id">
              ID: {user?.userId}
            </div>
          </div>
          <div data-v-4f0a6390="" className="balance items-end  flex flex-col  gap-1 !font-[900]" style={{ background: "transparent" }}>
            <div className='relative mb-[-5px]' onClick={() => handleToggleModal({
              name: "withdraw",
              type: "drawer",

            })}>
              <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
                <p className='text-[11px] font-[700] text-[#fff] mb-[2px] cursor-pointer'>Rút</p>
              </div>
              <img src={bg_btn_withdraw} width={50} />
            </div>
            <div className='flex items-center justify-end '>
              <span className='font-[900]'>
                {Number(user?.realBalance?.toFixed(3))}
              </span>

              <img src={"/icons/diamond-icon.svg"} alt='' className='size-[30px] ml-2' />

            </div>

          </div>

        </div>

      </div>

      <div data-v-4f0a6390="" className="invite-card" onClick={() => setOpenInviteFriend(true)}>
        <div data-v-4f0a6390="" className="invite-content">
          <div data-v-4f0a6390="" className="invite-text ">
            <div data-v-4f0a6390="" className="title !text-[20px] !font-[900]">
              {t("Mời bạn bè tham gia")}
            </div>
            <div data-v-4f0a6390="" className="subtitle !text-[13px]">
              {t("Chia sẻ để nhận thêm phần thưởng")}
            </div>
          </div>

        </div>
      </div>

      <div data-v-4f0a6390="" className="action-list">
        <div className='relative h-[350px]'>
          <img src={bg_menu} className='w-full h-full' />
          <div data-v-4f0a6390="" className="action-group !mb-0">

            <div data-v-4f0a6390="" className="action-item" onClick={() => setOpenInvestStatistics(true)}>
              <div data-v-4f0a6390="" className="action-left">

                <img src={icon_analys}
                  className='w-[7rem]'
                />
                <span data-v-4f0a6390="">
                  {t("Thống kê đầu tư")}
                </span>
              </div>
              <i
                data-v-4f0a6390=""
                className="van-badge__wrapper van-icon van-icon-arrow"
              >

              </i>
            </div>


            <div data-v-4f0a6390="" className="action-item" onClick={() => setOpenRecord(true)}>
              <div data-v-4f0a6390="" className="action-left">

                <img src={icon_history}
                  className='w-[7rem]'
                />
                <span data-v-4f0a6390="">
                  {t("Lịch sử giao dịch")}
                </span>
              </div>
              <i
                data-v-4f0a6390=""
                className="van-badge__wrapper van-icon van-icon-arrow"
              >

              </i>
            </div>
            <div data-v-4f0a6390="" className="action-item" onClick={() => setOpenTeam(true)}>
              <div data-v-4f0a6390="" className="action-left">

                <img src={icon_agency}
                  className='w-[7rem]'
                />
                <span data-v-4f0a6390="">
                  {t("Đại lý trang trại")}
                </span>
              </div>
              <i
                data-v-4f0a6390=""
                className="van-badge__wrapper van-icon van-icon-arrow"
              >

              </i>
            </div>
            <div data-v-4f0a6390="" className="action-item" onClick={() => setOpenSecurity(true)}>
              <div data-v-4f0a6390="" className="action-left">

                <img src={"https://img.icons8.com/?size=100&id=xDx0LE8HzRiQ&format=png&color=000000"}
                  className='w-[7rem]'
                />
                <span data-v-4f0a6390="">
                  {t("Cài đặt")}
                </span>
              </div>
              <i
                data-v-4f0a6390=""
                className="van-badge__wrapper van-icon van-icon-arrow"
              >

              </i>
            </div>

            <div data-v-4f0a6390="" className="action-item logout">
              <div data-v-4f0a6390="" className="action-left" onClick={handleLogout}>

                <img src={"https://img.icons8.com/?size=100&id=IwZ4mbmrC5gw&format=png&color=000000"}
                  className='w-[7rem]'
                />
                <span data-v-4f0a6390="">
                  {t("Đăng xuất")}
                </span>
              </div>
              <i
                data-v-4f0a6390=""
                className="van-badge__wrapper van-icon van-icon-arrow"
              >

              </i>
            </div>


          </div>

        </div>


      </div>

      <InviteFriend
        open={openInvitefriend}
        onClose={() => setOpenInviteFriend(false)}
      />
      <InvestmentStatistics
        openInvestStatistics={openInvestStatistics}
        setOpenInvestStatistics={setOpenInvestStatistics}
      />
      <TeamInvite
        open={openTeam}
        setOpen={setOpenTeam}
      />
      <RecordUserHistoires
        open={openRecord}
        setOpen={setOpenRecord}
      />
      <SecurityCenter
        open={openSecurity}
        setOpen={setOpenSecurity}
      />
    </div>

  )
}

export default Profile