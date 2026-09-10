import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Overview from './pages/Overview'
import Tickets from './pages/Tickets'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/tickets" element={<Tickets />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3200}
        hideProgressBar
        newestOnTop
        theme="light"
        toastClassName="!rounded-lg !text-sm"
      />
    </BrowserRouter>
  )
}

export default App
