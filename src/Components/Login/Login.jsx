import "./Login.css";
import { useEffect, useState } from "react";
import Select from "./Select";
import { useNavigate } from "react-router-dom";

function LogInForm() {
  const [handleUpdate, setHandleUpdate] = useState(true);

  const navigate = useNavigate();
  let accountInitialValues = {
    login: {
      view: "login",
    },
    signup: {
      view: "signup",
    },
  };
  const [account, toggleAccount] = useState(accountInitialValues.login);

  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const [storeData, setStoreData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      data.username !== "" &&
      data.email !== "" &&
      data.phone !== "" &&
      data.password !== ""
    ) {
      data["interest"] = value;
      setStoreData((pre) => {
        return [...pre, data];
      });
    }

    setData({
      username: "",
      email: "",
      phone: "",
      password: "",
    });

    setHandleUpdate(!handleUpdate);
  };

  const [len, setlength] = useState(storeData?.length);
  useEffect(() => {
    addStorage();
  }, [handleUpdate, len]);

  //   handlelocalStorage
  const addStorage = () => {
    if (storeData.length !== 0) {
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

  const handleSignup = () => {
    toggleAccount(accountInitialValues.signup);
  };
  const handlelogin = () => {
    toggleAccount(accountInitialValues.login);
  };

  //Login functions

  const [loginstate, setLoginState] = useState({
    username: "",
    password: "",
  });

  const loginfunction = (e) => {
    const { name, value } = e.target;
    setLoginState((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const loginUser = (e) => {
    e.preventDefault();
    if (loginstate.username !== "" || loginstate.password !== "") {
      let getData = JSON.parse(localStorage.getItem("userdata"));
      getData.forEach((item, id) => {
        if (
          item.username === loginstate.username &&
          item.password === loginstate.password
        ) {
          localStorage.setItem("loginUser", JSON.stringify({ ...item, id }));
          navigate("/dashboard");
        }
      });
    }
  };

  return (
    <>
      {account.view === "login" ? (
        <div class="log">
          <h2>Welcome Back</h2>
          <form onSubmit={loginUser}>
            <div class="input-cont">
              <input
                type="text"
                name="username"
                value={loginstate.username}
                onChange={loginfunction}
              />
              <label>Username</label>
              <div class="border1"></div>
            </div>
            <div class="input-cont">
              <input
                type={"password"}
                name="password"
                value={loginstate.password}
                onChange={loginfunction}
              />
              <label>Password</label>
              <div class="border2"></div>
            </div>
            <input type="submit" value="Sign In" />
            <p
              className="signup_btn"
              onClick={() => {
                handleSignup();
              }}
            >
              signup
            </p>
          </form>
        </div>
      ) : (
        <div class="log">
          <h2>Welcome Back</h2>
          <form onSubmit={handleSubmit}>
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
            <input type="submit" value="Sign Up" />
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
      )}
    </>
  );
}

export default LogInForm;
