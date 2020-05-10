import React, { ReactNode } from 'react'
import Modal from 'react-modal'

import './Modal.css'

interface Props {
  children: ReactNode
}

Modal.setAppElement('#root')

const ProfileModal: React.FC<Props> = ({ children }: Props) => {
  return (
    <Modal
      style={{
        content: {
          background: 'transparent',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          padding: 0,
          border: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }}
      isOpen
    >
      {children}
    </Modal>
  )
}
export default ProfileModal
