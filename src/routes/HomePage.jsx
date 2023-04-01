import React from 'react'
import HomePageBackground from '../components/HomePageBackground'
import { useTheme } from "styled-components";


export default function HomePage() {
  const theme = useTheme();
  return (
    <div className='homepageWrapper' style={{backgroundColor: theme.body}}>
      <HomePageBackground list={'hot'} title={'由知識與科技帶動的多元化生活'}/>
    </div>
  )
}