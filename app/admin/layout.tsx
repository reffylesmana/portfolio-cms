import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      <aside className="w-64 border-r p-6">
        <h1 className="text-xl font-bold mb-8">
          Portfolio CMS
        </h1>

        <nav className="flex flex-col gap-3">

          <Link href="/admin">
            Dashboard
          </Link>

          <Link href="/admin/projects">
            Projects
          </Link>

          <Link href="/admin/categories">
            Categories
          </Link>

          <Link href="/admin/technologies">
            Technologies
          </Link>

          <Link href="/admin/skills">
            Skills
          </Link>

          <Link href="/admin/settings">
            Settings
          </Link>

        </nav>
      </aside>


      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}