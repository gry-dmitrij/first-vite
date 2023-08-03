import styles from './ContextMenu.module.scss'
import {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {offsetLeft, offsetTop} from "../../utils/layout.ts";

interface ContextMenuProps extends PropsWithChildren {
  element?: Element | null,
  offset?: Coords
}

interface Coords {
  x: number,
  y: number
}

const offsetInit = {x: 0, y: 0}

const ContextMenu = (
  {
    element,
    offset = offsetInit,
    children
  }: ContextMenuProps) => {
  const [coords, setCoords] = useState<Coords>({
    x: offsetLeft(element || undefined) + offset.x,
    y: offsetTop(element || undefined) + offset.y
  })

  const changeCoords = useCallback(() => {
    setCoords({
      x: offsetLeft(element || undefined) + offset.x,
      y: offsetTop(element || undefined) + offset.y
    })
  }, [element, offset])

  useEffect(() => {
    changeCoords()
  }, [changeCoords])

  useEffect(() => {
    window.addEventListener('resize', changeCoords)

    return () => {
      window.removeEventListener('resize', changeCoords)
    }
  }, [changeCoords])

  return <div
    className={styles.box}
    style={{left: coords.x, top: coords.y}}
  >
    {children}
  </div>
}

export default ContextMenu
