import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { MakeAPrayerRequest } from './pages/MakeAPrayerRequest';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Navbar } from './components/Navbar';

function App() {
    return(
        <>
        <Navbar />
    <Routes>
        <Route index element={<Home />} />
        <Route path='/request' element={<MakeAPrayerRequest />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<h1>404: Page Not Found</h1>} />
    </Routes>
    </>
    )
}

export default App;