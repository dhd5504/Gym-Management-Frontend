// components/forms/AddMemberForm.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";

const AddMemberForm = ({ setOpenModal, fetchData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [memberType, setMemberType] = useState("");
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

  const handleGenderChange = (e) => setGender(e.target.value);

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
      memberType,
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
        await fetchData?.();
        setOpenModal(false);
      } else {
        alert("Lưu thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-10 w-full h-full text-center p-16 p-12 bg-gray-700/[0.9]">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[70%] mx-auto p-8 shadow-xl rounded-xl px-24 relative"
      >
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-8 right-8 text-3xl bg-transparent text-main font-black cursor-pointer border-none"
        >
          X
        </button>
        <div className="w-100 h-20 text-4xl font-black text-center pt-8">
          Add member
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="w-50 text-3xl text-center pt-8">Information</div>
          <div className="w-50 text-3xl text-center pt-8">Account</div>
          <input
            name="name"
            placeholder="Name"
            className="w-full p-4 rounded-3xl border-2 border-slate-300"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            name="username"
            placeholder="Username"
            className="w-full p-4 rounded-3xl border-2 border-slate-300"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="job"
            placeholder="Job"
            className="w-full p-4 rounded-3xl border-2 border-slate-300"
            required
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-4 rounded-3xl border-2 border-slate-300"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="memberType"
            placeholder="Member type"
            className="w-full p-4 rounded-3xl border-2 border-slate-300"
            required
            value={memberType}
            onChange={(e) => setMemberType(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-4 rounded-3xl border-2 border-slate-300"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            className="w-full p-4 rounded-3xl border-2 border-slate-300"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            className="w-full p-4 rounded-3xl border-2 border-slate-300"
            required
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <div className="flex justify-around" onChange={handleGenderChange}>
            {["Male", "Female", "Others"].map((g) => (
              <label key={g} className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={handleGenderChange}
                />{" "}
                {g}
              </label>
            ))}
          </div>
          <div />
          <input
            id="birthday"
            readOnly
            value={birthday.toLocaleDateString()}
            onFocus={() => setShowCalendar(true)}
            className="p-4 rounded-3xl border-2 border-slate-300"
          />
          <div />
          {showCalendar && (
            <Calendar
              value={birthday}
              onChange={handleChangeDate}
              className="p-4 rounded-3xl border-2 border-slate-300"
            />
          )}
        </div>
        <button
          type="submit"
          className="mx-auto w-[30%] mt-6 h-16 font-black text-xl rounded-3xl border-2 border-slate-300 hover:bg-green-500 hover:text-white transition duration-100"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddMemberForm;