function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert " className="bg-red-200 p-3 text-red-500">
      <p>Something went wrong:</p>
      <pre>Component này đang bị lỗi</pre>
      <button
        onClick={resetErrorBoundary}
        className="px-3 py-2 bg-green-400 rounded-md text-white"
      >
        Try again
      </button>
    </div>
  );
}
export default ErrorFallback;
