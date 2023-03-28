import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './assets/css/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import './assets/css/custom.css'
import { Tooltip } from 'react-tooltip'
import { connect } from 'react-redux'
import LoadingModal from './components/loading-modal'
/** Routers */
import SignIn from './pages/sign-in'
import Users from './pages/admin/users'
import Customers from './pages/admin/customers'
import Invoices from './pages/admin/invoices'

const App = ({ config }) => {

  return (
    <>
      {config.loading && <LoadingModal />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          {/* Admin Routers */}
          <Route path="/users" element={<Users />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
        <Tooltip id="tooltip" />
      </BrowserRouter>
    </>
  )
}

const mapStateToProps = ({ config }) => ({
  config
})

export default connect(mapStateToProps, null)(App)