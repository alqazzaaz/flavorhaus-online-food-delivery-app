import React, { useContext, useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Service/authService";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import ScrollReveal from "scrollreveal";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { setToken, loadCartData } = useContext(StoreContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Backend erwartet email + password → NICHT emailNew!
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await login(data);

      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        await loadCartData(response.data.token);

        navigate("/");
        toast.success(t("loginNew.successNew"));
      } else {
        toast.error(t("loginNew.failedNew"));
      }
    } catch (error) {
      console.log("Login error:", error);
      toast.error(t("loginNew.failedNew"));
    }
  };

  useEffect(() => {
    ScrollReveal().reveal(".container", {
      origin: "top",
      distance: "60px",
      duration: 1800,
      delay: 400,
    });
  }, []);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                {t("loginNew.titleNew")}
              </h5>

              <form onSubmit={onSubmitHandler}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    required
                  />
                  <label htmlFor="floatingInput">
                    {t("loginNew.emailNew")}
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    onChange={onChangeHandler}
                    value={data.password}
                    required
                  />
                  <label htmlFor="floatingPassword">
                    {t("loginNew.passwordNew")}
                  </label>
                </div>

                <div className="d-grid">
                  <button
                    className="btn btn-outline-primary btn-login text-uppercase"
                    type="submit"
                  >
                    {t("loginNew.loginBtnNew")}
                  </button>

                  <button
                    className="btn btn-outline-danger btn-login text-uppercase mt-2"
                    type="reset"
                  >
                    {t("loginNew.resetBtnNew")}
                  </button>
                </div>

                <div className="mt-4">
                  {t("loginNew.noAccountNew")}{" "}
                  <Link to="/register">{t("loginNew.registerNew")}</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
