import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import AdminIcon from "../../assets/admin.png";
import { logout } from "../../store/actions/auth-actions";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  const logoutUser = async () => {
    await dispatch(logout(token));
    navigate("/");
  };

  return (
    <div className="w-full h-[60px] shadow-md bg-white sticky top-0 z-10">
      <div className="flex items-center justify-between w-full h-full px-10 mb-8">
        <div className="flex items-center space-x-2">
          <img src={AdminIcon} alt="admin icon" />
          <h3 className="font-semibold capitalize text-blue-900">{role}</h3>
        </div>
        <div className="ml-auto">
          <button
            className="px-3 py-2 font-semibold text-black bg-red-600 rounded-lg shadow-lg flex items-center"
            onClick={logoutUser}
          >
            <span className="inline-flex mr-3 font-bold">
              <BiLogOutCircle />
            </span>
            logout
          </button>
        </div>
        {/* <ul>
                <li>
                    <Link to='/admin/dashboard/main'>Test</Link>
                </li>
            </ul> */}
      </div>
    </div>
  );
};

export default DashboardNavbar;
