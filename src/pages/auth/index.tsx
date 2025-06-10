import clsx from 'clsx'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import { useTranslation } from 'react-i18next'
import { DrawerLang } from 'components/ui/DrawerLang'

const Auth = () => {
  const { pathname, } = useLocation()
  const { t, i18n } = useTranslation()
  const [openLang, setOpenLang] = useState(false)
  return (
    <>

      <div data-v-daf86cc3="" className="auth-page relative">
        <div className='absolute right-2 top-1 w-[8rem] h-[8rem] flex justify-center items-center rounded-full '
          onClick={() => setOpenLang(true)}
        >
          <DrawerLang
            openLang={openLang}
            setOpenLang={setOpenLang}
            showLangSelected
          />
        </div>

        <div data-v-daf86cc3="" className="auth-container">
          {/* <div data-v-daf86cc3="" className="auth-tabs ">
            <div data-v-daf86cc3="" className={clsx("tab", {
              "active": pathname === '/login'
            })}>
              <Link to='/login' >
                {t("auth.login")}
              </Link>
            </div>
            <div data-v-daf86cc3="" className={clsx("tab", {
              "active": pathname === '/register'
            })}>
              <Link to='/register'>
                {t("auth.regis")}
              </Link>
            </div>
          </div> */}
          {
            pathname === '/register' &&
            <Register />
          }
          {
            pathname === '/login' &&
            <Login />

          }

        </div>
      </div>
    </>


  )
}

export default Auth