import React, { useState } from "react";
import Calendar from "react-calendar";

const UpdateMemberForm = ({
  member,
  setOpenModal,
  setUpdatedMemberId,
  fetchData,
}) => {
  const [name, setName] = useState(member?.name || "");
  const [email, setEmail] = useState(member?.email || "");
  const [job, setJob] = useState(member?.job || "");
  const [memberType, setMemberType] = useState(member?.memberType || "");
  const [phoneNumber, setPhoneNumber] = useState(member?.phoneNumber || "");
  const [gender, setGender] = useState(member?.gender || "");
  const [birthday, setBirthday] = useState(
    member?.birthday ? new Date(member.birthday) : new Date()
  );
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChangeDate = (value) => {
    setBirthday(value);
    setShowCalendar(false);
  };

  const handleGenderChange = (e) => setGender(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedMember = {
      memberId: member.memberId,
      name,
      email,
      job,
      memberType,
      phoneNumber,
      gender,
      birthday,
      age: new Date().getFullYear() - birthday.getFullYear(),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/members/${member.memberId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedMember),
        }
      );

      if (response.ok) {
        await fetchData?.();
        setOpenModal(false);
        setUpdatedMemberId(0);
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
        className="flex flex-col gap-4 bg-white w-[50%] mx-auto p-8 shadow-xl rounded-xl px-24 relative"
      >
        <button
          onClick={() => {
            setOpenModal(false);
            setUpdatedMemberId(0);
          }}
          className="absolute top-8 right-8 text-3xl bg-transparent text-main font-black cursor-pointer border-none"
        >
          X
        </button>
        <div className="w-100 h-20 text-4xl font-black text-center pt-8">
          Update member
        </div>
        <input
          name="name"
          placeholder="Name"
          className="w-full p-4 rounded-3xl border-2 border-slate-300"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          name="job"
          placeholder="Job"
          className="w-full p-4 rounded-3xl border-2 border-slate-300"
          required
          value={job}
          onChange={(e) => setJob(e.target.value)}
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
          name="phone"
          placeholder="Phone Number"
          className="w-full p-4 rounded-3xl border-2 border-slate-300"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
        <label htmlFor="birthday">Birthday</label>
        <input
          id="birthday"
          readOnly
          value={birthday.toLocaleDateString()}
          onFocus={() => setShowCalendar(true)}
          className="p-4 rounded-3xl border-2 border-slate-300"
        />
        {showCalendar && (
          <Calendar
            value={birthday}
            onChange={handleChangeDate}
            className="p-4 rounded-3xl border-2 border-slate-300"
          />
        )}
        <button
          type="submit"
          className="mx-auto w-[30%] h-16 font-black text-xl rounded-3xl border-2 border-slate-300 hover:bg-green-500 hover:text-white transition duration-100"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateMemberForm;
