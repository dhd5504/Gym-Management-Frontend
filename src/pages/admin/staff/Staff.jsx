import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { FiEdit, FiTrash2, FiMapPin, FiPhone } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import swal from "sweetalert";
import api from "../../../utils/api";
import { Pagination } from "antd";
import { debounce } from "lodash";
import SearchBox from "../../../components/admin/SearchBox";
import NotFound from "../../../components/admin/NotFound";

const Staff = () => {
  const [staffs, setStaffs] = useState([]);
  const [paginated, setPaginated] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [searchStaff, setSearchStaff] = useState([]);

  const avatars = [
    "https://img.freepik.com/free-photo/portrait-handsome-brunet-unshaven-adult-man-looks-with-calm-confident-expression-has-serious-look-wears-casual-jumper-poses-making-photo-against-white-background-being-hard-impress_273609-57668.jpg?w=996&t=st=1688304411~exp=1688305011~hmac=fd4d016bad5a8370a7180abe5a07ac41536549a1eb63129bed58f99b7187623a",
    "https://img.freepik.com/premium-photo/natural-portrait-women-positive-thinking-idea_705804-2550.jpg",
    "https://img.freepik.com/free-photo/confident-bearded-man-with-dark-hair-has-serious-facial-expression-thinks-about-future-job-dressed-fashionable-shirt_273609-17204.jpg?size=626&ext=jpg&ga=GA1.1.52234686.1688304003&semt=ais",
    "https://img.freepik.com/free-photo/curly-ethnic-woman-shows-manicured-yellow-nails-has-glad-expression-smiles-happily-glad-after-visiting-manicurist-wears-casual-orange-jumper-isolated-purple-wall-keeps-hands-raised_273609-42663.jpg?size=626&ext=jpg",
    "https://img.freepik.com/free-photo/image-smiling-young-office-lady-asian-business-entrepreneur-pointing-fingers-left-showing-client-info-chart-banner-aside-copy-space-white-background_1258-89369.jpg?size=626&ext=jpg&ga=GA1.1.52234686.1688304003&semt=ais",
    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
  ];

  const searchHandler = (e) => {
    const searchValue = e.target.value;
    const foundStaff = staffs.filter((staff) =>
      staff.name?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchStaff(foundStaff);
    if (foundStaff.length > 10) {
      setPaginated(foundStaff.slice(0, 10));
    } else {
      setPaginated(foundStaff);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchHandler = useCallback(debounce(searchHandler, 300), [
    staffs,
  ]);

  useEffect(() => {
    api
      .get("/api/v1/gymstaff")
      .then((res) => {
        if (res.status === 200) {
          setStaffs(res.data);
          setSearchStaff(res.data);
          if (res.data.length > 12) {
            setPaginated(res.data.slice(0, 12));
          } else {
            setPaginated(res.data);
          }
        }
      })
      .catch((error) => {});
  }, []);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    setPaginated(staffs.slice((page - 1) * 10, page * 10));
  };

  const handleDelete = (id, index) => {
    swal({
      title: "Are you sure?",
      text: "You can't undo this action",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`api/v1/gymstaff/delete?id=${id}`)
          .then((res) => {
            if (res.status === 200) {
              swal("Poof! Staff has been deleted!", {
                icon: "success",
              });
              const newStaffs = [...staffs];
              newStaffs.splice((currentPage - 1) * 12 + index, 1);
              setStaffs(newStaffs);
              setSearchStaff(newStaffs);
              if (newStaffs.length > 10) {
                setPaginated(
                  newStaffs.slice((currentPage - 1) * 12, currentPage * 12)
                );
              } else {
                setPaginated(newStaffs);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  return (
    <div className="w-full flex items-center">
      <div className="w-full bg-gray-100">
        <div className="flex items-center justify-between m-4 px-8 py-4 bg-white drop-shadow-lg">
          <h2 className="uppercase text-2xl tracking-widest font-semibold">
            Staff
          </h2>
          <div className="w-1/4">
            <SearchBox handleSearch={debounceSearchHandler} />
          </div>
          <Link to="create">
            <IoIosAddCircle
              size={40}
              className="text-green-500 hover:text-green-600 transfrom transition-all duration-200 active:text-green-1000 active:scale-19"
            />
          </Link>
        </div>
        <div className="px-[16px] mt-[20px]">
          <div className="overflow-auto">
            {paginated.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {paginated.map((staff, index) => (
                  <div
                    key={staff.id}
                    style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                    className="bg-white cursor-pointer hover:drop-shadow-md"
                  >
                    <div
                      className="flex flex-col items-center p-4"
                      onClick={() =>
                        navigate(`/admin/staff/${staff.id}/detail`)
                      }
                    >
                      <img
                        alt="avatar"
                        src={staff.id < 6 ? avatars[staff.id - 1] : avatars[5]}
                        className="object-cover object-center h-[100px] w-[100px] rounded-full"
                      ></img>
                      <div className="font-semibold text-lg">{staff.name}</div>
                      <div className="text-green-600 font-medium">
                        {staff.role ? staff.role : "Trainer"}
                      </div>
                    </div>
                    <div
                      className="px-4 pb-4"
                      style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
                    >
                      <div className="flex items-center gap-2 text-slate-600">
                        <FiPhone />
                        {staff.phoneNum}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 mt-1">
                        <FiMapPin />
                        {staff.address}
                      </div>
                    </div>
                    <div className="flex">
                      <Link
                        to={`/admin/staff/${staff.id}/update`}
                        className="flex items-center gap-1 justify-center w-full float-right text-blue-600 py-2 px-5 hover:text-blue-500"
                        style={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}
                      >
                        <FiEdit />
                        Edit
                      </Link>
                      <button
                        className="flex items-center gap-1 justify-center w-full float-right text-red-600 py-2 px-5 hover:text-red-500"
                        onClick={() => handleDelete(staff.id, index)}
                      >
                        <FiTrash2 />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {paginated.length === 0 && <NotFound />}
          </div>
          <div className="text-center py-4">
            {searchStaff.length > 12 && (
              <Pagination
                current={currentPage}
                total={Math.floor(staffs.length / 12 + 1) * 10}
                onChange={handleChangePage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;