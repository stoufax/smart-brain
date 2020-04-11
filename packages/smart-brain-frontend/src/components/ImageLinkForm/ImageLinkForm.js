import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonChange }) => {
  return (
    <div>
      <p className="f3">{'Einstein face recognition'}</p>
      <div className="form br3 pa4 shadow-5 center">
        <input className="input-reset ba b--black-20 pa2 mb2 db w-70" type="text" onChange={onInputChange} />
        <button className="w-30 grow f6 link ph2 pv1 mb2 dim white br1 bg-light-purple" onClick={onButtonChange}>
          Detect
        </button>
      </div>
    </div>
  )
}

export default ImageLinkForm
