import React from 'react'

const RoomCell = ({ className, data}) => {
  return (
    <div className={className}>
      {data.roomNo}
      <span></span>
    </div>
  );
}

export default RoomCell
