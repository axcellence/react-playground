import './App.css'
import { AudioRecorder } from './components/audio-recorder'
import { ExampleContent } from './components/skeleton/example'
import { Skeleton } from './components/skeleton/skeleton'
import { ShareButton } from './components/webshare'

function App() {

  return (
    <>
      {/* <ShareButton /> */}
        {/* <AudioRecorder /> */}
      <Skeleton >
        <ExampleContent paragraphs={3} />
      </Skeleton>
    </>
  )
}

export default App
