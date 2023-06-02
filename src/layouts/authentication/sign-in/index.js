import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// Notification
import MDSnackbar from "components/MDSnackbar";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [Key, setKey] = useState();
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [time, setTime] = useState();

  const [errMsg, setErrMsg] = useState("");

  // const navigateToAbout = (value) => {
  //   const navigateProps = {
  //     to: value,
  //     replace: false,
  //     state: { data: "some data" },
  //   };

  //   Navigate(navigateProps);
  // };

  const signin = () => {
    const signEmail = document.getElementById("signemail").value;
    const signPassword = document.getElementById("signpassword").value;
    // alert(signEmail + signPassword);
    if (signEmail === "" || signEmail === null || signEmail === undefined) {
      setErrMsg("Email is Empty");
      openErrorSB();
    } else if (signPassword === "" || signPassword === null || signPassword === undefined) {
      setErrMsg("Password is Empty");
      openErrorSB();
    } else {
      fetch(`http://45.90.108.22:3001/login?email=${signEmail}&password=${signPassword}`)
        .then((response) => {
          if (response.ok) {
            return response.json(); // or response.json() for JSON response
          }
          throw new Error("Request failed.");
        })
        .then((data) => {
          if (data.length === 1) {
            data.forEach(() => {
              setKey(data);
              openSuccessSB();
              const go = document.getElementById("go");
              go.click();
            });
          } else {
            setErrMsg("You Are Not Registerd Yet.");
            openErrorSB();
          }
        });
      // navigateToAbout("/dashboard");
    }
  };

  useEffect(() => {
    setTime(`${hours}:${minutes}:${seconds}`);
    localStorage.clear();
  });

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error"
      content={errMsg}
      dateTime={time}
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Greate"
      content="Welcome to EzzStar Blog Dashboard"
      dateTime={time}
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput id="signemail" type="email" label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput id="signpassword" type="password" label="Password" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={signin} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
              <Link id="go" state={Key} style={{ display: "none" }} to="/dashboard">
                Dashboard
              </Link>
              {renderErrorSB}
              {renderSuccessSB}
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
