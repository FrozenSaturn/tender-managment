"use client";

import { useEffect, useState, Component } from "react";
import { useRouter, useParams } from "next/navigation";
import { getTenderDetails, applyToTender } from "@/libs/api";

type TenderDetails = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  budget?: number;
  companyName: string;
};

class TenderErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12">
          <h2 className="text-xl text-red-600">Something went wrong</h2>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function TenderContent() {
  const params = useParams();
  const id = params?.id as string;
  const [tender, setTender] = useState<TenderDetails | null>(null);
  const [proposal, setProposal] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTender = async () => {
      try {
        const data = await getTenderDetails(parseInt(id));
        setTender(data);
      } catch (error) {
        console.error("Failed to fetch tender:", error);
        setError("Failed to load tender details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTender();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!proposal.trim()) {
      setError("Please enter your proposal");
      return;
    }

    try {
      await applyToTender(parseInt(id), { proposal });
      setSuccess("Application submitted successfully!");
      setProposal("");
    } catch (err: any) {
      setError(err.message || "Failed to submit application");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!tender) {
    return <div className="text-center py-12">Tender not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">{tender.title}</h1>

        <div className="mb-8">
          <p className="text-gray-600 mb-4">{tender.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <p>Posted by: {tender.companyName}</p>
            <p>Deadline: {new Date(tender.deadline).toLocaleString()}</p>
          </div>
          {tender.budget && (
            <p className="text-green-600 font-semibold mt-2">
              Budget: ${tender.budget.toLocaleString()}
            </p>
          )}
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">Submit Your Proposal</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="proposal"
                className="block text-gray-700 font-bold mb-2"
              >
                Your Proposal
              </label>
              <textarea
                id="proposal"
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={6}
                placeholder="Describe your proposal, including your approach, timeline, and any relevant experience..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
