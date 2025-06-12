import React, { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChangeDate = (value) => {
    setBirthday(value);
    setShowCalendar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert("Password confirmation does not match");
      return;
    }

    const newMember = {
      name,
      email,
      job,
      phoneNumber,
      gender,
      birthday,
      age: new Date().getFullYear() - birthday.getFullYear(),
      user: {
        username,
        password,
        email,
      },
    };

    try {
      const response = await fetch("http://localhost:8080/api/members/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });

      if (response.ok) {
        swal({
          title: "Success!",
          text: "You have successfully registered!",
          icon: "success",
          timer: 2000,
          buttons: false,
        }).then(() => {
          navigate("/"); // quay lại trang login
        });
      } else {
        swal({
          title: "Registration failed",
          text: "Please try again later.",
          icon: "error",
          buttons: true,
        });
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[80%] max-w-4xl p-8 shadow-xl rounded-xl px-12"
      >
        <h2 className="text-4xl font-bold text-center mb-8">Register</h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="text-xl font-semibold col-span-2 text-center">
            Personal Info
          </div>

          <input
            name="name"
            placeholder="Name"
            className="p-4 rounded-3xl border-2 border-slate-300"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            name="job"
            placeholder="Job"
            className="p-4 rounded-3xl border-2 border-slate-300"
            required
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            className="p-4 rounded-3xl border-2 border-slate-300"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <input
            id="birthday"
            readOnly
            value={birthday.toLocaleDateString()}
            onFocus={() => setShowCalendar(true)}
            className="p-4 rounded-3xl border-2 border-slate-300"
          />
          {showCalendar && (
            <div className="col-span-2 flex justify-center">
              <Calendar value={birthday} onChange={handleChangeDate} />
            </div>
          )}

          <div
            className="flex justify-around"
            onChange={(e) => setGender(e.target.value)}
          >
            {["Male", "Female", "Others"].map((g) => (
              <label key={g} className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                />
                {g}
              </label>
            ))}
          </div>

          <div className="text-xl font-semibold col-span-2 text-center mt-6">
            Account Info
          </div>

          <input
            name="username"
            placeholder="Username"
            className="p-4 rounded-3xl border-2 border-slate-300"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-4 rounded-3xl border-2 border-slate-300"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-4 rounded-3xl border-2 border-slate-300"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            className="p-4 rounded-3xl border-2 border-slate-300"
            required
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-center mt-10 gap-4">
          <button
            type="submit"
            className="w-[50%] h-14 text-lg font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-3xl transition duration-200"
          >
            Register
          </button>

          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
