import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground px-4">
      <h1 className="text-7xl font-bold">404</h1>

      <p className="mt-4 text-lg text-muted-foreground">Page not found</p>

      <p className="mt-1 text-sm text-muted-foreground text-center">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-md bg-primary px-6 py-2 text-primary-foreground hover:opacity-90 transition"
      >
        Go back home
      </Link>
    </div>
  );
}
