import React from 'react';

// Keeps a rendering failure in the page body from unmounting the whole app (header included)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error rendering Pokemon content:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <div className="error-message" role="alert">
            <h2>⚠️ Something went wrong</h2>
            <p>Part of the page failed to load. Please reload to try again.</p>
            <button type="button" onClick={() => window.location.reload()} className="retry-button">
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
