export default function Home() {
  return (
    <div className="bg-canvas-bg text-text-primary flex min-h-screen flex-col font-sans">
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="bg-surface-1 border-border shadow-card w-full max-w-sm rounded-lg border px-8 py-6 text-center">
          <h1 className="text-clerk-heading font-bold text-text-primary">Doodle Jam</h1>
          <p className="text-clerk-body text-text-tertiary mt-1">
            Clean slate. Ready to build from scratch.
          </p>
        </div>
      </main>
    </div>
  );
}
