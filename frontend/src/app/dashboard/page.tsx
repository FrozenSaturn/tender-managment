// frontend/src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getMyCompanyProfile } from "@/libs/api"; // Use our new API client

type CompanyProfile = {
  id: number;
  name: string;
  industry: string;
  description: string;
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // This is a simple way to protect a route on the client-side
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getMyCompanyProfile();
        setProfile(data);
      } catch (error) {
        // Handle token expiration or other errors
        console.error(error);
        localStorage.removeItem("token");
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Welcome, {profile?.name}!</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Your Dashboard</h2>
        <div className="space-y-4">
          <Link
            href="/dashboard/profile"
            className="block w-full text-left p-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Manage Profile
          </Link>
          <Link
            href="/dashboard/tenders"
            className="block w-full text-left p-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            View My Tenders
          </Link>
          <Link
            href="/dashboard/tenders/new"
            className="block w-full text-left p-4 bg-blue-100 hover:bg-blue-200 rounded-md text-blue-800 font-bold transition-colors"
          >
            Create New Tender
          </Link>
        </div>
      </div>
    </div>
  );
}
