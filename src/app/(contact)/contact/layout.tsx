export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-7xl mx-auto p-5 md:p-10">{children}</section>
  );
}
