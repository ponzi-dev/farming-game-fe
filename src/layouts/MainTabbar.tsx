

import botany1 from 'assets/img_custom/public_botany_1.png'
import botany2 from 'assets/img_custom/public_botany_2.png'
import botany3 from 'assets/img_custom/public_botany_3.png'
import botany4 from 'assets/img_custom/public_botany_4.png'
import botany5 from 'assets/img_custom/public_botany_9.png'
import hom_adve from 'assets/images/home_advertising_tips_icon.png'


const TabBar = () => {


  return (
    <div className="border-box  z-[999] bg-[#c28569]  fixed bottom-[10px] left-1/2 translate-x-[-50%] max-w-[350px]  w-full">
      <div className="border-box flex justify-between items-center relative">

        <div className="absolute right-[-15px] top-[-15px] cursor-pointer">
          <img src={hom_adve} width={25} className='object-cover' />
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <img src={botany5} width={50} />
          <div className="flex gap-2 items-center font-[500] text-[15px] text-[#fff]">5<img src={"https://s2.coinmarketcap.com/static/cloud/img/loyalty-program/diamond-icon.svg"} width={20} /></div>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <img src={botany1} width={50} />
          <div className="flex gap-2 items-center font-[500] text-[15px] text-[#fff]">20<img src={"https://s2.coinmarketcap.com/static/cloud/img/loyalty-program/diamond-icon.svg"} width={20} /></div>
        </div>
        <div className="relative flex flex-col items-center justify-center">
          <img src={botany2} width={50} />
          <div className="flex gap-2 items-center font-[500] text-[15px] text-[#fff]">50<img src={"https://s2.coinmarketcap.com/static/cloud/img/loyalty-program/diamond-icon.svg"} width={20} /></div>
        </div>
        <div className="relative flex flex-col items-center justify-center">
          <img src={botany3} width={50} />
          <div className="flex gap-2 items-center font-[500] text-[15px] text-[#fff]">100<img src={"https://s2.coinmarketcap.com/static/cloud/img/loyalty-program/diamond-icon.svg"} width={20} /></div>
        </div>
        <div className="relative flex flex-col items-center justify-center">
          <img src={botany4} width={50} />
          <div className="flex gap-2 items-center font-[500] text-[15px] text-[#fff]">500<img src={"https://s2.coinmarketcap.com/static/cloud/img/loyalty-program/diamond-icon.svg"} width={20} /></div>
        </div>
      </div>
    </div>
  );
};

export default TabBar;
