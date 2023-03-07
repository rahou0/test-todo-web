import { toast } from "react-toastify";

const options = {
  autoClose: 2000,
  hideProgressBar: true,
  position: toast.POSITION.TOP_CENTER,
  closeButton: false,
  theme: "colored",
  draggable: true,
};
export const show_notification = (message, status = "success") => {
  if (status === "success") return toast.success(message, options);
  return toast.error(message, options);
};
