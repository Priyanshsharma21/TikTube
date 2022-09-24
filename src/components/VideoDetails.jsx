import React, { useEffect, useRef, useState } from 'react'
import { useGetVideoDetailsQuery } from '../services/appApi';
import {Link, useParams} from 'react-router-dom';
import { Avatar, Col, Row, Statistic,Typography,Button } from 'antd';
import millify from 'millify';
import {motion} from 'framer-motion'
import Loader from './Loader';
import "../App.css"
import Ticker from 'react-ticker'
const {Title,Text} = Typography



const VideoDetails = () => {
  const params = useParams();
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
 
  const { data, isFetching }  =  useGetVideoDetailsQuery(params.id)
  const videoDetails = data?.aweme_detail

  const onVideoPress=()=>{
    if(playing){
        videoRef.current.pause()
        setPlaying(false)
    }else{
        videoRef.current.play()
        setPlaying(true)
    }
}


  if(isFetching) return <Loader />;




  return (
    <div>

    <header
        className='banner banner_details'
        style={{
            backgroundSize : "cover",
            backgroundPosition:"center center",
            backgroundImage : `url("${videoDetails?.author?.avatar_larger?.url_list[0]}")`,
        }}
        >
        <div className="banner__contents">
            <Row>
                <Col  span={12}><Statistic valueStyle={{color:'white'}} title="Total Comment Count" value={millify(videoDetails?.statistics?.comment_count)}/></Col>
                <Col  span={12}><Statistic valueStyle={{color:'white'}} title="Total Follower's" value={millify(videoDetails?.statistics?.digg_count)}/></Col>
                <Col  span={12}><Statistic valueStyle={{color:'white'}} title="Total Download Count" value={millify(videoDetails?.statistics?.download_count)}/></Col>
                <Col span={12}><Statistic valueStyle={{color:'white'}} title="Total Views" value={millify(videoDetails?.statistics?.play_count)}/></Col>
                <Col  span={12}><Statistic valueStyle={{color:'white'}} title="Total Shares" value={millify(videoDetails?.statistics?.share_count)}/></Col>
                <Col  span={12}><Statistic valueStyle={{color:'white'}} title="Total Whatsapp Share" value={millify(videoDetails?.statistics?.whatsapp_share_count)}/></Col>
            </Row>
        </div>
        <div className="banner--fadeBottom" />
    </header>


    <div className="main_video_content">
             <Row>
                <Col span={8}>
                    <motion.div 
                    className="video"
                    whileTap={{ scale: 0.9 }}
                    >
                        <video className="video__player" autoplay loop ref={videoRef} src={videoDetails?.video?.play_addr?.url_list[0]} onClick={onVideoPress} />
                    </motion.div>
                </Col>

                <Col span={16}>
                    <div className="col_2">
                    <Title level={5}>
                        <div className="title">
                        {videoDetails.desc.slice(0,50)}...
                        </div>
                    </Title>

                    <div className="music">
                            <Avatar src={videoDetails?.music?.cover_thumb?.url_list[0]} size='large' className="banner_avatar_img" />
                            <Text>
                                <div className="title" style={{marginTop:'8px', marginLeft:'10px'}}>
                                         {videoDetails?.music?.album}
                                </div>
                            </Text>
                    </div>

                    {videoDetails?.author?.youtube_channel_id &&(
                    <div className="youtube">
                        <Link to={`/channel/${videoDetails?.author.youtube_channel_id}`}>
                        <Button type="primary" danger>
                            Youtube-{videoDetails?.author?.youtube_channel_title}
                        </Button>
                        </Link>
                    </div>
                    )}
                    
                    </div>


                </Col>
            </Row>
    </div>




    
    
    
    
    
    
    </div>
  )
}

export default VideoDetails