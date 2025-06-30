// frontend/src/app/tenders/page.tsx

// Define the type for a Tender object for type safety
type Tender = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  budget: number;
  companyName: string;
};

// This function fetches data directly on the server
async function fetchTenders() {
  const res = await fetch("http://localhost:3001/api/tenders", {
    cache: "no-store", // Ensures fresh data on every request
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tenders");
  }
  return res.json();
}

export default async function TendersPage() {
  const { data: tenders } = await fetchTenders();

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Browse Tenders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tenders.map((tender: Tender) => (
          <div
            key={tender.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">{tender.title}</h2>
            <p className="text-gray-600 mb-4 truncate">{tender.description}</p>
            <div className="text-sm text-gray-500">
              <p>Posted by: {tender.companyName}</p>
              <p>Deadline: {new Date(tender.deadline).toLocaleDateString()}</p>
              {tender.budget && (
                <p>Budget: ${tender.budget.toLocaleString()}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
