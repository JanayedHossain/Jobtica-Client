import { useState } from "react";

const companyData = [
  {
    id: 1,
    title: "Engineering Department",
    image:
      "https://images.unsplash.com/photo-1524313882432-d6c8ea197274?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    description: "Total 25 employees working on 5 ongoing projects.",
    details:
      "This department handles all product development and maintenance projects. Current active projects: Website Revamp, Mobile App Update, API Integration, Backend Optimization, Cloud Migration.",
  },
  {
    id: 2,
    title: "Marketing Team",
    image:
      "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=800&q=80",
    description: "Currently running 3 campaigns, 8 members involved.",
    details:
      "Marketing campaigns include Social Media Ads, Email Outreach, and Brand Awareness. Team members focus on content creation, SEO, and performance analysis.",
  },
  {
    id: 3,
    title: "Head Office – Dhaka",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    description: "120 employees, 4 floors, fully equipped facilities.",
    details:
      "The Dhaka office has 4 floors with conference rooms, cafeteria, and recreational zones. Departments: HR, Engineering, Marketing, Sales, Customer Support.",
  },
  
  {
    id: 4,
    title: "Leadership Training",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    description: "Open for team leads on 30th Aug, 3 sessions planned.",
    details:
      "Training focuses on leadership skills, conflict resolution, team management, and project prioritization. Each session lasts 2 hours with hands-on exercises.",
  },
];


const CardSection = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="max-w-[95%] mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 font-primaryFont">
        Company <span className="text-primary">Overview</span>
      </h2>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {companyData.map((item) => (
          <div
            key={item.id}
            className=" rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-transparent hover:border-primary"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setSelected(item)}
              >
                See More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-base-200 bg-opacity-50 min-h-screen flex items-center justify-center z-50">
          <div className=" rounded-lg p-6 mt-16 w-11/12 md:w-1/2 border relative">
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h3 className="text-2xl font-bold mb-4">{selected.title}</h3>
            <p className="text-gray-700 mb-6">{selected.details}</p>

            <button
              className="btn btn-primary mt-2"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CardSection;
