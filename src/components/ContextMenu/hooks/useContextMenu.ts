import {useCallback, useEffect, useState} from "react";

const useContextMenu = () => {
  const [visible, setVisible] = useState(false)

  const show = useCallback((e: MouseEvent) => {
    console.log('show: ', e)
    setVisible(true)
  }, [])

  const hide = useCallback(() => {
    console.log('hide')
    setVisible(false)
  }, [])

  useEffect(() => {
    if (visible) {
      window.addEventListener('click', hide)
    }

    return () => {
      window.removeEventListener('click', hide)
    }
  }, [visible, hide])

  return {
    visible,
    show,
    hide
  }
}

export default useContextMenu
