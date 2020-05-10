import React from 'react'

import './FaceRecognition.css'

export interface Box {
  leftCol: number
  righCol: number
  topRow: number
  bottomRow: number
}

interface Props {
  image: string
  boxes: Box[]
}

const FaceRecognition: React.FC<Props> = ({ image, boxes = [] }: Props) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="faceReco" src={image} alt="" width="500px" height="auto" />
        {boxes.map((data: any, i: number) => {
          return (
            <div
              className="face"
              key={i}
              style={{
                top: data.topRow,
                bottom: data.bottomRow,
                right: data.righCol,
                left: data.leftCol
              }}
            ></div>
          )
        })}
      </div>
    </div>
  )
}

export default FaceRecognition
