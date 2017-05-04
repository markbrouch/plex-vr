import 'aframe'
import { Entity, Scene } from 'aframe-react'
import React from 'react'

const Theater = () => (
  <Scene stats>
    <a-assets>
      <video id="sample" autoPlay loop="true" src="/video" playsInline />
    </a-assets>
    <Entity
      primitive="a-video"
      src="#sample"
      width="16"
      height="9"
      position="0 0 -10"
    />
  </Scene>
)

export default Theater
