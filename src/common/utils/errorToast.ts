import { toast } from "react-toastify"
export const errorToast = (message: string, error?:unknown)=>{
  console.log("CALLING ERROR TOAST:", message);
  toast(message, {theme: 'colored', type: 'error'})
  if(error){
    console.error(`${message}\n`, error)
  }
}