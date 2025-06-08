import { createContext, FunctionComponent, ReactNode, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PageBlock } from "../../styles/global";
import { devices } from "../../styles/devices";
import { COLORS } from "../../styles/colors";

interface ToastProps {
    message: string;
    onClose: () => void;
}

const ToastWrapper = styled.div`
    display: block;
    padding: 6px;
    border-radius: 6px;
    font-size: 16px;
    background-color: ${COLORS.blue};
    color: ${COLORS.white};
    animation: fadeIn 0.2s;
    box-shadow: 0px 0px 2px ${({ theme }) => theme.overlayGrey};

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
`;

const ToastOuterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    position: fixed;
    top: unset;
    bottom: 80px;
    left: 24px;
    right: 24px;
    transform: unset;
    z-index: 9999;
    
    @media ${devices.mobileL} {
        left: 50%;
        right: unset;
        transform: translateX(-50%);
    }
`;

const Toast: FunctionComponent<ToastProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onClose();
        }, 4000);
    
        return () => clearTimeout(timeoutId);
    }, [onClose]);

    return (
        <ToastWrapper
            onClick={onClose}
        >
            <PageBlock>
                {message}
            </PageBlock>
        </ToastWrapper>
    );
}

interface ToastContextType {
    addToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

    const addToast = (message: string) => {
        const newToast = { id: Date.now(), message };
        setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    const removeToast = (id: number) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <ToastOuterContainer>
                {toasts.map((toast) => (
                    <Toast key={toast.id} message={toast.message} onClose={() => removeToast(toast.id)} />
                ))}
            </ToastOuterContainer>
        </ToastContext.Provider>
    );
}

export const useToasts = (): ToastContextType => {
    const context = useContext(ToastContext);
        
    if (!context) 
        throw new Error("useToasts must be used inside ToastProvider");
    
    return context;
};