import React, { useState } from 'react'
import { Button, Container, IconButton, InputLabel, Paper, TextField, Typography } from "@mui/material"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    

    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: ''
    })

    const handleLogin = (e) => {
        e.preventDefault()
        toast.success("Login Successful")
        setTimeout(() => {
            navigate("/")
        }, 5000)
        console.log("usernameOrEmail ",formData.usernameOrEmail);
        console.log("password ",formData.password);
    }

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
                        padding: 4
                    }}
                >
                    <Typography variant='h5'>Login</Typography>
                    <form
                        style={{
                            marginTop: "1rem",
                            width: "100%",
                        }}
                        onSubmit={handleLogin}
                    >
                        <InputLabel htmlFor="Username or Email" >Username or Email</InputLabel>
                        <TextField
                            id='username'
                            margin='normal'
                            required
                            fullWidth
                            // label={"Username/Email"}
                            value={formData.usernameOrEmail}
                            onChange={(e) => setFormData((prev) => ({ ...prev, usernameOrEmail: e.target.value }))}
                            variant='outlined'
                        />
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <TextField
                            id='password'
                            margin='normal'
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
                        <Button
                            variant='contained'
                            sx={{
                                marginTop: "1rem"
                            }}
                            fullWidth
                            type='submit'
                        >
                            Login
                        </Button>
                        <Typography textAlign={"center"} m={"1rem"}>
                            Or
                        </Typography>
                        <Button 
                            fullWidth
                            variant='outlined'
                            onClick={()=>navigate("/signup")}
                        >
                            Sign Up
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Login