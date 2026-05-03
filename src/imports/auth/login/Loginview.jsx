import React, { useState } from "react";
import { useAuthStore } from "@/zustand/useAuthStore";
import css from "../auth-modal.module.css";
import { useLogin } from "../hooks/useAuth.hook";

const LoginView = () => {
  const setAuthView = useAuthStore((s) => s.setAuthView);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("password");
  
  const { mutate: login, isPending } = useLogin();
  
  // 1. These state variables need to be updated by the inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { email, password }); // For debugging
    login({ email, password });
  };

  return (
    <div className={css.formWrapper}>
      <h1 className={css.title}>Log In</h1>

      <div className={css.radioGroup}>
        {/* Radio buttons (same as before) */}
      </div>

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.inputGroup}>
          <label>Email Address *</label>
          <input 
            type="email" 
            placeholder="Your email address" 
            required 
            value={email} // <-- CONNECTED
            onChange={(e) => setEmail(e.target.value)} // <-- UPDATES STATE
          />
        </div>

        {loginMethod === "password" ? (
          <div className={css.inputGroup}>
            <label>Password *</label>
            <div className={css.passwordInput}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                required 
                value={password} // <-- CONNECTED
                onChange={(e) => setPassword(e.target.value)} // <-- UPDATES STATE
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button type="button" className={css.forgotBtn}>Forgot Password?</button>
          </div>
        ) : (
          <div className={css.otpInfo}>
            <p>An OTP will be sent to your registered email address.</p>
          </div>
        )}

        <p className={css.termsText}>
          By logging in, you agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>
        </p>

        <button type="submit" className={css.primaryButton} disabled={isPending}>
          {isPending ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className={css.footerText}>
        New to Under Armour? <button onClick={() => setAuthView("register")}>Register</button>
      </p>
    </div>
  );
};

export default LoginView;
