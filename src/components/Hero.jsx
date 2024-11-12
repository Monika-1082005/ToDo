import ChecklistImage from '/Checklist.png'; // Adjust path if necessary

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen pt-32 pb-24 mx-auto max-w-5xl px-6 lg:px-12 space-y-8 lg:space-y-0 lg:space-x-12">
      {/* Image section */}
      <img
        src={ChecklistImage}
        alt="Checklist"
        className="w-72 h-72 mb-6 lg:mb-0"
      />

      {/* Text content section */}
      <div className="text-center lg:text-left">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">
          Stay Organized, Stay Productive
        </h2>
        <p className="text-gray-700 text-lg">
          Manage your tasks effortlessly and boost your productivity with our simple to-do list app. Organize your day and get things done with ease.
        </p>
      </div>
    </div>
  );
};

export default Hero;
