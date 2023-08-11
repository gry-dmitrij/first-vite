import {ComponentProps, useCallback, useEffect, useState} from "react";
import ContextMenu from "../ContextMenu.tsx";
import {offsetLeft, offsetTop} from "../../../utils/layout.ts";

const useContextMenu = () => {
  const [visible, setVisible] = useState(false)
  const [contextMenuProps, setContextMenuProps] = useState<Partial<ComponentProps<typeof ContextMenu>>>({})

  const show = useCallback((e: MouseEvent) => {
    let offsetY = 0
    let offsetX = 0
    if (e.target instanceof Element) {
      const target = e.target
      offsetY = e.pageY - offsetTop(target) - document.documentElement.scrollTop
      offsetX = e.pageX - offsetLeft(target) - document.documentElement.scrollLeft
    }

    setContextMenuProps({
      element: e.target instanceof Element ? e.target : null,
      elementOffset: {
        x: offsetX,
        y: offsetY
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
