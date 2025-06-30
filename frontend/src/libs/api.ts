// frontend/src/lib/api.ts
const BASE_URL = "http://localhost:3001/api";

// A helper to handle API requests
const apiRequest = async (path: string, options: RequestInit = {}) => {
  const headers = new Headers({ "Content-Type": "application/json" });

  // Get token from localStorage if it exists
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "An API error occurred");
  }

  return res.json();
};

// Export specific API functions
export const getMyTenders = () => apiRequest("/tenders/my-tenders");
export const getMyCompanyProfile = () => apiRequest("/companies/me");

export const createTender = (tenderData: {
  title: string;
  description: string;
  deadline: string;
  budget?: number;
}) => {
  return apiRequest("/tenders", {
    method: "POST",
    body: JSON.stringify(tenderData),
  });
};
