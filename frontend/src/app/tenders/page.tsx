"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllTenders } from "@/libs/api";

// Define the type for a Tender object for type safety
type Tender = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  budget?: number;
  companyName: string;
};

export default function PublicTendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await getAllTenders();
        setTenders(response.data);
      } catch (error) {
        console.error("Failed to fetch tenders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenders();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading tenders...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Available Tenders</h1>
      <div className="grid gap-6">
        {tenders.map((tender) => (
          <div
            key={tender.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{tender.title}</h2>
                <p className="text-gray-600 mb-4">{tender.description}</p>
                <p className="text-sm text-gray-500">
                  Posted by: {tender.companyName}
                </p>
              </div>
              <div className="text-right">
                {tender.budget && (
                  <p className="text-green-600 font-semibold">
                    Budget: ${tender.budget.toLocaleString()}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Deadline: {new Date(tender.deadline).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Link
                href={`/tenders/${tender.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Details & Apply
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
