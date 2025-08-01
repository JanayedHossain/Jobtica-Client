import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Tanvir Ahmed",
    role: "Sales Executive",
    message:
      "This platform made it so easy to log my work daily. I feel more productive and noticed!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Fatema Khatun",
    role: "HR Manager",
    message:
      "Tracking employee performance and verifying payroll has never been this effortless.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Sakib Khan",
    role: "Developer",
    message:
      "The dashboard interface is clean, responsive and everything is just one click away!",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const Testimonial = () => {
  return (
    <section className="pb-16">
      <div className=" mx-auto w-[95%] px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 font-primaryFont">
          What Our <span className="text-primary">People Say</span>
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          loop={true}
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white p-8 rounded-lg shadow-lg relative w-[95%] mx-auto">
                <FaQuoteLeft className="text-4xl text-primary absolute top-4 left-4 opacity-20" />
                <p className="text-gray-700 mb-6 italic">"{item.message}"</p>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-primary"
                />
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
