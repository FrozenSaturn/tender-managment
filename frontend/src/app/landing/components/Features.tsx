export const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Publish with Ease</h3>
            <p className="text-gray-600">
              Create and publish tenders in minutes with our simple, intuitive
              interface.
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              Discover Opportunities
            </h3>
            <p className="text-gray-600">
              Browse and apply to hundreds of tenders from various industries.
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Grow Your Network</h3>
            <p className="text-gray-600">
              Connect with other companies and showcase your products and
              services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
