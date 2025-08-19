import { Button, Flex, Result } from 'antd';
import React from 'react';

type GlobalErrorHandlerProps = {
  children: React.ReactNode;
  navigate: (path: string) => void; // Add navigate prop
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

  handleGoBack = () => {
    this.props.navigate('-1');
  };

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="warning"
          title="There are some problems with your operation."
          extra={
            <Flex gap={6}>
              <Button type="primary" onClick={this.handleRetry}>
                Retry
              </Button>
              <Button type="primary" onClick={this.handleGoBack}>
                Go Back
              </Button>
            </Flex>
          }
        />
      );
    }
    return this.props.children;
  }
}

export default GlobalErrorHandler;
