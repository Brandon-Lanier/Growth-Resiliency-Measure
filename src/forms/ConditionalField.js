import { useEffect } from 'react'

export const ConditionalField = ({ show, onCollapse, onShow, children }) => {
  useEffect(() => {
    if (show) {
      onShow()
    } else {
      onCollapse()
    }
  }, [show])
  
  return show ? children : null
}

