import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContextUser } from './Context/StateUsersGlobals'
import RateControl from './RateControl/RateControl'
import TrendControl from './TrendControl/TrendControl'
import TrendControlByMonth from './TrendControlByMonth/TrendControlByMonth'
import TrendControlByYear from './TrendControlByYear/TrendControlByYear'
import Sidebar from './Sidebar/Sidebar';
import Signin from './Login/Signin'



function App1(props) {
   
    return (
        
            <BrowserRouter>
             <Routes>
                    <Route  path="rateControl" element={<RateControl />} />
                    <Route  path="/" element={<Sidebar />} />
                    <Route  path="trendControl" element={<TrendControl />} />
                    <Route  path="trendControlByMonth" element={<TrendControlByMonth />} />
                    <Route  path="trendControlByYear" element={<TrendControlByYear />} />
                    <Route  path="Login" element={<Signin />} />
                </Routes>
            </BrowserRouter>
        
    )
}
export default App1