// components/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';

interface Props {
    children: ReactNode;
    fallback?: ReactNode; // optional custom fallback
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // Log to your crash reporting tool (Sentry, etc.)
        console.error('ErrorBoundary caught:', error, info);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {


            return <ErrorFallback error={this.state.error} onReset={this.handleReset} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;