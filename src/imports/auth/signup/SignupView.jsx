import React, { useState } from "react";
import { useAuthStore } from "@/zustand/useAuthStore";
import { HiOutlineShoppingCart, HiOutlineArrowsRightLeft, HiOutlineMapPin } from "react-icons/hi2";
import css from "../auth-modal.module.css";
import { useSignup } from "../hooks/useAuth.hook";

const RegisterView = () => {
      const { mutate: signup, isPending } = useSignup();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });
  const setAuthView = useAuthStore((s) => s.setAuthView);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData); 
  };
  return (
    <div className={css.formWrapper}>
      <h1 className={css.title}>Register</h1>
      <p className={css.subtitle}>Create an account to get exclusive benefits.</p>

      <ul className={css.benefitsList}>
        <li><HiOutlineShoppingCart /> Faster checkout</li>
        <li><HiOutlineArrowsRightLeft /> Easier returns and exchanges</li>
        <li><HiOutlineMapPin /> Quick order information and tracking</li>
      </ul>

      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.inputGroup}>
          <label>Full Name *</label>
          <input type="text" placeholder="Your full name" required  onChange={(e) => setFormData({...formData, name: e.target.value})}  />
        </div>

        <div className={css.inputGroup}>
          <label>Email Address *</label>
          <input type="email" placeholder="Your email name" required  onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>

        <div className={css.inputGroup}>
          <label>Mobile Number *</label>
          <div className={css.mobileInput}>
            <span>+91</span>
            <input type="tel" placeholder="Mobile Number" required   onChange={(e) => setFormData({...formData, mobile: e.target.value})}  />
          </div>
        </div>

        <div className={css.inputGroup}>
          <label>Password *</label>
          <div className={css.passwordInput}>
            <input type={showPassword ? "text" : "password"} placeholder="Enter your password" required   onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className={css.checkboxGroup}>
          <input type="checkbox" id="news" />
          <label htmlFor="news">I'd like to receive the latest news and promotions.</label>
        </div>

        <button type="submit" className={css.primaryButton} disabled={isPending}>{isPending ? "Creating Account..." : "Create An Account"}</button>
      </form>

      <p className={css.footerText}>
        Already have an account? <button onClick={() => setAuthView("login")}>Log In</button>
      </p>
    </div>
  );
};

export default RegisterView;
