export default function NotFound() {
  return (
    <div className="container">
      <h1>Page Not Found</h1>
      <p>The requested page doesn't exist</p>
    </div>
  );
}

export const dynamic = "force-static";
