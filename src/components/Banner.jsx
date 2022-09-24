import React, { useEffect, useState } from 'react'
import { useGetFeedQuery } from '../services/appApi';
import {Link} from 'react-router-dom'
import Loader from './Loader'
import millify from 'millify';
import { Avatar,Typography } from 'antd';
const {Title} = Typography

const Banner = () => {
  const [bannerDetails, setBannerDetails] = useState([])
  const { data, isFetching }  =  useGetFeedQuery()

  
  useEffect(()=>{
    setBannerDetails(data.aweme_list[0])
  },[data.aweme_list[0].aweme_id])

// console.log(bannerDetails)


  if(isFetching) return <Loader />;



  return (
    <div className="banner">
    <header
     className='banner'
     style={{
        backgroundSize : "cover",
        backgroundPosition:"center center",
        backgroundImage : `url("${bannerDetails?.video?.cover?.url_list[0]}")`,
     }}
     >



    <div className="banner__contents">
    
        <h1 className='banner__title'>{bannerDetails?.desc}</h1>

        <h1 className="banner__description">
          {bannerDetails?.author?.nickname}
        </h1>

        <h1 className="downloads">
          <Avatar src={bannerDetails?.music?.avatar_thumb?.url_list[0]} size='large' className="banner_avatar_img" />
          &nbsp;&nbsp;&nbsp;{bannerDetails?.music?.album}
            &nbsp; feat.  &nbsp;{bannerDetails?.music?.author}
        </h1>

        <div className="banner__buttons">
          <Link to={`video/${bannerDetails?.aweme_id}`}><button className='banner__button'>See Details</button></Link>
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </header>

    </div>
  )
}

export default Banner