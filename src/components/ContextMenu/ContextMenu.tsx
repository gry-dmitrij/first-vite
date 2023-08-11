import styles from './ContextMenu.module.scss'
import {LegacyRef, PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {offsetLeft, offsetTop} from "../../utils/layout.ts";
import ReactDOM from "react-dom";

const PORTAL_ID = 'modal-container'

interface ContextMenuProps extends PropsWithChildren {
  element?: Element | null,
  elementOffset?: number | Coords
  menuOffset?: number | Coords
  margin?: number | Coords
}

interface Coords {
  x: number,
  y: number
}

interface GetCoordProps {
  coord: number
  screenSize: number
  elementSize: number
  offset?: number
  margin?: number
}
const getCoord = ({coord, screenSize, elementSize, offset = 0, margin = 0}: GetCoordProps) => {
  let newCoord = coord + offset
  if (elementSize + 2 * margin > screenSize) {
    newCoord = margin
  } else if (newCoord + elementSize > screenSize - margin) {
    if (coord - offset - elementSize < margin) {
      newCoord = Math.floor(screenSize / 2 - elementSize / 2)
    } else {
      newCoord = coord - offset - elementSize
    }
  }
  return newCoord
}

const ContextMenu = (
  {
    element,
    elementOffset = 0,
    menuOffset = 0,
    margin = 0,
    children
  }: ContextMenuProps) => {
  const [coords, setCoords] = useState<Coords>({
    x: offsetLeft(element || undefined) + (typeof elementOffset === 'number' ? elementOffset : elementOffset.x),
    y: offsetTop(element || undefined) + (typeof elementOffset === 'number' ? elementOffset : elementOffset.y)
  })
  const [visible, setVisible] = useState(false)
  const containerElement = useMemo(
    () => document.getElementById(PORTAL_ID),
    [],
  );
  const container = useRef<HTMLDivElement>()


  if (!containerElement) {
    throw new Error(`Portal "${PORTAL_ID}" not found`)
  }

  const changeCoords = useCallback(() => {
    setVisible(false)
    setCoords({
      x: offsetLeft(element || undefined) + (typeof elementOffset === 'number' ? elementOffset : elementOffset.x),
      y: offsetTop(element || undefined) + (typeof elementOffset === 'number' ? elementOffset : elementOffset.y)
    })
  }, [element, elementOffset])

  useEffect(() => {
    changeCoords()
  }, [changeCoords])

  useEffect(() => {
    window.addEventListener('resize', changeCoords)

    return () => {
      window.removeEventListener('resize', changeCoords)
    }
  }, [changeCoords])

  const checkAndChangeCoords = useCallback(() => {
    const el = container.current
    if (!el) {
      return
    }
    const x = getCoord({
      coord: coords.x,
      screenSize:  window.innerWidth || document.documentElement.clientWidth,
      elementSize: el.clientWidth,
      offset: typeof menuOffset === 'number' ? menuOffset : menuOffset.x,
      margin: typeof margin === 'number' ? margin : margin.x
    })
    const y = getCoord({
      coord: coords.y,
      screenSize:  window.innerHeight || document.documentElement.clientHeight,
      elementSize: el.clientHeight,
      offset: typeof menuOffset === 'number' ? menuOffset : menuOffset.y,
      margin: typeof margin === 'number' ? margin : margin.y
    })
    if (x !== coords.x || y !== coords.y) {
      setCoords({
        x,
        y
      })
    }
    setVisible(true)
  }, [coords, margin, menuOffset])

  const ref: LegacyRef<HTMLDivElement> = (el) => {
    console.log(el)
    if (!el || visible) {
      return
    }
    container.current = el
    checkAndChangeCoords()
  }

  return ReactDOM.createPortal(<div
    ref={ref}
    className={styles.box}
    style={
    {
      opacity: visible ? 1 : 0,
      left: visible ? coords.x : 0,
      top: visible ? coords.y : 0}}
  >
    {children}
  </div>, containerElement)
}

export default ContextMenu
