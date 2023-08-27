import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { HotelsProvider } from './context/useHotels'
import ContainerWrapper from './components/ui/Container'
import Header from './components/ui/Header'
import Footer from './components/ui/Footer'
import MainPage from './components/pages/MainPage'
import Hotels from './components/pages/Hotels'
import MyOrders from './components/pages/MyOrders'
import Admin from './components/pages/Admin'
import NotFound from './components/pages/NotFound'
import AppLoader from './components/ui/hoc/AppLoader'
import RoomsList from './components/pages/RoomsList'
import { AuthProvider } from './context/useAuth'
import ProtectedRoute from './components/common/ProtectedRoute'
// import Settings from './components/pages/Settings'
import { ModalProvider } from './context/useModal'
import Modal from './components/common/Modal'

function App() {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <AppLoader>
                <ModalProvider>
                    <AuthProvider>
                        <Header />
                        <HotelsProvider>
                            <ContainerWrapper>
                                <Switch>
                                    <Route path='/hotels/:hotelId?/rooms/:roomId?' component={RoomsList} />
                                    <Route path='/hotels/:hotelId?' component={Hotels} />
                                    <ProtectedRoute path='/orders/:roomId?' component={MyOrders}/>
                                    <ProtectedRoute path='/admin' role="admin" component={Admin}/>
                                    {/* <ProtectedRoute path='/settings/' role="all" component={Settings}/> */}
                                    <Route path='/' exact component={MainPage} />
                                    <Route path='*' component={NotFound}/>
                                    <Redirect to='/'/>
                                </Switch>
                            </ContainerWrapper>
                        </HotelsProvider>
                        <Footer />
                        <Modal />
                    </AuthProvider>
                </ModalProvider>
            </AppLoader>
        </div>
    )
}

export default App
