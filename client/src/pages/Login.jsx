import React from 'react'
import {Container, Paper, TextField, Typography} from "@mui/material"

const Login = () => {
  return (
    <div>
        <Container
            component={"main"}
            maxWidth={"xs"}
            sx={{
                height:"100vh",
                display:'flex',
                justifyContent:"center",
                alignItems:'center'
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    display:'flex',
                    flexDirection: 'column',
                    alignItems:'center',
                    padding:4
                }}
            >
                <Typography variant='h5'>Login</Typography>
                <form 
                    style={{
                        marginTop:"1rem",
                        width:"100%",
                    }}
                >     

                    <TextField
                        required
                        fullWidth
                        label={"username"}
                        variant='outlined'
                    />
                    <TextField
                        required
                        fullWidth
                        label={"password"}
                        variant='outlined'
                    />
                </form>
            </Paper>
        </Container>
    </div>
  )
}

export default Login