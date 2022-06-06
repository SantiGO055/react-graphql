import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  
export const AlertaError = (message)=>{
    
    Toast.fire({
        icon: 'error',
        title: message
      })
}
  
export const AlertaSuccess = (message)=>{
    Toast.fire({
        icon: 'success',
        title: message
      })
}