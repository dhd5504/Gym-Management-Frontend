import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HiChevronDoubleLeft } from "react-icons/hi";
import api from "../../../utils/api";
import swal from "sweetalert";
import { HiPencilSquare } from "react-icons/hi2";

const GymDetail = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [members, setMembers] = useState([]);
  const [gym, setGym] = useState({});
  const [facilities, setFacilities] = useState([]);

  const headerCells = ["Thumbnail", "Name", "Quantity", "Warranty Date"];

  useEffect(() => {
    api
      .get("/api/v1/gymstaff")
      .then((res) => {
        if (res.status === 200) {
          setMembers(res.data);
        }
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    api
      .get(`/api/v1/classManager/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setGym(res.data[0]);
        }
      })
      .catch((error) => {});
    api.get(`/api/gymhasfacility/getclass?gym=${id}`).then((res) => {
      if (res.status === 200) {
        const newFormat = res.data.map((item) => ({
          ...item.facility,
          quantity: item.quantity,
        }));
        setFacilities(newFormat);
      }
    });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      id: gym.yogaClass?.id ?? "",
      name: gym.yogaClass?.name ?? "",
      maximumNumber: gym.yogaClass?.maximumNumber ?? 0,
      location: gym.yogaClass?.location ?? "",
      employee: gym.gymStaff?.id ?? "",
      occupied: gym.yogaClass?.occupied ?? false,
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      maximumNumber: Yup.number().required("Required"),
      occupied: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      employee: Yup.string().required("Required"),
    }),
    enableReinitialize: true,

    onSubmit: async (values) => {
      const data = { ...values, employee: { id: values.employee } };
      api.put(`/api/v1/yogaclass/update?id=${id}`, data).then((res) => {
        if (res.status === 200) {
          swal({
            title: "Success!",
            timer: 2000,
            text: "Gym created successfully!",
            icon: "success",
            buttons: false,
          }).then(() => {
            navigate("/admin/gym");
          });
        }
      });
    },
  });

  return (
    <div className="w-full flex h-full">
      <div className="w-full bg-gray-100">
        <div className="px-[50px] mt-[20px]">
          <div>
            <div className="mx-4">
              <button
                className="px-4 text-lg uppercase tracking-widest bg-secondary-100rounded-lg drop-shadow-lg"
                onClick={() => navigate("/admin/gym")}
              >
                <span className="mr-2 inline-block">
                  {<HiChevronDoubleLeft />}
                </span>
                Back to gyms
              </button>
            </div>
            <div className="flex py-2 px-[200px] mt-2 bg-white shadow-lg max-h-[80vh] overflow-y-auto">
              <div className="w-full flex flex-col">
                <Link to={`/admin/gym/${id}/update`}>
                  <button className="flex items-center  gap-1 float-right bg-blue-600 text-white py-2 px-3 rounded-md mt-5 hover:bg-blue-500">
                    <HiPencilSquare />
                    Edit
                  </button>
                </Link>
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 pb-4">
                    {/* type input */}
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="id"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        ID
                      </label>
                      <input
                        disabled
                        type="text"
                        name="id"
                        id="id"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.id}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-100"
                      ></input>
                      {formik.touched.id && formik.errors.id && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.id}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        disabled
                        type="text"
                        name="name"
                        id="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className="disabled:bg-slate-100 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></input>
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="employee"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Staff
                      </label>
                      <select
                        disabled
                        id="employee"
                        name="employee"
                        onChange={formik.handleChange}
                        value={formik.values.employee}
                        onBlur={formik.handleBlur}
                        className="disabled:bg-slate-100 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option>Select employee</option>
                        {members.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.employee && formik.errors.employee && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.employee}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="maximumNumber"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Maximum Number
                      </label>
                      <input
                        disabled
                        type="number"
                        name="maximumNumber"
                        id="maximumNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maximumNumber}
                        className="disabled:bg-slate-100 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></input>
                      {formik.touched.maximumNumber &&
                        formik.errors.maximumNumber && (
                          <p className="text-xs font-semibold text-red-500">
                            {formik.errors.maximumNumber}
                          </p>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="location"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Location
                      </label>
                      <input
                        disabled
                        type="text"
                        name="location"
                        id="location"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.location}
                        className="disabled:bg-slate-100 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></input>
                      {formik.touched.location && formik.errors.location && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.location}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="isOccupied"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Occupied
                      </label>
                      <select
                        disabled
                        id="occupied"
                        name="occupied  "
                        onChange={formik.handleChange}
                        value={formik.values.occupied}
                        onBlur={formik.handleBlur}
                        className="disabled:bg-slate-100 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option>Select occupied</option>
                        <option value={true}>Occupied</option>
                        <option value={false}>No Occupied</option>
                      </select>
                      {formik.touched.occupied && formik.errors.occupied && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.occupied}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
                <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  Facilities
                </label>
                <table>
                  <thead>
                    <tr className="bg-slate-100">
                      {headerCells.map((headerCell, index) => (
                        <th
                          key={index}
                          className="text-sm font-medium text-gray-500 text-left"
                        >
                          <div className="p-2">{headerCell}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {facilities.map((falility, index) => (
                      <tr key={index}>
                        <td className="p-2">
                          <img
                            src="https://blog.nasm.org/hubfs/cleangym%20%281%29.jpg"
                            alt="gym-img"
                            className="w-[50px] max-w-[50px] h-auto rounded-md"
                          />
                        </td>
                        <td className="font-medium p-2">
                          <div className="py-4">{falility.facilityName}</div>
                        </td>
                        <td className="p-2">{falility.quantity}</td>
                        <td className="p-2">
                          {falility.warrantyDate.slice(0, 10)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymDetail;