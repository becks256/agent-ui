import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-background text-foreground">
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-sm text-muted-foreground mb-4">
        The requested page could not be found.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
      >
        Return Home
      </Link>
    </div>
  );
}
