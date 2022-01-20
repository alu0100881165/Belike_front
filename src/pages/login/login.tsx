import './login.scss';

import { useEffect, useState } from "react";
import { Card, Grid, TextField, Typography, Button, Snackbar, Alert } from '@mui/material';
import logo from '../../common/img/beLikeIcon.jpg';
import axios from 'axios';
import { UserModel } from '../../models/user.model';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [passwd, setPasswd] = useState<string>('');
    const [confirmPasswd, setConfirmPasswd] = useState<string>('');
    const [errorUser, setErrorUser] = useState<boolean>(false);
    const [errorPasswd, setErrorPasswd] = useState<boolean>(false);
    const [errorConfirmPasswd, setErrorConfirmPasswd] = useState<boolean>(false);
    const [openSubmitMessage, setOpenSubmitMessage] = useState<boolean>(false);

    let navigate = useNavigate();

    // TODO should move to environment file
    const baseUrl = "http://localhost:3000/api";


    useEffect(() => {
        if(username.length > 0) 
            setErrorUser((/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(username));
    }, [username]);

    useEffect(() => {
        if(passwd.length > 0)
            setErrorPasswd(passwd.length < 7 || !passwd.includes('#') || !(/[A-Z]+/).test(passwd));
        if(confirmPasswd.length > 0) 
            setErrorConfirmPasswd(passwd !== confirmPasswd);
    }, [passwd, confirmPasswd]);


    const handleSubmit = () => {
        axios.post<UserModel>(`${baseUrl}/users`, {
            id: null,
            username,
            password: passwd
        }).then((res) => {
            setOpenSubmitMessage(true);
            setTimeout(() => {
                navigate(`/intranet/${res.data.id}`);
            }, 1000);
        })
    }


    return (<div className='background'>
        <Card variant="outlined" className="loginForm">
            <Grid container direction="column" justifyContent="center" alignItems="center" rowSpacing={3}>
                <Grid item xs={12}>
                    <img
                        src={logo}
                        alt="company logo"
                        loading="lazy"
                        className='icon'
                    />
                    <Typography component="h1" variant="h5" style={{marginTop: '10px'}}>
                        Crear una cuenta
                    </Typography>
                </Grid>
                <Grid item sx={{width: '95%'}}>
                    <TextField
                        required
                        error={errorUser}
                        id="filled-required"
                        label="Usuario"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        helperText={errorUser ? "El usuario no puede contener caracteres especiales" : ""}
                        fullWidth
                    />
                </Grid>
                <Grid item sx={{width: '95%'}}>
                    <TextField
                        required
                        type="password"
                        error={errorPasswd}
                        id="filled-password-input"
                        label="Contraseña"
                        value={passwd}
                        onChange={e => setPasswd(e.target.value)}
                        helperText={errorPasswd ? "La contraseña ser de al menos 7 caracteres, una letra mayúscula y contener el símbolo #   " : ""}
                        fullWidth
                    />
                </Grid>
                <Grid item sx={{width: '95%'}}>
                    <TextField
                        required
                        type="password"
                        error={errorConfirmPasswd}
                        id="filled-password-input"
                        label="Repita la contraseña"
                        value={confirmPasswd}
                        onChange={e => setConfirmPasswd(e.target.value)}
                        helperText={errorConfirmPasswd ? "Las dos contraseñas deben coincidir   " : ""}
                        fullWidth
                    />
                </Grid>
                <Grid item sx={{width: '95%', paddingBottom: '30px'}}>
                    <Button size="large" disabled={errorPasswd || errorConfirmPasswd || errorUser || passwd.length === 0 || confirmPasswd.length === 0 || username.length === 0} variant="contained" fullWidth onClick={handleSubmit}>Registrarme</Button>
                </Grid>
            </Grid>
        </Card>
        <Snackbar open={openSubmitMessage} autoHideDuration={6000} onClose={() => setOpenSubmitMessage(false)} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert onClose={() => setOpenSubmitMessage(false)} severity={errorPasswd || errorUser ? "error" : "success"} sx={{ width: '100%' }}>
                {errorPasswd || errorUser ?
                    "Rellene los campos correctamente" :
                    "Registro satisfactorio!"
                }
            </Alert>
        </Snackbar>
    </div>)
}

export default LoginPage;