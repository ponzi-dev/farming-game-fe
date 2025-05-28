import React from 'react'
import bg_farm from 'assets/img_custom/home_image_bg.9.png'

import Marquee from 'react-fast-marquee'
import { useGlobalAppStore } from 'store/useGlobalApp'
import { useTranslation } from 'react-i18next'
import HomFarm from './components/HomeFarm'
const Home = () => {
    const { i18n } = useTranslation();
    const { configApp } = useGlobalAppStore()

    const marqueeText = () => {
        const data = configApp?.HOME_NOTIFICATION && JSON.parse(configApp?.HOME_NOTIFICATION)
        if (i18n?.language === 'vi') return data?.vi
        if (i18n?.language === 'zh') return data?.zh
        return data?.en
    }

    return (
        <>
    
            <div style={{
                background: `url(${bg_farm})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: "cover"
            }} className='w-full h-screen relative'>
                <div className='absolute max-w-[400px] w-full left-1/2 top-1/2 translate-x-[-50%]  translate-y-[-50%]'>
                    <div className="w-full max-w-[400px] mx-auto aspect-square relative overflow-visible">
                       <HomFarm/>
                    </div>


                </div>
            </div>
        </>

    )
}

export default Home