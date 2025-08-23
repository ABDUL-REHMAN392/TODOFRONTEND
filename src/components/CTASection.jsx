import React from "react";

const CTASection = () => {
  return (
    <section className=" py-20 px-4 md:px-8 lg:px-16 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-blue-900 leading-snug">
          Ready to boost your productivity?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 px-2 sm:px-6">
          Join thousands of professionals who trust{" "}
          <span className="font-semibold">TodoPro</span> to manage their tasks
          and achieve their goals.
        </p>
        <button className="bg-blue-900 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-800 hover:scale-105 transition-transform duration-200">
          Start Free Today
        </button>
        <p className="text-gray-500 mt-4 text-sm sm:text-base">
          No credit card required • Free forever plan available
        </p>
      </div>
    </section>
  );
};

export default CTASection;
