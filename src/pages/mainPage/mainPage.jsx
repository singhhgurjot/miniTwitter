import React from 'react'
import "./mainPage.css"
import MainNav from "../../components/mainPageNav/mainPageNav"
import MainPageCenter from "../../components/mainPageCenter/mainPageCenter"
import MainPageRight from "../../components/mainPageRight/mainPageRight"
export default function mainPage() {
  return (
    <div className='min-h-screen min-v-screen bg flex justify-between'>
       
      <MainNav/>
        <MainPageCenter/>
        <MainPageRight/>
    </div>
  )
}
