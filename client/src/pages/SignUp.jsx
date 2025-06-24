import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  IconButton,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signUp } from "../apis/userAPI";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";

const SignUp = () => {
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleSignUp = async (data) => {
    // console.log(data);
    await signUp(data, navigate, setUser);
  };

  return (
    <div>
      <Container
        component={"main"}
        maxWidth={"xs"}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            height: "80%",
            overflow: "auto",
          }}
        >
          <Typography variant="h5">Sign Up</Typography>
          <form
            style={{
              marginTop: "1rem",
              width: "100%",
            }}
            onSubmit={handleSubmit(handleSignUp)}
          >
            {/* username field */}
            <InputLabel htmlFor="username">Username</InputLabel>
            <TextField
              id="username"
              margin="dense"
              fullWidth
              variant="outlined"
              {...register("username", {
                required: "UserName is required",
                validate: (value) =>
                  value.length >= 10 && value.length <= 20
                    ? true
                    : "Username should be between 10 and 20 characters",
              })}
              helperText={errors.username?.message}
              error={!!errors.username}
              aria-invalid={!!errors.username}
            />

            {/* email field */}
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextField
              id="email"
              type="email"
              margin="dense"
              fullWidth
              variant="outlined"
              {...register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              helperText={errors.email?.message}
              error={!!errors.email}
              aria-invalid={!!errors.email}
            />

            {/* password field */}
            <InputLabel htmlFor="password">Password</InputLabel>
            <TextField
              id="password"
              margin="dense"
              fullWidth
              variant="outlined"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,15}$/,
                  message:
                    "Password must be between 8 and 15 characters and include uppercase, lowercase, number, and special character",
                },
              })}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                },
              }}
              helperText={errors.password?.message}
              error={!!errors.password}
              aria-invalid={!!errors.password}
            />

            {/* confirm password field */}
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <TextField
              id="confirmPassword"
              margin="dense"
              fullWidth
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                },
              }}
              helperText={errors.confirmPassword?.message}
              error={!!errors.confirmPassword}
              aria-invalid={!!errors.confirmPassword}
            />

            {/* Buttons */}
            <Button
              variant="contained"
              sx={{
                marginTop: "0.5rem",
              }}
              fullWidth
              type="submit"
            >
              SignUp
            </Button>
            <Typography textAlign={"center"} m={"0.5rem"}>
              Or
            </Typography>
            <Button fullWidth variant="outlined" href="/login">
              Login Instead
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUp;
