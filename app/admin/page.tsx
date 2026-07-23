import { StatCard } from "@/components/dashboard/stat-card";

export default function AdminPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Welcome back, admin.
        </p>
      </div>


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <StatCard
          title="Total Projects"
          value="8"
        />

        <StatCard
          title="Published"
          value="5"
        />

        <StatCard
          title="Draft"
          value="3"
        />

        <StatCard
          title="Technologies"
          value="15"
        />

      </div>

    </div>
  );
}