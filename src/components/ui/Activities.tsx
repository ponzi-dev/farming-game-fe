import ButtonImage from 'components/elements/ButtonCustom';
import bg_btn from 'assets/img_custom/home_withdraw_btn_bg_img.png'
import ListModal, { ListItem } from 'components/elements/ListModal';
import j120 from 'assets/images/j120.webp'
import luckydraw from 'assets/images/interactiveadvertising_task4.png'
import activity1 from 'assets/images/call.png'
import { useTranslation } from 'react-i18next';
import { useGlobalAppStore } from 'store/useGlobalApp';
const Activities = () => {
  const { t } = useTranslation()
  const { handleToggleModal } = useGlobalAppStore()
  return (
    <div className="relative rounded-md p-2.5">
      <ListModal>
        <ListItem>
          <div
            className="w-[50px] h-[50px] mr-2.5 bg-center bg-no-repeat bg-cover flex justify-center items-center"
            style={{ backgroundImage: `url(${''})` }}
          >
            <img src={j120} alt="loteryIcon" className="object-cover" />
          </div>
          <div className="flex-1 text-[#ffff] text-[12px] text-left  font-bold max-w-[150px]">
            {t("Hộp may mắn")}
          </div>
          <ButtonImage
            title="Tham gia"
            bgImg={bg_btn}
            width={80}
            height={30}
            onEvent={() => {
              handleToggleModal({
                name: "lucky_box",
                type: "modal",
                title: "Lucky Box"
              })
            }}
          />
        </ListItem>
        <ListItem>
          <div
            className="w-[50px] h-[50px] mr-2.5 bg-center bg-no-repeat bg-cover flex justify-center items-center"
            style={{ backgroundImage: `url(${''})` }}
          >
            <img src={luckydraw} alt="loteryIcon" className="object-cover" />
          </div>
          <div className="flex-1 text-[#ffff] text-[12px] text-left  font-bold max-w-[150px]">
            {t("Vòng xoay may mắn")}
          </div>
          <ButtonImage
            title="Tham gia"
            bgImg={bg_btn}
            width={80}
            height={30}
            onEvent={() => {
              handleToggleModal({
                name: "lucky_draw",
                type: "modal",
                title: "Lucky Draw"
              })
            }}
          />
        </ListItem>
        <ListItem>
          <div
            className="w-[50px] h-[50px] mr-2.5 bg-center bg-no-repeat bg-cover flex justify-center items-center"
            style={{ backgroundImage: `url(${''})` }}
          >
            <img src={activity1} alt="loteryIcon" className="object-cover" />
          </div>
          <div className="flex-1 text-[#ffff] text-[12px] text-left  font-bold max-w-[150px]">
            {t("Điểm danh hàng ngày")}
          </div>
          <ButtonImage

            title="Tham gia"
            bgImg={bg_btn}
            width={80}
            height={30}
            onEvent={() => {
              handleToggleModal({
                name: "checkin",
                type: "modal",
                title: "Checkin"
              })
            }}
          />
        </ListItem>


      </ListModal>
    </div>
  )
}

export default Activities