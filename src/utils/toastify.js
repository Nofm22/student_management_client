import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
const types = ["success", "info", "warning", "error"];

export const addNotification = (msg, type) => {
    // use a random type of notification
    toast(msg, {
        type: types[type],
    });
};
