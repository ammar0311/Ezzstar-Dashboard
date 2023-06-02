import React, { useState, useEffect } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import "./index.css";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Button } from "@mui/material";
// import MasterCard from "examples/Cards/MasterCard";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Icon from "@mui/material/Icon";

// Billing page components
// import PaymentMethod from "layouts/billing/components/PaymentMethod";
// import Invoices from "layouts/billing/components/Invoices";
// import BillingInformation from "layouts/billing/components/BillingInformation";
// import Transactions from "layouts/billing/components/Transactions";
// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";
import MDSnackbar from "components/MDSnackbar";

function Billing() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [Blogtype, setBlogtype] = useState("Blog");

  const selectType = async (value) => {
    await setBlogtype(value);
    console.log("value", value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [selectedFile2, setSelectedFile2] = useState(null);

  const handleFileChange2 = (event) => {
    setSelectedFile2(event.target.files[0]);
  };

  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const cdate = new Date();
  const cctime = cdate.toLocaleTimeString();
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error"
      content="Some Thong Went Wrong"
      dateTime={cctime}
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
      content="Your Blog Successfully Uploded"
      dateTime={cctime}
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const uplodeBlog = () => {
    // const [img1, setimg1] = useState();
    // const [img2, setimg2] = useState();
    const firstImage = document.getElementById("file-upload").files;
    const firstHeading = document.getElementById("firstheading").value;
    const firstShortParagraph = document.getElementById("firstshortpara").value;
    const firstLongParagraph = document.getElementById("fistlongpara").value;

    // const secondImage = document.getElementById("file-upload2").files;
    const secondHeading = document.getElementById("secondheading").value;
    const secondShortParagraph = document.getElementById("secondshortpara").value;
    const secondLongParagraph = document.getElementById("secondlongpara").value;

    const writer = JSON.parse(localStorage.getItem("writer"));
    const writerEmail = writer[0].email;

    // Create a new Date object
    const currentDate = new Date();

    // Get the current date
    const Datec = currentDate.toDateString();

    // Get the current time
    const Time = currentDate.toLocaleTimeString();
    const fileList = firstImage;
    const isFilePresent = fileList.length;
    const formData = new FormData();
    formData.append("image", selectedFile);
    const formData2 = new FormData();
    formData2.append("image", selectedFile2);
    if (
      isFilePresent === 0 ||
      firstHeading === "" ||
      firstShortParagraph === "" ||
      firstLongParagraph === ""
    ) {
      openErrorSB();
    } else {
      axios.post("http://45.90.108.22:3001/upload", formData).then(async (response) => {
        const a = response.data.destination;
        const b = response.data.filename;
        const aa = a + b;
        try {
          axios.post("http://45.90.108.22:3001/upload", formData2).then(async (res) => {
            const c = res.data.destination;
            const d = res.data.filename;
            const bb = c + d;
            try {
              const url = "http://45.90.108.22:3001/insert";
              const blog = {
                writer: writerEmail,
                blogType: Blogtype,
                date: Datec,
                time: Time,
                firstImage1: aa,
                firstHeading1: firstHeading,
                firstShortParagraph1: firstShortParagraph,
                firstLongParagraph1: firstLongParagraph,
                secondImage2: bb,
                secondHeading2: secondHeading,
                secondShortParagraph2: secondShortParagraph,
                secondLongParagraph2: secondLongParagraph,
              };

              const request = new Request(url, {
                method: "POST",
                body: JSON.stringify(blog),
                headers: new Headers({
                  "Content-Type": "application/json",
                }),
              });

              await fetch(request).then(() => {
                openSuccessSB();
                console.log("Blog Uploded Successfully");
              });
            } catch (err) {
              console.log(err);
            }
          });
        } catch (err) {
          console.log("second image is not available");
        }
      });
    }
  };
  const [tabValue, setTabValue] = useState(0);
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation, Blogtype]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  useEffect(() => {
    try {
      const writer = JSON.parse(localStorage.getItem("writer"));
      const name = writer[0].Name;
      console.log(name);
    } catch (err) {
      window.location.replace("/authentication/sign-in");
    }
  });

  return (
    <DashboardLayout>
      {renderErrorSB}
      {renderSuccessSB}
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <Grid container>
          <Grid item xs={12} xl={8}>
            {/* <Button onClick={() => selectType("Blog")}>Blog</Button> */}
            <AppBar style={{ marginBottom: "20px" }} position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  onClick={() => selectType("Blog")}
                  label="Blog"
                  // icon={
                  //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                  //     Blog
                  //   </Icon>
                  // }
                />
                <Tab
                  onClick={() => selectType("Game")}
                  label="Game"
                  // icon={
                  //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                  //     Game
                  //   </Icon>
                  // }
                />
                <Tab
                  onClick={() => selectType("Anime")}
                  label="Anime"
                  // icon={
                  //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                  //     Anime
                  //   </Icon>
                  // }
                />
              </Tabs>
            </AppBar>
          </Grid>
          <Grid item xs={12} xl={4} style={{ marginBottom: "10px", textAlign: "right" }}>
            {Blogtype} Writing...
          </Grid>
        </Grid>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  {/* <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" /> */}
                  <div className="container">
                    <div className="header">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                        </g>
                      </svg>{" "}
                      <p>First image upload!</p>
                    </div>
                    <label htmlFor="file" className="footer">
                      {/* <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                          <path d="M15.331 6H8.5v20h15V14.154h-8.169z" />
                          <path d="M18.153 6h-.009v5.342H23.5v-.002z" />
                        </g>
                      </svg> */}
                      <label
                        style={{ width: "100%" }}
                        htmlFor="file-upload"
                        className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root css-1lgzo7r-MuiButtonBase-root-MuiButton-root"
                      >
                        {selectedFile ? selectedFile.name : "Choose File"}
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                      {/* <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
                            stroke="#000000"
                            strokeWidth={2}
                          />{" "}
                          <path
                            d="M19.5 5H4.5"
                            stroke="#000000"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />{" "}
                          <path
                            d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
                            stroke="#000000"
                            strokeWidth={2}
                          />{" "}
                        </g>
                      </svg> */}
                    </label>
                  </div>
                </Grid>
                <Grid item xs={12} xl={6}>
                  {/* <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" /> */}
                  <div className="container">
                    <div className="header">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                        </g>
                      </svg>{" "}
                      <p>Second image upload!</p>
                    </div>
                    <label htmlFor="file" className="footer">
                      {/* <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                          <path d="M15.331 6H8.5v20h15V14.154h-8.169z" />
                          <path d="M18.153 6h-.009v5.342H23.5v-.002z" />
                        </g>
                      </svg> */}
                      <label
                        style={{ width: "100%" }}
                        htmlFor="file-upload2"
                        className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root css-1lgzo7r-MuiButtonBase-root-MuiButton-root"
                      >
                        {selectedFile2 ? selectedFile2.name : "Choose File"}
                      </label>
                      <input
                        id="file-upload2"
                        type="file"
                        onChange={handleFileChange2}
                        style={{ display: "none" }}
                      />
                      {/* <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
                            stroke="#000000"
                            strokeWidth={2}
                          />{" "}
                          <path
                            d="M19.5 5H4.5"
                            stroke="#000000"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />{" "}
                          <path
                            d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
                            stroke="#000000"
                            strokeWidth={2}
                          />{" "}
                        </g>
                      </svg> */}
                    </label>
                  </div>
                </Grid>
                {/* <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="salary"
                    description="Belong Interactive"
                    value="+$2000"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="paypal"
                    title="paypal"
                    description="Freelance Payment"
                    value="$455.00"
                  />
                </Grid> */}
                <Grid item xs={12}>
                  {/* <PaymentMethod /> */}
                  <input
                    className="input"
                    id="firstheading"
                    placeholder="Heading First"
                    type="text"
                  />
                  <h6>~~~~</h6>
                  <textarea
                    id="firstshortpara"
                    placeholder="First Short Paragraph"
                    name="firstpara"
                    rows="4"
                    cols="77"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              {/* <Invoices /> */}
              <input
                className="input"
                id="secondheading"
                placeholder="Second Heading"
                type="text"
              />
              <h6>~~~~</h6>
              <textarea
                id="secondshortpara"
                placeholder="Second Short Paragraph"
                name="secondpara"
                rows="25"
                cols="30"
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              {/* <BillingInformation /> */}
              <textarea
                id="fistlongpara"
                placeholder="First Long Paragraph"
                name="firstpara"
                rows="25"
                cols="30"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              {/* <Transactions /> */}
              <textarea
                id="secondlongpara"
                placeholder="Second Long Paragraph"
                name="secondpara"
                rows="25"
                cols="30"
              />
            </Grid>
          </Grid>
        </MDBox>
        <Button
          onClick={uplodeBlog}
          className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root css-1lgzo7r-MuiButtonBase-root-MuiButton-root"
        >
          Uplode Blog
        </Button>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
