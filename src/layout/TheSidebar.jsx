import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { MdAddCircle, MdUpdate, MdViewList } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const { pathname } = useLocation();
  const role = pathname.split("/")[1];

  const adminManagement = ["gym", "membership", "facility", "staff", "member"];
  const staffManagement = ["member", "membership", "feedback"];
  const trainerManagement = ["member", "feedback"];
  const memberManagement = [
    "feedback",
    "history",
    "info",
    "membership",
    "registration",
  ];
  const management = {
    adminManagement,
    staffManagement,
    trainerManagement,
    memberManagement,
  };

  return (
    <div className="flex flex-col h-full px-6">
      <div className="flex flex-col items-center justify-center mt-8 mb-12">
        <span className="block text-6xl text-white">
          <AiFillDashboard />
        </span>
        <h1 className="text-3xl font-extrabold tracking-wider text-center uppercase">
          <span className="text-primary">
            Gym <br></br> Management{" "}
          </span>
        </h1>
      </div>
      <div className="flex flex-col space-y-3 text-lg font-semibold tracking-wider text-black">
        {role === "admin" && (
          <Link to="/admin" className="pb-3 border-b-2 border-gray-200">
            <span className="inline-flex mr-3 text-primary">
              <AiFillDashboard />
            </span>
            Dashboard
          </Link>
        )}
        {management[`${role}Management`]?.map((subject) => (
          <Link
            key={subject} // Thêm key ở đây
            to={`/${role}/${subject}`}
            className="pb-3 border-b-2 border-gray-200"
          >
            <span className="inline-flex mr-3 text-primary">
              <MdViewList />
            </span>
            {`${subject.slice(0, 1).toUpperCase() + subject.slice(1)}`}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TheSidebar;
