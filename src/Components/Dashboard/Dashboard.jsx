import "../Login/Login.css";
import { useEffect, useState } from "react";
import Select from "../Login/Select";
import { useNavigate } from "react-router-dom";

// { loginUserData }
function Dashboard() {
  const navigate = useNavigate();
  const [handleUpdate, setHandleUpdate] = useState(true);

  //   loginUserData
  let loginUserData = JSON.parse(localStorage.getItem("loginUser"));
  const [data, setData] = useState(loginUserData);

  useEffect(() => {
    setData(loginUserData);
  }, []);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  let getData = JSON.parse(localStorage.getItem("userdata"));

  const [storeData, setStoreData] = useState(getData);

  const updateprefrence = async (e) => {
    e.preventDefault();
    if (
      data.username !== "" &&
      data.email !== "" &&
      data.phone !== "" &&
      data.password !== ""
    ) {
      data["interest"] = value;
      let update = storeData.map((item, id) => {
        return loginUserData.username === item.username ? data : item;
      });
      setStoreData(update);
      localStorage.setItem("loginUser", JSON.stringify({ ...data }));

      setHandleUpdate(!handleUpdate);
    }
  };

  useEffect(() => {
    addStorage();
  }, [handleUpdate]);

  //   handlelocalStorage
  const addStorage = () => {
    if (storeData.length) {
      localStorage.setItem(`userdata`, JSON.stringify(storeData));
    }
  };

  //   select options
  const options = [
    { label: "Job", value: "Job" },
    { label: "Trainee", value: "Trainee" },
    { label: "Internship", value: "Internship" },
  ];
  const [value, setValue] = useState("Job");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handlelogin = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.setItem(
      "loginUser",
      JSON.stringify({
        username: "",
        email: "",
        phone: "",
        password: "",
      })
    );
    navigate("/");
  };

  return (
    <>
      <div class="log">
        <div className="log_out">
          <h2>Dashboard Page</h2>
          <h2 onClick={() => handleLogout()}>Logout</h2>
        </div>
        <form onSubmit={updateprefrence}>
          <div class="input-cont">
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleOnchange}
            />
            <label>Username</label>
            <div class="border1"></div>
          </div>
          <div class="input-cont">
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleOnchange}
            />
            <label>Email</label>
            <div class="border1"></div>
          </div>
          <div class="input-cont">
            <input
              type="text"
              name="phone"
              maxLength={10}
              value={data.phone}
              onChange={handleOnchange}
            />
            <label>Phone</label>
            <div class="border1"></div>
          </div>
          <div class="input-cont">
            <input
              type={"password"}
              name="password"
              value={data.password}
              onChange={handleOnchange}
            />
            <label>Password</label>
            <div class="border2"></div>
          </div>
          <div class="input-cont">
            <Select
              label="Interest In"
              options={options}
              value={value}
              onChange={handleChange}
            />
            <div class="border2"></div>
          </div>
          <input type="submit" value="Update Prefrence" />
          <p
            className="signup_btn"
            onClick={() => {
              handlelogin();
            }}
          >
            login
          </p>
        </form>
      </div>
    </>
  );
}

export default Dashboard;
