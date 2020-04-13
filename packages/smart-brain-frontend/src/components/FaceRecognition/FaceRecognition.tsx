import React from 'react'

import './FaceRecognition.css'

const FaceRecognition = ({ image, box }: any) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="faceReco" src={image} alt="" width="500px" height="auto" />
        {box.length
          ? box.map((data: any, i: number) => {
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
            })
          : ''}
      </div>
    </div>
  )
}

export default FaceRecognition
