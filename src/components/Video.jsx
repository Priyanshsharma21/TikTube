import React, { useRef, useState } from 'react'
import '../assets/Video.css'
const Video = ({videoUrl}) => {
    const [playing, setPlaying] = useState(false)
    const videoRef = useRef(null)
    const onVideoPress=()=>{
        if(playing){
            videoRef.current.pause()
            setPlaying(false)
        }else{
            videoRef.current.play()
            setPlaying(true)
        }
    }
  return (
    <div className="videoz">
        <video className='video__playerz' src={videoUrl} loop ref={videoRef} onClick={onVideoPress} />
    </div>
  )
}

export default Video