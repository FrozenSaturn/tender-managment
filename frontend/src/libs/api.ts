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

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server returned non-JSON response");
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "An API error occurred");
    }

    return data;
  } catch (error: any) {
    if (error.message === "Server returned non-JSON response") {
      throw new Error("Unable to connect to server. Please try again later.");
    }
    throw error;
  }
};

// Export specific API functions
export const getMyTenders = () => apiRequest("/tenders/my-tenders");
export const getMyCompanyProfile = () => apiRequest("/companies/me");
export const getTenderById = (id: string) => apiRequest(`/tenders/${id}`);
export const getApplicationsForTender = (id: string) =>
  apiRequest(`/tenders/${id}/applications`);

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

export const searchCompanies = (query: string) =>
  apiRequest(`/search/companies?q=${query}`);

export const getAllTenders = () => apiRequest("/tenders");

export const getTenderDetails = (tenderId: number) =>
  apiRequest(`/tenders/${tenderId}`);

export const applyToTender = (tenderId: number, data: { proposal: string }) =>
  apiRequest(`/tenders/${tenderId}/apply`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getTenderApplications = (tenderId: number) =>
  apiRequest(`/tenders/${tenderId}/applications`);
