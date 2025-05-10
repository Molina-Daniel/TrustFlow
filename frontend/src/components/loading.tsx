function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
      <div className="relative">
        <img
          src="/logo.svg"
          alt="TrustFlow Logo"
          className="h-20 w-20 animate-pulse"
        />
      </div>
      <p className="absolute mt-28 text-white text-sm font-medium">
        Connecting...
      </p>
    </div>
  );
}

export default Loading;
