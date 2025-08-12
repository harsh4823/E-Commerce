import React from 'react'

const Backdrop = ({data}) => {
  return (
      <div className={`fixed inset-0 bg-black/30 ${data?"top-16":"top-0"}`}>
          
      </div>
  )
}

export default Backdrop