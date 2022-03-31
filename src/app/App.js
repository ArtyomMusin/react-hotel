import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ContainerWrapper from './components/ui/container'
import Header from './components/ui/header'
import Footer from './components/ui/footer'
import Main from './components/pages/main'
import AllRooms from './components/pages/allRooms'
import MyRooms from './components/pages/myRooms'
import Admin from './components/pages/admin'
import Autorization from './components/pages/autorization'
import NotFound from './components/pages/notFound'

function App() {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Header />
            <ContainerWrapper>
                <Switch>
                    <Route path='/autorization' component={Autorization} />
                    <Route path='/allrooms/:roomId?' component={AllRooms} />
                    <Route path='/myrooms/:roomId?' component={MyRooms} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/' exact component={Main} />
                    <Route path='*' component={NotFound}/>
                    <Redirect to='/'/>
                </Switch>
            </ContainerWrapper>
            <Footer />
        </div>
    )
}

export default App
