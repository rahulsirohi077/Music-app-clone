import React, { useContext, useState } from 'react'
import { Button, Container, IconButton, InputLabel, Link, Paper, TextField, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { login } from '../apis/userAPI'
import { useForm } from 'react-hook-form'
import { UserContext } from '../context/UserContext'

const Settings = () => {
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
      } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    

    const handleLogin = async(data) => {
        console.log("data=> ",data)
        await login(data,navigate,setUser)
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
                    <Typography variant='h5'>Modify Your Information</Typography>
                    <form
                        style={{
                            marginTop: "1rem",
                            width: "100%",
                        }}
                        onSubmit={handleSubmit(handleLogin)}
                    >
                        <InputLabel htmlFor="username" >Username or Email</InputLabel>
                        <TextField
                            id='username'
                            margin='normal'
                            fullWidth
                            {...register('userNameOrEmail',{required:"UserName Or Email is required"})}
                            variant='outlined'
                            error={!!errors.userNameOrEmail}
                            helperText={errors?.userNameOrEmail?.message}
                            aria-invalid={!!errors.userNameOrEmail}
                        />
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <TextField
                            id='password'
                            margin='normal'
                            fullWidth
                            variant='outlined'
                            type={showPassword ? "text" : "password"}
                            {...register('password',{required:"Password is Required"})}
                            error={errors?.password}
                            helperText={errors?.password?.message}
                            aria-invalid={!!errors.password}
                            slotProps={{
                                input: {
                                    endAdornment: <IconButton 
                                    aria-label={showPassword?"Hide Password":"Show Password"}
                                    onClick={() => setShowPassword((prev) => !prev)}>
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
                            disabled={isSubmitting}
                            aria-disabled={isSubmitting}
                        >
                            Login
                        </Button>
                        <Typography textAlign={"center"} m={"1rem"}>
                            Or
                        </Typography>
                        <Button 
                            fullWidth
                            variant='outlined'
                            href='/signup'
                        >
                            Sign Up Instead
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Settings