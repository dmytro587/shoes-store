import ErrorBoundary from './ErrorBoundary/ErrorBoundary'

const withErrorBoundary = Component => props => (
   <ErrorBoundary>
      <Component { ...props } />
   </ErrorBoundary>
)

export default withErrorBoundary