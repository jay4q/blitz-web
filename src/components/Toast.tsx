import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
  autoClose: 3000,
  position: 'top-center',
  hideProgressBar: true,
  closeButton: false,
  limit: 3,
})