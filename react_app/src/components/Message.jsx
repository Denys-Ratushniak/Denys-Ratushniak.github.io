import { toast } from "react-toastify";

const Message = (message, type) => {
    switch (type) {
        case "success":
            toast.success(message, { position: toast.POSITION.TOP_CENTER });
            break;
        case "error":
            toast.error(message, { position: toast.POSITION.TOP_CENTER });
            break;
        case "warning":
            toast.warning(message, { position: toast.POSITION.TOP_CENTER });
            break;
        default:
            toast.info(message, { position: toast.POSITION.TOP_CENTER });
            break;
    }
};

export default Message;
