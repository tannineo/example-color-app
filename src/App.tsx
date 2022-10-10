import { useState } from 'react'
import { SketchPicker } from 'react-color'
import { invoke } from '@tauri-apps/api'

import './App.css'

function App() {
  const [color, setColor] = useState('#1fa9f4')
  const [gradient, setGradient] = useState<any[]>([])

  return (
    <div className='container'>
      <SketchPicker
        color={color}
        onChange={(color, event) => {
          console.log('color => ', color)
          setColor(color.hex)
          invoke('generate_gradient', color.rgb as any).then((grad: unkown) => {
            console.log('gradient => ', grad)
            setGradient(grad)
          })
        }}
      />

      {gradient.map(color => (
        <div
          style={{
            padding: '2rem',
            background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
            textShadow: `0px 0px 4px #000000`,
          }}
        >
          rgb({color[0]}, {color[1]}, {color[2]})
        </div>
      ))}
    </div>
  )
}

export default App
