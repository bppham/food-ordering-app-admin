"use client"
import React from 'react'
import './home.css'
import Chart from '../components/Chart/Chart'
import FeaturedInfo from '../components/FeaturedInfo/FeaturedInfo'
import WidgetSmall from '../components/WidgetSmall/WidgetSmall'
import WidgetLarge from '../components/WidgetLarge/WidgetLarge'
import{userData} from "../components/dummy-data"
const home = () => {
  return (
    <div className='home'>
        <FeaturedInfo/>
        <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
        <div className="home-widget">
          <WidgetSmall/>
          <WidgetLarge/>
        </div>
    </div>
  ) 
}

export default home
