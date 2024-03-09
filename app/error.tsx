'use client'

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";
interface ErrorStateProps {
    error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({
    error
}) => {
    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <EmptyState 
            title="Uh Oh Error mất rồi hãy kiểm tra lại nhé"
            subtitle="Some thing went wrong!"
        />
    )
};

export default ErrorState;