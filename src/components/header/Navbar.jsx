import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";

const Navbar = () => {
  const { user, logOutUser, loading, setLoading } = useAuth();
  const [active, setActive] = useState(false);
  const handleLogOut = () => {
    logOutUser()
      .then((res) => {
        setLoading(false);
        toast.success("Log Out Successfull");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Something Went Wrong");
      });
  };
  if (loading) {
    return <Loading />;
  }
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/all-features">All Features</NavLink>
      </li>
      <li>
        <NavLink to="/contact-us">Contact</NavLink>
      </li>
    </>
  );
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-[999] shadow">
      <nav className=" sm:px-8  navbar  max-w-[1850px] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="cursor-pointer text-black hover:text-secondary btn btn-ghost p-0 px-2 pr-5 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
            >
              {navItems}
            </ul>
          </div>
          <Link to="/" className="text-xl">
            <img src={logo} alt="" className="w-24 sm:w-32" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-black">{navItems}</ul>
        </div>
        {user?.email ? (
          <div className="navbar-end relative">
            <img
              src={user?.photoURL}
              alt=""
              className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full cursor-pointer"
              onClick={() => setActive(!active)}
            />
            {active && (
              <div className="absolute flex items-center justify-center flex-col gap-3 bg-white border border-gray-200 shadow-sm rounded-2xl top-[100%] right-8 p-6">
                <h1 className="text-black">{user?.displayName}</h1>
                <button
                  className="btn btn-primary btn-sm sm:btn-md"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="navbar-end space-x-5">
            <Link
              to="/register"
              className="btn btn-primary btn-sm sm:btn-md hover:text-primary hover:bg-transparent hover:btn-outline"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="btn btn-primary btn-sm sm:btn-md btn-outline"
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
