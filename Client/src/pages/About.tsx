import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 dark:text-orange-400 mb-4">
          About Our Tour Management
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          We provide hassle-free tour planning, seamless booking, and the best
          experiences for travelers around the world. Discover, book, and enjoy
          your dream tours with us!
        </p>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 transition-colors duration-300">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-orange-600 dark:text-orange-400">
          Why Choose Us?
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded shadow-sm hover:shadow transition dark:bg-[#09090B]">
            <h3 className="text-xl text-orange-500 dark:text-orange-400 font-bold mb-2">
              Seamless Booking
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Book tours with just a few clicks — fast, secure, and simple.
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded shadow-sm hover:shadow transition dark:bg-[#09090B]">
            <h3 className="text-xl font-bold mb-2 text-orange-500 dark:text-orange-400">
              Verified Tours
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              All packages are verified for quality and reliability.
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded shadow-sm hover:shadow transition dark:bg-[#09090B]">
            <h3 className="text-xl dark:text-orange-400 font-bold mb-2 text-orange-500">
              24/7 Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our support team is always ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-orange-500 dark:text-orange-400">
              500+
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Tours Completed
            </p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-orange-500 dark:text-orange-400">
              200+
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Happy Clients
            </p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-orange-500 dark:text-orange-400">
              50+
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Destinations Covered
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-orange-500 dark:text-orange-400 mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Discover amazing places, plan your dream vacation, and make lasting
          memories.
        </p>
        <Button
          className="rounded-none bg-orange-500 text-white px-6 py-3 font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 transition"
          size={"lg"}
        >
          <Link to="/tours">Explore Tours</Link>
        </Button>
      </section>
    </div>
  );
};

export default About;
