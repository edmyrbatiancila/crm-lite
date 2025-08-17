import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { showSuccess, showError } from '@/lib/alert';

interface FlashMessage {
    success?: string;
    error?: string;
    message?: string;
    warning?: string;
}

export const useFlashMessages = () => {
    const { props } = usePage<{ flash: FlashMessage }>();

    useEffect(() => {
        if (props.flash?.success) {
            showSuccess(props.flash.success);
        }
        if (props.flash?.error) {
            showError(props.flash.error);
        }
        if (props.flash?.message) {
            showSuccess(props.flash.message);
        }
        if (props.flash?.warning) {
            showError(props.flash.warning);
        }
    }, [props.flash]);
};
