const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <main className="error">
      <header className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white">
        <h1>Error</h1>
      </header>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </main>
  );
};
export default ErrorFallback;
