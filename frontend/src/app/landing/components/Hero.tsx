import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          The Future of B2B Tendering is Here
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Discover, manage, and win tenders all in one place. Join our network
          of leading companies.
        </p>
        <div className="space-x-4">
          <Link
            href="/tenders"
            className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Find Tenders
          </Link>
          <Link
            href="/signup"
            className="px-8 py-3 text-lg font-semibold text-gray-900 bg-white rounded-md hover:bg-gray-200"
          >
            Register Your Company
          </Link>
        </div>
      </div>
    </section>
  );
};
