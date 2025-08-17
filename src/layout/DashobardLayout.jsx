import { Outlet, Link, NavLink } from "react-router";
import { FiMenu } from "react-icons/fi";
import logo from "../assets/logo.png";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "../components/loading/Loading";
import Toggle from "../components/toggle/Toggle";
const DashboardLayout = () => {
  const { role } = useUserRole();
  const { user, logOutUser, loading } = useAuth();

  const handleLogOut = () => {
    logOutUser()
      .then((res) => toast.success("Logout Successfull"))
      .catch((err) => toast.error(err));
  };
  const listItems = (
    <>
      {role === "employee" ? (
        <>
          <li>
            <NavLink to="/dashboard" end>
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/work-sheet" end>
              Work Sheet
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/payment-history" end>
              Payment History
            </NavLink>
          </li>
        </>
      ) : role === "hr" ? (
        <>
          <li>
            <NavLink to="/dashboard" end>
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/employee-list" end>
              Employee List
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/progress" end>
              Progress
            </NavLink>
          </li>
        </>
      ) : role === "admin" ? (
        <>
          <li>
            <NavLink to="/dashboard" end>
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-employee-list" end>
              All Employee List
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/payroll" end>
              Payroll
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/messages" end>
              Messages
            </NavLink>
          </li>
        </>
      ) : (
        <></>
      )}
    </>
  );
  if (loading) return <Loading />;
  return (
    <aside className="min-h-screen flex">
      <div className="drawer lg:hidden">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar bg-white px-4">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost lg:hidden group"
            >
              <FiMenu className="text-xl text-black group-hover:text-secondary" />
            </label>
            <Link to="/" className="text-xl">
              <img src={logo} alt="" className="w-24" />
            </Link>
          </div>
          <div className="p-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side z-40">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 min-h-full bg-white text-black ">
            <Link to="/">
              <img src={logo} alt="" className="w-24 pb-6" />
            </Link>
            <div className="flex flex-col gap-2 py-6">
              <img
                src={user?.photoURL}
                alt=""
                className="h-20 w-20 object-cover mx-auto rounded-full"
              />
              <h1 className="text-center font-semibold text-2xl text-primary">
                {user?.displayName}
              </h1>
              <p className="text-center capitalize pb-3 font-bold">
                ( {role} )
              </p>
              <button
                className="btn btn-primary btn-sm hover:btn-outline hover:bg-transparent hover:text-primary"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
            {listItems}
          </ul>
        </div>
      </div>

      <div className="hidden lg:flex w-64 bg-white text-black flex-col p-4">
        <Link to="/" className="text-xl">
          <img src={logo} alt="" className="w-32 pb-6" />
        </Link>
        <div className="flex flex-col gap-2 py-6">
          <img
            src={user?.photoURL}
            alt=""
            className="h-20 w-20 object-cover mx-auto rounded-full"
          />
          <h1 className="text-center font-semibold text-2xl text-primary">
            {user?.displayName}
          </h1>
          <p className="text-center capitalize pb-3 font-bold">( {role} )</p>
          <button
            className="btn btn-primary btn-sm hover:btn-outline hover:bg-transparent hover:text-primary"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
        <ul className="menu space-y-1">{listItems}</ul>
      </div>

      <div className="flex-1 hidden lg:block p-6">
        <Outlet />
      </div>
      <Toggle />
    </aside>
  );
};

export default DashboardLayout;
