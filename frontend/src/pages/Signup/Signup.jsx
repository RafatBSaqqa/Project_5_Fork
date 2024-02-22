import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const defaultTheme = createTheme();

import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setUserId,
} from "../../Service/redux/reducers/auth/authSlice";
import PhoneNumber from "../../components/PhoneNumber/PhoneNumber";

const genders = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
];

export default function Signup() {
  const navigate = useNavigate();
  //===============================================================
  //* show/hide Password

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //===============================================================
  //* show/hide Repeat Password

  const [showRePassword, setShowRePassword] = useState(false);

  const handleClickShowRePassword = () => setShowRePassword((show) => !show);

  const handleMouseDownRePassword = (event) => {
    event.preventDefault();
  };
  //===============================================================

  //* Redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // const state = useSelector((state) => {
  //   return { auth: state.auth.auth };
  // });
  // console.log(auth);
  // auth.isLoggedIn, auth.token, auth.userId;

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================

  const signup = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    try {
      const result = await axios.post("http://localhost:5000/users/register", {
        email: data.get("email"),
        password: data.get("password"),
      });
      if (result.data) {
        setStatus(true);
        setMessage(result.data.message);
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        setStatus(true);
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Signup, please try again");
    }
  };

  //===============================================================

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/");
    }
  }, [auth.isLoggedIn]);

  //===============================================================

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Signup
              </Typography>
              <Box component="form" noValidate onSubmit={signup} sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="first_name"
                      fullWidth
                      id="first_name"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="last_name"
                      fullWidth
                      id="last_name"
                      label="Last Name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      name="user_name"
                      fullWidth
                      id="user_name"
                      label="User Name"
                      type="text"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      type="email"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <OutlinedInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        name="password"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel htmlFor="re_password">
                        Repeat Password
                      </InputLabel>
                      <OutlinedInput
                        id="re_password"
                        type={showRePassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle repeat password visibility"
                              onClick={handleClickShowRePassword}
                              onMouseDown={handleMouseDownRePassword}
                              edge="end"
                            >
                              {showRePassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="re_password"
                        name="re_password"
                        // error
                        // helperText="Incorrect entry."
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="gender"
                      select
                      label="Gender"
                      defaultValue="male"
                      helperText="Select your gender"
                      name="gender"
                      type="gender"
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="birthday"
                      name="birthday"
                      type="date"
                      helperText="Select your birthday"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <PhoneNumber  />
                  </Grid>


                </Grid>

                <Grid item xs={12}>
                  <Typography sx={{ mt: 1, color: "red" }}>
                    all fields with * are required
                  </Typography>
                  <FormControlLabel
                    sx={{ mt: 2 }}
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign up
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {"already have an account? Login"}
                    </Link>
                  </Grid>
                </Grid>
                {status
                  ? message && <div className="SuccessMessage">{message}</div>
                  : message && <div className="ErrorMessage">{message}</div>}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}