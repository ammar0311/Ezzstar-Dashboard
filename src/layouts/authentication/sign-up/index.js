import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

// Notification
import MDSnackbar from "components/MDSnackbar";

function Cover() {
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

  const [time, setTime] = useState();
  const [errMsg, setErrMsg] = useState("");

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
      content="You Are Successfully Registered"
      dateTime={time}
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  function validateEmail(email) {
    const regex = /^[^\s@]+@(email\.com|gmail\.com|outlook\.com)$/;
    return regex.test(email);
  }
  function checkdbEmail(email) {
    fetch(`http://45.90.108.22:3001/chackmail?email=${email}`)
      .then((response) => {
        if (response.ok) {
          return response.json(); // or response.json() for JSON response
        }
        throw new Error("Request failed.");
      })
      .then((data) => {
        if (data.length === 1) {
          data.forEach(() => {
            setErrMsg("Email is already exest.");
            openErrorSB();
          });
        } else {
          const regName = document.getElementById("regName").value;
          const regEmail = document.getElementById("regEmail").value;
          const regPassword = document.getElementById("regPassword").value;
          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleDateString();
          const url = "http://45.90.108.22:3001/register";
          const newData = {
            name: regName,
            email: regEmail,
            password: regPassword,
            date: formattedDate,
          };
          const request = new Request(url, {
            method: "POST",
            body: JSON.stringify(newData),
            headers: new Headers({ "Content-Type": "application/json" }),
          });
          fetch(request).then(() => {
            openSuccessSB();
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const signup = async () => {
    const regName = document.getElementById("regName").value;
    const regEmail = document.getElementById("regEmail").value;
    const regPassword = document.getElementById("regPassword").value;
    // alert(signEmail + signPassword);
    if (regName === "" || regName === null || regName === undefined) {
      setErrMsg("Name is Empty");
      openErrorSB();
    } else if (regEmail === "" || regEmail === null || regEmail === undefined) {
      setErrMsg("Email is Empty");
      openErrorSB();
    } else if (regPassword === "" || regPassword === null || regPassword === undefined) {
      setErrMsg("Password is Empty");
      openErrorSB();
    } else {
      const isValid = validateEmail(regEmail);
      if (isValid) {
        const isOk = checkdbEmail(regEmail);
        if (isOk) {
          openSuccessSB();
        }
      } else {
        setErrMsg("Email is not valid.");
        openErrorSB();
      }
      // navigateToAbout("/dashboard");
    }
  };

  useEffect(() => {
    setTime(`${hours}:${minutes}:${seconds}`);
  });
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput id="regName" type="text" label="Name" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput id="regEmail" type="email" label="Email" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                id="regPassword"
                type="password"
                label="Password"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={signup} variant="gradient" color="info" fullWidth>
                sign Up
              </MDButton>
              {renderErrorSB}
              {renderSuccessSB}
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
