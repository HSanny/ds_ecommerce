import React from "react";
import { Snackbar, Alert } from "@mui/material";

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//     props,
//     ref
// ) {
//     return <Alert elevation={6} ref={ref} variant="filled" {...props} />
// })

export type AlertColor = 'success' | 'info' | 'warning' | 'error';

const AlertNotification: React.FC<{
    message: string,
    open: boolean,
    onClose: () => void,
    severity: AlertColor,
}> = ({
    message, open, onClose, severity,
}) => {
        return (
            <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
                <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        )
    }

export default AlertNotification