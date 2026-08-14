import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Analyze from '../pages/Analyze'
import NotFound from '../pages/NotFound'

const AppRoutes = () => (
  <Router>
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/analyze' element={<Analyze />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MainLayout>
  </Router>
)

export default AppRoutes
