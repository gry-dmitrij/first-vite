import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ContextMenu from "./components/ContextMenu/ContextMenu.tsx";
import useContextMenu from "./components/ContextMenu/hooks/useContextMenu.ts";

function App() {
  const [count, setCount] = useState(0)
  const {visible, show, contextMenuProps} = useContextMenu()

  useEffect(() => {
    const contextHandler = (e: MouseEvent) => {
      e.preventDefault()
      show(e)
    }
    document.body.addEventListener('contextmenu', contextHandler)

    return () => {
      document.body.removeEventListener('contextmenu', contextHandler)
    }
  }, [show])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo"/>
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={(e) => {
          e.stopPropagation()
          setCount((count) => count + 1);
          console.log('mouse event')
          show(e.nativeEvent)
        }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p style={{
        width: 300,
        height: 500,
        position: 'absolute',
        top: 200,
        left: 0,
        background: '#aaa',
        color: '#000',
        overflow: "hidden",
        transform: 'translateX(100px)'
      }}>абслютное позиционирование

        {visible && <ContextMenu {...contextMenuProps} menuOffset={0} margin={30}>
          <p style={{color: '#000'}} onClick={() => console.log('context click')}>Контекстное меню</p>
        </ContextMenu>}
      </p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad architecto aut culpa cum dolore eaque eos esse fugit iure laboriosam porro possimus quidem ratione, recusandae reprehenderit rerum similique suscipit?</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad architecto aut culpa cum dolore eaque eos esse fugit iure laboriosam porro possimus quidem ratione, recusandae reprehenderit rerum similique suscipit?</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad architecto aut culpa cum dolore eaque eos esse fugit iure laboriosam porro possimus quidem ratione, recusandae reprehenderit rerum similique suscipit?</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad architecto aut culpa cum dolore eaque eos esse fugit iure laboriosam porro possimus quidem ratione, recusandae reprehenderit rerum similique suscipit?</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad architecto aut culpa cum dolore eaque eos esse fugit iure laboriosam porro possimus quidem ratione, recusandae reprehenderit rerum similique suscipit?</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad architecto aut culpa cum dolore eaque eos esse fugit iure laboriosam porro possimus quidem ratione, recusandae reprehenderit rerum similique suscipit?</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad architecto aut culpa cum dolore eaque eos esse fugit iure laboriosam porro possimus quidem ratione, recusandae reprehenderit rerum similique suscipit?</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad architecto aut culpa cum dolore eaque eos esse fugit iure laboriosam porro possimus quidem ratione, recusandae reprehenderit rerum similique suscipit?</p>

    </>
  )
}

export default App
