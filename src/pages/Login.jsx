import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

import { MdEmail } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/auth-actions";
import { useNavigate } from "react-router-dom";
import TheSpinner from "../layout/TheSpinner";
import api from "../utils/api";
import bgGym from "../assets/bg_gym.jpg";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (role) navigate(role);
  }, [role]);
  const loading = useSelector((state) => state.ui.loginLoading);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(login(values));
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgGym})`, // ← Dùng biến bgGym
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Overlay nền mờ */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      {/* Form login nổi lên trên */}
      <div className="w-[320px] sm:w-[400px] bg-sky-50 rounded shadow-xl border-2 border-solid px-4 sm:px-8 py-20 mx-auto relative z-10">
        <h2 className="mb-12 text-3xl font-bold tracking-wider drop-shadow-lg text-center uppercase select-none text-blue-900">
          <span className="text-primary">Gym </span>
          <span className="text-secondary-200">Management</span>
        </h2>
        {loading ? (
          <TheSpinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-4 space-y-1">
              <label
                htmlFor="username"
                className="font-semibold tracking-wider text-blue-900"
              >
                Username
              </label>
              <div className="flex py-1">
                <span className="flex items-center justify-center px-3 py-2 text-black bg-gray-300 border border-r-0 border-gray-300">
                  <MdEmail />
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className="w-full rounded-r form-input pl-2 bg-white focus:bg-gray-50"
                  placeholder="example@domain.com"
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="text-xs font-semibold text-red-600">
                  {formik.errors.username}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-4 space-y-1">
              <label
                htmlFor="password"
                className="font-semibold tracking-wider text-blue-900"
              >
                Password
              </label>
              <div className="flex py-1">
                <span className="flex items-center justify-center px-3 py-2 text-black bg-gray-300 border border-r-0 border-gray-300">
                  <RiLockPasswordFill />
                </span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full rounded-r pl-2 bg-white focus:bg-gray-50"
                  placeholder="********"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-600">{formik.errors.password}</p>
              )}
            </div>
            <hr />
            <button
              type="submit"
              className="block px-4 py-2 mt-3 ml-auto border rounded-md text-primary border-primary hover:text-white hover:bg-blue-900 font-semibold transition duration-200 ease-in-out"
            >
              <span className="inline-flex mr-1 justify-items-center">
                <FiLogIn />{" "}
              </span>
              Login
            </button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-gray-500">
          Not registered?{" "}
          <Link to="/register" className="text-blue-900 font-semibold">
            Create an account
          </Link>{" "}
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
