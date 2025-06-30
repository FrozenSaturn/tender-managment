// frontend/src/app/dashboard/tenders/new/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createTender } from "@/libs/api";

export default function NewTenderPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Validate inputs
      if (!title.trim()) {
        setError("Title is required");
        return;
      }
      if (!description.trim()) {
        setError("Description is required");
        return;
      }
      if (!deadline) {
        setError("Deadline is required");
        return;
      }

      // Format the deadline to ISO string
      const deadlineDate = new Date(deadline);
      if (isNaN(deadlineDate.getTime())) {
        setError("Invalid deadline date");
        return;
      }

      // Create the tender data object
      const tenderData = {
        title: title.trim(),
        description: description.trim(),
        deadline: deadlineDate.toISOString(), // Convert to ISO string
        budget: budget ? parseFloat(budget) : undefined,
      };

      // Validate budget if provided
      if (tenderData.budget !== undefined && isNaN(tenderData.budget)) {
        setError("Invalid budget amount");
        return;
      }

      await createTender(tenderData);
      router.push("/dashboard/tenders"); // Redirect to their tenders list on success
    } catch (err: any) {
      console.error("Error creating tender:", err);
      setError(
        err.message ||
          "Failed to create tender. Please check your inputs and try again."
      );
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create a New Tender</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Tender Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Enter tender title"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            required
            placeholder="Describe the tender requirements"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="deadline"
          >
            Application Deadline
          </label>
          <input
            id="deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="budget"
          >
            Budget (Optional)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              id="budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 50000"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Publish Tender
        </button>
      </form>
    </div>
  );
}
