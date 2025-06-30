// frontend/src/app/dashboard/tenders/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTenderDetails, getTenderApplications } from "@/libs/api";
import { Suspense } from "react";

type Application = {
  id: number;
  proposal: string;
  companyName: string;
  companyLogo?: string;
};

type TenderDetails = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  budget?: number;
};

function ApplicationsContent({ id }: { id: string }) {
  const [tender, setTender] = useState<TenderDetails | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tenderData, applicationsData] = await Promise.all([
          getTenderDetails(parseInt(id)),
          getTenderApplications(parseInt(id)),
        ]);
        setTender(tenderData);
        setApplications(applicationsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load tender details and applications");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!tender) {
    return <div className="text-center py-12">Tender not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{tender.title}</h1>
        <p className="text-gray-600 mb-2">{tender.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>Deadline: {new Date(tender.deadline).toLocaleString()}</p>
          {tender.budget && (
            <p className="text-green-600 font-semibold">
              Budget: ${tender.budget.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            Applications ({applications.length})
          </h2>
        </div>

        {applications.length > 0 ? (
          <div className="divide-y">
            {applications.map((application) => (
              <div key={application.id} className="p-6">
                <div className="flex items-center mb-4">
                  {application.companyLogo ? (
                    <img
                      src={application.companyLogo}
                      alt={`${application.companyName} logo`}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
                  )}
                  <h3 className="text-lg font-semibold">
                    {application.companyName}
                  </h3>
                </div>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {application.proposal}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No applications received yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default function TenderApplicationsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [tender, setTender] = useState<TenderDetails | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const [t, a] = await Promise.all([
          getTenderDetails(Number(id)),
          getTenderApplications(Number(id)),
        ]);
        setTender(t);
        setApplications(a);
      } catch (err: any) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, router]);

  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <ApplicationsContent id={id} />
    </Suspense>
  );
}
