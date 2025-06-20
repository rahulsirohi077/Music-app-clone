import React, { useState } from 'react'
import { Button, Container, IconButton, InputLabel, Paper, TextField, Typography } from "@mui/material"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { signUp } from '../apis/userAPI'

const SignUp = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
    })

    const handleSignUp = async(e) => {
        e.preventDefault()
        if (validateSignUpForm()) {
            const toastId = toast.loading("Loading...")
            const response = await signUp(formData);
            if(response.success){
                toast.success("SignUp Successful",{id:toastId})
                setTimeout(() => {
                    navigate("/")
                }, 5000)
            }
            else{
                toast.error(response?.message || "Something Went Wrong",{id:toastId})
            }
        }
    }

    const validateSignUpForm = () => {
        const newErrors = {};
        const { username, password, confirmPassword } = formData;

        // Username
        if (!username) {
            newErrors.username = "Username is required.";
        } else if (username.length < 10 || username.length > 20) {
            newErrors.username = "Username must be 10-20 characters long.";
        }

        // Password rules
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@&])[A-Za-z\d_@&]{8,15}$/;

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (!passwordRegex.test(password)) {
            newErrors.password =
                "Password must be 8-15 characters and include uppercase, lowercase, digit, and one of _ @ &.";
        }

        // password and confirmPassword should match
        if (!confirmPassword || password !== confirmPassword) {
            newErrors.confirmPassword = "Password and confirmPassword fields should match!"
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div>
            <Container
                component={"main"}
                maxWidth={"xs"}
                sx={{
                    height: "100vh",
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 3,
                        height:"80%",
                        overflow:'auto'
                    }}
                >
                    <Typography variant='h5'>Sign Up</Typography>
                    <form
                        style={{
                            marginTop: "1rem",
                            width: "100%",
                        }}
                        onSubmit={handleSignUp}
                    >
                        {/* username field */}
                        <InputLabel htmlFor="username" >Username</InputLabel>
                        <TextField
                            id='username'
                            margin='dense'
                            required
                            fullWidth
                            // label={"Username/Email"}
                            value={formData.username}
                            onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                            variant='outlined'
                        />
                        {errors.username && (
                            <Typography color='red' variant='caption'>
                                {errors.username}
                            </Typography>
                        )}

                        {/* email field */}
                        <InputLabel htmlFor="email" >Email</InputLabel>
                        <TextField
                            id='email'
                            type='email'
                            margin='dense'
                            required
                            fullWidth
                            // label={"Username/Email"}
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            variant='outlined'
                        />

                        {/* password field */}
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <TextField
                            id='password'
                            margin='dense'
                            required
                            fullWidth
                            // label={"password"}
                            variant='outlined'
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                            slotProps={{
                                input: {
                                    endAdornment: <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                }
                            }}
                        />
                         {errors.password && (
                            <Typography color='red' variant='caption'>
                                {errors.password}
                            </Typography>
                        )}

                        {/* confirm password field */}
                        <InputLabel htmlFor="confirmPassword" >Confirm Password</InputLabel>
                        <TextField
                            id='confirmPassword'
                            margin='dense'
                            required
                            fullWidth
                            // label={"password"}
                            variant='outlined'
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                            slotProps={{
                                input: {
                                    endAdornment: <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                }
                            }}
                        />
                         {errors.confirmPassword && (
                            <Typography color='red' variant='caption'>
                                {errors.confirmPassword}
                            </Typography>
                        )}

                        {/* Buttons */}
                        <Button
                            variant='contained'
                            sx={{
                                marginTop: "0.5rem"
                            }}
                            fullWidth
                            type='submit'
                        >
                            SignUp
                        </Button>
                        <Typography textAlign={"center"} m={"0.5rem"}>
                            Or
                        </Typography>
                        <Button
                            fullWidth
                            variant='outlined'
                            onClick={() => navigate("/login")}
                        >
                            Login Instead
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default SignUp