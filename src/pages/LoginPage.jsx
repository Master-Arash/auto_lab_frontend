import {Box, TextField, InputAdornment, Button, Container, Avatar, Typography} from "@mui/material";
import {AccountCircle, Key, LockOutlined} from '@mui/icons-material';
import useAuthStore from "../stores/authStore.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react"; // for redirect

export default function LoginPage() {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const {isLoggedIn} = useAuthStore();
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/", {replace: true});
        }
    }, [isLoggedIn])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');

        try {
            await login({username, password});
            console.log("Successfully logged in");
            navigate("/samples");
        } catch (err) {
            console.error(err.response?.data || err.message);
            console.log("Error logging in");
        }
    };

    return (<Container variant="standard">
        <Box
            sx={{
                marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}
        >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlined/>
            </Avatar>
            <Typography component="h1" variant="h5">
                ورود
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                <TextField
                    required fullWidth autoFocus name="username" autoComplete="username" margin="normal"
                    label="نام کاربری" slotProps={{
                    input: {
                        startAdornment: (<InputAdornment position="start"><AccountCircle/></InputAdornment>),
                    },
                }} variant="outlined"
                />
                <TextField
                    margin="normal" required fullWidth name="password" autoComplete="current-password"
                    label="رمز عبور" type="password" slotProps={{
                    input: {
                        startAdornment: (<InputAdornment position="start"><Key/></InputAdornment>),
                    },
                }} variant="outlined"
                />
                <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                    ورود
                </Button>
            </Box>
        </Box>
    </Container>);
}
