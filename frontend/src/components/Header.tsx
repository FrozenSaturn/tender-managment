import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/landing" className="text-xl font-bold text-gray-800">
            Tender Platform
          </Link>
          <div className="space-x-6">
            <Link
              href="/landing/about"
              className="text-gray-600 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="/landing/contact"
              className="text-gray-600 hover:text-gray-900"
            >
              Contact
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
