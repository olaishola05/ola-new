import React from 'react'
import { YouTubeVideo } from './youtube'

export default function ElevatorPitch() {
  return (
    <div className='self-center'>
      <div className="w-full md:px-0"
        data-aos="zoom-in-up"
        data-aos-duration="3000"
        data-aos-anchor-placement="top-center"
      >
        <YouTubeVideo videoId='v=2Xj0g1m4k6A' title='Elevator Pitch' autoplay />
      </div>
    </div>
  )
}
