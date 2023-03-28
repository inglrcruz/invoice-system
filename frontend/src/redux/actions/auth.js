import { setActAuth } from '../states/auth'
import { setConfig } from '../states/config'
import { post, errorRequest } from '../../library/requests'
import { confirmError } from '../../components/confirm-alert'

/**
 * Authenticates the auth by credentials
 * @param {*} form 
 * @returns 
 */
const setAuth = (form) => async (dispatch) => {
  dispatch(setConfig({ loading: true }))
  try {
    const res = await post('auth', false, form)
    const { token, name, usrId } = res.data
    dispatch(setActAuth({ token, name, usrId }))
  } catch (error) {
    if (error.response?.status === 400 || error.response?.status === 401) {
      const message = (error.response.data.message) ? error.response.data.message : "The username or password is incorrect."
      confirmError("Authorization Error", message)
    } else {
      errorRequest(error)
    }
  } finally {
    dispatch(setConfig({ loading: false }))
  }
}

const exportConst = { setAuth }
export default exportConst