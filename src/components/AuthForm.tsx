"use client";

import { RootState } from "@/store";
import { useLoginMutation, useSignupMutation } from "@/store/services/userApi";
import { setAuthStatus } from "@/store/slices/appSlice";
import { extractErrorMessage } from "@/utils/error";
import * as Dialog from "@radix-ui/react-dialog";
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthSocialForms } from ".";
import Button from "./Button";
import Heading from "./Heading";

const TextInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) => (
  <div>
    <label className="block text-body-2 font-medium text-color-black mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 border border-color-gray-50 rounded-lg
        focus:ring-2 focus:ring-color-primary focus:border-color-primary
        outline-none transition-colors placeholder-gray-400 h-14 text-base"
    />
  </div>
);

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  showPassword,
  toggleShowPassword,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  placeholder?: string;
  required?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [showPassword]);

  return (
    <div>
      <label className="block text-body-2 font-medium text-color-black mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 pr-12 border border-color-gray-50 rounded-lg
            focus:ring-2 focus:ring-color-primary focus:border-color-primary
            outline-none transition-colors placeholder-gray-400 h-14 text-base"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};

const LoginForm = ({
  onSwitchToRegister,
}: {
  onSwitchToRegister: () => void;
}) => {
  const dispatch = useDispatch();
  const [login, { isLoading, error, data }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (data) {
        dispatch(setAuthStatus("authenticated"));
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 relative space-y-6"
      >
        <Heading
          as="h2"
          size="h2"
          className="text-center text-color-black!"
          weight="medium"
        >
          Login
        </Heading>

        <TextInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword((v) => !v)}
          placeholder="Enter your password"
          required
        />

        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-orange-600 border-color-gray-50 rounded focus:ring-color-primary"
            />
            <span className="ml-2 text-sm text-gray-700">Remember me</span>
          </label>

          <button
            type="button"
            className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
          >
            Forgot Password
          </button>
        </div>

        <Button className="w-full" type="submit">
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        {error && (
          <p className="text-red-600 text-center">
            {extractErrorMessage(error)}
          </p>
        )}
        <AuthSocialForms variant="login" />

        <p className="mt-8 text-center text-sm text-gray-600">
          <span className="font-rubik font-medium">
            Don&apos;t have an account?
          </span>{" "}
          <Button
            type="button"
            onClick={onSwitchToRegister}
            tone="link"
            className="px-0!"
          >
            Sign up
          </Button>
        </p>
      </form>
    </>
  );
};

const RegisterForm = ({ onSwitchToLogin }: { onSwitchToLogin: () => void }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [signup, { isLoading, error }] = useSignupMutation();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      }).unwrap();
      dispatch(setAuthStatus("unauthenticated"));
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 relative space-y-6"
    >
      <Heading
        as="h2"
        size="h2"
        className="text-center text-color-black!"
        weight="medium"
      >
        Register
      </Heading>
      <TextInput
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Enter your full name"
        required
      />
      <TextInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />
      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        showPassword={showPassword}
        toggleShowPassword={() => setShowPassword((v) => !v)}
        placeholder="Enter your password"
        required
      />
      <Button className="w-full" type="submit">
        {isLoading ? "Registering..." : "Register"}
      </Button>
      {error && <p className="text-red-500">{extractErrorMessage(error)}</p>}

      <AuthSocialForms variant="signup" />
      <p className="mt-8 text-center text-sm text-gray-600">
        <span className="font-rubik font-medium">Already have an account?</span>{" "}
        <Button
          type="button"
          onClick={onSwitchToLogin}
          tone="link"
          className="px-0!"
        >
          Log in
        </Button>
      </p>
    </form>
  );
};

export default function AuthForms() {
  const [activeForm, setActiveForm] = useState<"login" | "register">("login");
  const authForm = useSelector((state: RootState) => state.app.auth);
  const dispatch = useDispatch();

  return (
    <Dialog.Root
      open={authForm === "authForm"}
      onOpenChange={(open) => {
        if (!open) {
          dispatch(setAuthStatus("unauthenticated"));
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/30 fixed inset-0 grid place-items-center" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[32rem] p-4 rounded-lg z-[9000009]">
          <Dialog.Title className="absolute -left-[9999px] opacity-0">
            Auth form
          </Dialog.Title>
          {activeForm === "login" ? (
            <LoginForm onSwitchToRegister={() => setActiveForm("register")} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setActiveForm("login")} />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
