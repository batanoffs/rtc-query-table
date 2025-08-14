import React from 'react';

type GlobalErrorHandlerProps = {
  children: React.ReactNode;
};

type GlobalErrorHandlerState = {
  hasError: boolean;
  error: Error | null;
};

class GlobalErrorHandler extends React.Component<GlobalErrorHandlerProps, GlobalErrorHandlerState> {
  constructor(props: GlobalErrorHandlerProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getErrorState(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error captured by ErrorBoundary:', error, errorInfo);
    this.setState(GlobalErrorHandler.getErrorState(error));
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Show recovery options and limit exposed details
      return (
        <div className="error-boundary-fallback">
          <h1>Something went wrong.</h1>
          <p>We’re working on it. Try again?</p>
          <button onClick={this.handleRetry}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default GlobalErrorHandler;
