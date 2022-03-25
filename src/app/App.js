import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ContainerWrapper from './components/common/container'
import Header from './components/common/header'
import Footer from './components/common/footer'
import Main from './components/pages/main'
import AllRooms from './components/pages/allRooms'
import MyRooms from './components/pages/myRooms'
import Admin from './components/pages/admin'
import Autorization from './components/pages/autorization'

function App() {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Header />
            <ContainerWrapper>
                <Switch>
                    <Route path='/autorization' component={Autorization} />
                    <Route path='/allrooms' component={AllRooms} />
                    <Route path='/myrooms' component={MyRooms} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/' exact component={Main} />
                    <Redirect to='/' />
                </Switch>
            </ContainerWrapper>
            <Footer />
        </div>
    )
}

export default App
