import employee from "../../assets/employee.jpg";
const CompanyBanner = () => {
  return (
    <div className="bg-gray-200 py-16 lg:py-24">
      <div className="w-[95%] mx-auto grid lg:grid-cols-2 gap-8 items-center">
        <div className="order-2 lg:order-1">
          <h1 className="text-4xl md:text-5xl font-primaryFont font-bold mb-4 leading-tight  text-black">
            Empowering Teams,{" "}
            <span className="text-primary block">Elevating Success</span>
          </h1>
          <p className=" font-seconderyFont text-gray-600 mb-6">
            Over the last{" "}
            <span className="font-semibold text-black">10+ years</span>, we've
            helped companies grow by streamlining their employee management
            processes.
          </p>

          <div className="flex gap-5">
            <div className="flex">
              <div className="border p-4 rounded-2xl border-gray-400">
                <h2 className="text-3xl font-bold text-primary">50+</h2>
                <p className="text-sm text-gray-600">Corporate Clients</p>
              </div>
            </div>
            <div className="flex">
              <div className="border p-4 rounded-2xl border-gray-400">
                <h2 className="text-3xl font-bold text-primary">1200+</h2>
                <p className="text-sm text-gray-600">Happy Employees</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" order-1 lg:order-1">
          <img
            src={employee}
            alt="Corporate Success"
            className="rounded-lg shadow-lg sm:w-[70%] md:w-[50%] lg:w-[70%] xl:w-[60%]  mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyBanner;
