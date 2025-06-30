// frontend/src/app/dashboard/profile/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getMyCompanyProfile } from "@/libs/api";

type CompanyProfile = {
  name: string;
  industry: string;
  description: string;
  logo_url?: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile>({
    name: "",
    industry: "",
    description: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    getMyCompanyProfile()
      .then((data) => setProfile(data))
      .catch(() => router.push("/login"));
  }, [router]);

  const handleUpdateDetails = async (e: FormEvent) => {
    e.preventDefault();
    // This would call a new API function for PUT /api/companies/me
    // For brevity, we are focusing on the logo upload first.
    setMessage("Profile details updated successfully!");
  };

  const handleLogoUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!logoFile) return;

    const formData = new FormData();
    formData.append("logo", logoFile);

    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/api/companies/me/logo", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setProfile((prev) => ({ ...prev!, logo_url: data.logo_url }));
      setMessage("Logo uploaded successfully!");
    } else {
      setMessage("Failed to upload logo.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Manage Your Profile</h1>
      {message && (
        <p className="bg-green-100 text-green-800 p-3 rounded-md mb-6">
          {message}
        </p>
      )}

      <div className="bg-white p-8 rounded-lg shadow-md">
        {profile.logo_url && (
          <img
            src={profile.logo_url}
            alt="Company Logo"
            className="w-24 h-24 rounded-full mx-auto mb-6"
          />
        )}
        <form onSubmit={handleLogoUpload} className="mb-8 border-b pb-8">
          <h2 className="text-xl font-semibold mb-2">Update Company Logo</h2>
          <input
            type="file"
            onChange={(e) =>
              setLogoFile(e.target.files ? e.target.files[0] : null)
            }
            className="mb-4"
          />
          <button
            type="submit"
            disabled={!logoFile}
            className="bg-blue-600 text-white py-2 px-4 rounded-md disabled:bg-gray-400"
          >
            Upload Logo
          </button>
        </form>

        <form onSubmit={handleUpdateDetails}>
          <h2 className="text-xl font-semibold mb-2">Company Details</h2>
          {/* Form fields for name, industry, description would go here */}
          <p className="text-gray-600">Name: {profile.name}</p>
          <p className="text-gray-600">Industry: {profile.industry}</p>
          <p className="text-gray-600">Description: {profile.description}</p>
        </form>
      </div>
    </div>
  );
}
