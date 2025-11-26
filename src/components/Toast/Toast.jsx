import toast, { Toaster } from "react-hot-toast";

const toastStyles = {
    default: { background: "#333", color: "#fff" },
    success: { background: "green", color: "#fff" },
    warning: { background: "orange", color: "#fff" },
    error: { background: "red", color: "#fff" },
};

export function notify(message, type = "default") {
    const style = toastStyles[type] || toastStyles.default;
    return toast(message, { style });
}

function ToastProvider() {
    return <Toaster />;
}

export default ToastProvider;
