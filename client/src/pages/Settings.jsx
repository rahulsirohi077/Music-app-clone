import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  InputLabel,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CameraAlt, Visibility, VisibilityOff } from "@mui/icons-material";
import { signUp, updateInfo } from "../apis/userAPI";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import AppLayout from "../components/layout/AppLayout";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { grey } from "@mui/material/colors";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Settings = () => {
  //   const { setUser } = useContext(UserContext);
  //   const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleModification = async (data) => {
    const formData = new FormData();

    const file = data.file[0];
    formData.append("profilePic", file);
    formData.append("username", data.username);
    formData.append("password", data.password);
    // for( let [key,value] of formData.entries()){
    //   console.log(key+" : "+value);
    // }
    await updateInfo(formData);
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
            gap: 2,
            padding: 3,
            height: "90%",
            overflow: "auto",
            backgroundColor: grey[800],
            color: "#ececee",
          }}
        >
          <Typography variant="h5">Modify Information</Typography>
          <form
            style={{
              marginTop: "1rem",
              width: "100%",
              color: "#ececee",
              gap: 1,
            }}
            enctype="multipart/form-data"
            onSubmit={handleSubmit(handleModification)}
          >
            {/* Profile Pic */}
            <Stack
              width={"100%"}
              direction={"column"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
              marginBottom={2}
            >
              <Avatar
                alt="Uploaded Preview"
                src={selectedImage}
                sx={{
                  width: "8rem",
                  height: "8rem",
                  objectFit: "contain",
                }}
              />

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                  height: "auto",
                  minHeight: 0,
                  width: "auto",
                  minWidth: 0,
                  paddingY: 1,
                  alignSelf: "center", // prevents stretching in flex row
                  flex: "0 0 auto", // do not grow or shrink
                }}
              >
                Upload Profile Pic
                <VisuallyHiddenInput
                  type="file"
                  {...register("file")}
                  onChange={handleFileChange}
                />
              </Button>
            </Stack>
            {/* username field */}
            <InputLabel htmlFor="username" sx={{ color: "#ececee" }}>
              New Username
            </InputLabel>
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
              sx={{
                input: {
                  color: "#d3d3d3",
                  backgroundColor: "#1d1d1d",
                  borderRadius: "1rem",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: ".5rem",
                  backgroundColor: "#1d1d1d",
                  "& fieldset": {
                    border: "1.5px solid #d3d3d3",
                  },
                  "&:hover fieldset": {
                    border: "1.5px solid #1976d2",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1.5px solid #1976d2",
                  },
                },
              }}
            />

            {/* password field */}
            <InputLabel htmlFor="password" sx={{ color: "#ececee" }}>
              New Password
            </InputLabel>
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
                        showPassword ? "Hide password" : "Show password"
                      }
                      sx={{ color: "#ececee" }}
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
              sx={{
                input: {
                  color: "#d3d3d3",
                  backgroundColor: "#1d1d1d",
                  borderRadius: "1rem",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: ".5rem",
                  backgroundColor: "#1d1d1d",
                  "& fieldset": {
                    border: "1.5px solid #d3d3d3",
                  },
                  "&:hover fieldset": {
                    border: "1.5px solid #1976d2",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1.5px solid #1976d2",
                  },
                },
              }}
            />

            {/* confirm password field */}
            <InputLabel htmlFor="confirmPassword" sx={{ color: "#ececee" }}>
              Confirm New Password
            </InputLabel>
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
                      sx={{ color: "#ececee" }}
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
              sx={{
                input: {
                  color: "#d3d3d3",
                  backgroundColor: "#1d1d1d",
                  borderRadius: "1rem",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: ".5rem",
                  backgroundColor: "#1d1d1d",
                  "& fieldset": {
                    border: "1.5px solid #d3d3d3",
                  },
                  "&:hover fieldset": {
                    border: "1.5px solid #1976d2",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1.5px solid #1976d2",
                  },
                },
              }}
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
              Confirm Changes
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

const WrappedSettings = AppLayout(Settings);
export default WrappedSettings;
