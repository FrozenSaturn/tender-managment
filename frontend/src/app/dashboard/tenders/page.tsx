// frontend/src/app/dashboard/tenders/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyTenders } from "@/libs/api";
import { useRouter } from "next/navigation";

type Tender = {
  id: number;
  title: string;
  deadline: string;
};

export default function MyTendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const data = await getMyTenders();
        setTenders(data);
      } catch (error) {
        console.error(error);
        // If token is invalid or expired, redirect to login
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchTenders();
  }, [router]);

  if (loading) {
    return <div className="text-center py-12">Loading your tenders...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Tenders</h1>
        <Link
          href="/dashboard/tenders/new"
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          + Create New Tender
        </Link>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        {tenders.length > 0 ? (
          <ul className="space-y-4">
            {tenders.map((tender) => (
              <li
                key={tender.id}
                className="p-4 border rounded-md flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{tender.title}</h2>
                  <p className="text-sm text-gray-500">
                    Deadline: {new Date(tender.deadline).toLocaleString()}
                  </p>
                </div>
                {/* This link will eventually go to a page showing applications for this tender */}
                <button className="text-blue-600 hover:underline">
                  View Applications
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have not created any tenders yet.</p>
        )}
      </div>
    </div>
  );
}
