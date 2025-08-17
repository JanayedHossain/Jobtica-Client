const AboutUs = () => {
  return (
    <div className="w-[95%] mx-auto mt-24">
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl text-center font-bold">
          About <span className="text-primary">Us</span>
        </h2>
        <p className="text-gray-500 text-center text-sm md:text-base mt-4">
          Connecting talented job seekers with top companies, making career
          growth simple and accessible.
        </p>
      </div>
      <div className=" grid md:grid-cols-2 gap-10 mb-16">
        <div className=" p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold  mb-4">Our Mission</h2>
          <p className="text-gray-500 leading-relaxed">
            Our mission is to help individuals reach their full potential by
            providing access to jobs that truly match their skills and passions.
            We strive to empower people and drive economic growth by bridging
            the gap between talent and opportunity.
          </p>
        </div>

        <div className=" p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-500 leading-relaxed">
            We envision a future where job seekers and companies are seamlessly
            connected through technology. A future where career growth is
            accessible to everyone, and businesses thrive with the right talent.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className=" text-center mb-16">
        <h2 className="text-3xl font-bold  mb-6">Meet Our Team</h2>
        <p className="text-gray-500 mb-10">
          Behind JobFinder is a passionate team of professionals dedicated to
          transforming the way people find jobs and companies hire talent.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className=" p-6 rounded-xl shadow-md">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Team Member"
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-primary">John Doe</h3>
            <p className="text-gray-500">CEO & Founder</p>
          </div>

          <div className=" p-6 rounded-xl shadow-md">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Team Member"
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-primary">Sarah Smith</h3>
            <p className="text-gray-500">Head of Marketing</p>
          </div>

          <div className=" p-6 rounded-xl shadow-md">
            <img
              src="https://randomuser.me/api/portraits/men/65.jpg"
              alt="Team Member"
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-primary">Michael Lee</h3>
            <p className="text-gray-500">Lead Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
