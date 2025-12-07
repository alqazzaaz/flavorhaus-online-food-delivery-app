import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../Service/authService";
import ScrollReveal from "scrollreveal";
import { useTranslation } from "react-i18next";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [data, setData] = useState({
    name: "",
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
      const response = await registerUser(data);
      if (response.status === 201) {
        toast.success(t("messages.registerSuccess"));
        navigate("/login");
      } else {
        toast.error(t("messages.registerFailed"));
      }
    } catch (error) {
      toast.error(t("messages.registerFailed"));
    }
  };

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 1800,
      delay: 400,
    });

    sr.reveal(".container", {
      origin: "top",
    });
  }, []);

  return (
    <div className="container register-container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                {t("auth.registerTitle")}
              </h5>

              <form onSubmit={onSubmitHandler}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder={t("auth.name")}
                    name="name"
                    onChange={onChangeHandler}
                    value={data.name}
                    required
                  />
                  <label htmlFor="floatingName">
                    {t("auth.name")}
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder={t("auth.email")}
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    required
                  />
                  <label htmlFor="floatingInput">
                    {t("auth.email")}
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder={t("auth.password")}
                    name="password"
                    onChange={onChangeHandler}
                    value={data.password}
                    required
                  />
                  <label htmlFor="floatingPassword">
                    {t("auth.password")}
                  </label>
                </div>

                <div className="d-grid">
                  <button
                    className="btn btn-outline-primary btn-login text-uppercase"
                    type="submit"
                  >
                    {t("auth.registerSubmit")}
                  </button>

                  <button
                    className="btn btn-outline-danger btn-login text-uppercase mt-2"
                    type="reset"
                  >
                    {t("auth.reset")}
                  </button>
                </div>

                <div className="mt-4">
                  {t("auth.alreadyAccount")}{" "}
                  <Link to="/login">
                    {t("auth.loginLink")}
                  </Link>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;