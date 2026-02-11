// Toast notifications using SweetAlert2
import Swal from 'sweetalert2';

// Configure default toast
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

// Toast functions
export const showSuccess = (message) => {
    Toast.fire({
        icon: 'success',
        title: message
    });
};

export const showError = (message) => {
    Toast.fire({
        icon: 'error',
        title: message,
        timer: 5000 // Errors show longer
    });
};

export const showWarning = (message) => {
    Toast.fire({
        icon: 'warning',
        title: message
    });
};

export const showInfo = (message) => {
    Toast.fire({
        icon: 'info',
        title: message
    });
};

// Confirmation dialog (not a toast, full modal)
export const showConfirm = async (title, text, confirmText = 'Yes', cancelText = 'Cancel') => {
    const result = await Swal.fire({
        title,
        text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1c8089',
        cancelButtonColor: '#6c757d',
        confirmButtonText: confirmText,
        cancelButtonText: cancelText
    });
    return result.isConfirmed;
};

// Loading indicator
export const showLoading = (message = 'Please wait...') => {
    Swal.fire({
        title: message,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
};

export const hideLoading = () => {
    Swal.close();
};

export default {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    showLoading,
    hideLoading
};
