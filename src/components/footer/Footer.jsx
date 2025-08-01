import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-800 ">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="text-xl">
            <img src={logo} alt="" className="w-32 pb-4" />
          </Link>
          <p className="text-sm mb-3">
            Empowering businesses by streamlining employee management, workflow,
            and payroll.
          </p>

          <div className="flex gap-4 mt-4 text-gray-600 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-700"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/" className="hover:underline">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="hover:underline">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact-us" className="hover:underline">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: junayedhossain603@gmail.com</li>
            <li>Phone: +880 1914 606 160</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className=" text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} WorkHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
