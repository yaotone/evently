import './App.css'
import MenuButton from './components/MenuButton'

import match from "./assets/match.png"
import event from "./assets/events.png"
import feed from "./assets/feed.png"
import profile from "./assets/profile.png"
import premium from "./assets/premium.png"
import { useState } from 'react'
import Main from './widgets/Main'
import {Menu as MyMenu} from './widgets/menu'

function App() {
  const [activePage, setActivePage] = useState<number>(3);

  return (
    <>
      <Main activePage={activePage}/>
      <MyMenu page={activePage}>
        <>
          <MenuButton icon={match} setActivePage={setActivePage}
            isActive={1 == activePage} toPage={1}/>
          <MenuButton icon={event} setActivePage={setActivePage}
            isActive={2 == activePage} toPage={2}/>
          <MenuButton icon={feed} setActivePage={setActivePage}
            isActive={3 == activePage} toPage={3}/>
          <MenuButton icon={profile} setActivePage={setActivePage}
            isActive={4 == activePage} toPage={4}/>
          <MenuButton icon={premium} setActivePage={setActivePage}
            isActive={5 == activePage} toPage={5}/>
        </>
      </MyMenu>
    </>
  )
}

export default App
