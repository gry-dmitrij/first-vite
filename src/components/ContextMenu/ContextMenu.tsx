import styles from './ContextMenu.module.scss'
import {PropsWithChildren, useState} from "react";

interface ContextMenuProps extends PropsWithChildren {
  element?: Element,
  offset?: number
}

interface Coords {
  x: number,
  y: number
}

const ContextMenu = (
  {
    // element,
    // offset = 0,
    children
  }: ContextMenuProps) => {
  const [coords] = useState<Coords>({x: 0, y: 0})



  return <div
    className={styles.box}
    style={{left: coords.x, top: coords.y}}
  >
    {children}
  </div>
}

export default ContextMenu
