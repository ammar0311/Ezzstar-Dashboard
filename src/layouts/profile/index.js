import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import { Button } from "@mui/material";
// import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
// import profilesListData from "layouts/profile/data/profilesListData";

// Images
// import homeDecor1 from "assets/images/home-decor-1.jpg";
// import homeDecor2 from "assets/images/home-decor-2.jpg";
// import homeDecor3 from "assets/images/home-decor-3.jpg";
// import homeDecor4 from "assets/images/home-decor-4.jpeg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

function Overview() {
  const [Type, setType] = useState("");
  const [Writer, setWriter] = useState("");
  const [date, setDate] = useState("");
  const [img1, setImg1] = useState("");
  const [Heading1, setHeading1] = useState("heading");
  const [Para1, setPara1] = useState("Short Para");
  const [Para1Long, setPara1Long] = useState("Long");
  const [img2, setImg2] = useState("");
  const [Heading2, setHeading2] = useState("");
  const [Para2, setPara2] = useState("");
  const [Para2Long, setPara2Long] = useState("");
  const [user, setName] = useState("");
  const [Mail, setMail] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const deleteData = async () => {
    console.log(`"Deleting...."${id}`);
    try {
      const response = await fetch(`http://45.90.108.22:3001/deleteBlogData?id=${id}`);
      const data = await response.json();
      console.log(data);
      alert("Blog Deleted Go to Dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    try {
      const writer = JSON.parse(localStorage.getItem("writer"));
      const name = writer[0].Name;
      const eail = writer[0].email;
      setName(name);
      setMail(eail);
    } catch (err) {
      window.location.replace("/authentication/sign-in");
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://45.90.108.22:3001/getBlogidData?id=${id}`);
        const data = await response.json();
        // console.log(data);
        setType(data[0].blogs_type);
        setDate(data[0].blogs_date);
        setWriter(data[0].blogs_writerEmail);
        setImg1(data[0].blogs_image1);
        setHeading1(data[0].blogs_heading1);
        setPara1(data[0].blogs_shortpara1);
        setPara1Long(data[0].blogs_longpara1);
        setImg2(data[0].blogs_image2);
        setHeading2(data[0].blogs_heading2);
        setPara2(data[0].blogs_shortpara2);
        setPara2Long(data[0].blogs_longpara2);
        // http://45.90.108.22:3001/
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // console.log(Type);
    // console.log(Writer);
    // console.log(date);
    // console.log(img1);
    // console.log(Heading1);
    // console.log(Para1);
    // console.log(Para1Long);
    // console.log(img2);
    // console.log(Heading2);
    // console.log(Para2);
    // console.log(Para2Long);
  }, [id, Type, Writer, date, img1, Heading1, Para1, Para1Long, img2, Heading2, Para2, Para2Long]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header imgss={img1} writer={Writer} blogdate={date} type={Type} />
      <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4}>
            <MDBox pt={2} px={2} lineHeight={1.25}>
              <MDTypography variant="h6" fontWeight="medium">
                {Heading1}
              </MDTypography>
              <MDBox mb={1}>
                <MDTypography variant="button" color="text">
                  {Para1}
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox p={2}>{Para1Long}</MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
            <ProfileInfoCard
              title="profile information"
              description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                fullName: "Alec M. Thompson",
                mobile: "(44) 123 1234 123",
                email: "alecthompson@mail.com",
                location: "USA",
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
              shadow={false}
            />
            <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid>
          <Grid item xs={12} xl={4}>
            <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
          </Grid> */}
        </Grid>
        <MDBox
          display="flex"
          alignItems="center"
          position="relative"
          minHeight="18.75rem"
          borderRadius="xl"
          sx={{
            backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.info.main, 0.6),
                rgba(gradients.info.state, 0.6)
              )}, url(http://45.90.108.22:3001/${img2})`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
            overflow: "hidden",
          }}
        />
      </MDBox>
      <MDBox pt={2} px={2} lineHeight={1.25}>
        <MDTypography variant="h6" fontWeight="medium">
          {Heading2}
        </MDTypography>
        <MDBox mb={1}>
          <MDTypography variant="button" color="text">
            {Para2}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        {Para2Long}
        {/* <Grid container spacing={6}>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={homeDecor1}
              label="project #2"
              title="modern"
              description="As Uber works through a huge amount of internal management turmoil."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view project",
              }}
              authors={[
                { image: team1, name: "Elena Morison" },
                { image: team2, name: "Ryan Milly" },
                { image: team3, name: "Nick Daniel" },
                { image: team4, name: "Peterson" },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={homeDecor2}
              label="project #1"
              title="scandinavian"
              description="Music is something that everyone has their own specific opinion about."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view project",
              }}
              authors={[
                { image: team3, name: "Nick Daniel" },
                { image: team4, name: "Peterson" },
                { image: team1, name: "Elena Morison" },
                { image: team2, name: "Ryan Milly" },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={homeDecor3}
              label="project #3"
              title="minimalist"
              description="Different people have different taste, and various types of music."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view project",
              }}
              authors={[
                { image: team4, name: "Peterson" },
                { image: team3, name: "Nick Daniel" },
                { image: team2, name: "Ryan Milly" },
                { image: team1, name: "Elena Morison" },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={homeDecor4}
              label="project #4"
              title="gothic"
              description="Why would anyone pick blue over pink? Pink is obviously a better color."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view project",
              }}
              authors={[
                { image: team4, name: "Peterson" },
                { image: team3, name: "Nick Daniel" },
                { image: team2, name: "Ryan Milly" },
                { image: team1, name: "Elena Morison" },
              ]}
            />
          </Grid>
        </Grid> */}
      </MDBox>
      {Mail === Writer ? <Button onClick={() => deleteData()}>Delete</Button> : ""}
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
