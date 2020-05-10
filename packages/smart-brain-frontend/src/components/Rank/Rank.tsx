import React from 'react'

interface Props {
  name: string
  entries: number
}

const Rank: React.FC<Props> = ({ name = '', entries = 0 }: Props) => {
  return (
    <div>
      <div className="white f3">{`${name}, your current entry count is ...`}</div>
      <div className="white f1">{entries}</div>
    </div>
  )
}

export default Rank
