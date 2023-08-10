import {ComponentProps, useCallback, useEffect, useState} from "react";
import ContextMenu from "../ContextMenu.tsx";

const useContextMenu = () => {
  const [visible, setVisible] = useState(false)
  const [contextMenuProps, setContextMenuProps] = useState<Partial<ComponentProps<typeof ContextMenu>>>({})

  const show = useCallback((e: MouseEvent) => {
    console.log('show: ', e)
    setContextMenuProps({
      element: e.target instanceof Element ? e.target : null,
      elementOffset: {
        x: e.offsetX,
        y: e.offsetY
      }
    })
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
    hide,
    contextMenuProps
  }
}

export default useContextMenu
