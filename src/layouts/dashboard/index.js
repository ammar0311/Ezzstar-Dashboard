import React, { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

// Images
// import homeDecor1 from "assets/images/home-decor-1.jpg";
// import homeDecor2 from "assets/images/home-decor-2.jpg";
// import homeDecor3 from "assets/images/home-decor-3.jpg";
// import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Dashboard() {
  const location = useLocation();
  const [blog, setBlog] = useState([]);
  const [myblog, setMyBlog] = useState([]);
  const [count, setCount] = useState([]);
  const [mail, setMail] = useState("");
  const [countWriter, setCountWriter] = useState("");
  // const [allow, setAllow] = useState(false);

  // setAllow(true);

  // const { sales, tasks } = reportsLineChartData;

  const getAllBlog = () => {
    try {
      fetch("http://45.90.108.22:3001/getBlogdata")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setBlog(data);
        });
    } catch (err) {
      console.log(err);
    }

    try {
      fetch(`http://45.90.108.22:3001/countBlogsGamesAnime`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setCount(data);
        });
    } catch (err) {
      console.log(err);
    }

    try {
      fetch(`http://45.90.108.22:3001/countWriters`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCountWriter(data.count);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getMyBlog = () => {
    try {
      fetch(`http://45.90.108.22:3001/getMyblog?email=${mail}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setMyBlog(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      const writerBUILD = JSON.parse(localStorage.getItem("writer"));
      const name = writerBUILD[0].Name;
      const eail = writerBUILD[0].email;
      setMail(eail);
      console.log(name);
    } catch (err) {
      try {
        const writer = location.state;
        const writerName = writer[0].Name;
        console.log(writerName);
        localStorage.setItem("writer", JSON.stringify(writer));
      } catch (error) {
        window.location.replace("/authentication/sign-in");
        console.log(error);
      }
    }
  });
  useEffect(() => {
    getAllBlog();
    getMyBlog();
  }, [mail]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Blogs"
                count={count.Blog}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Games"
                count={count.Game}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Anime"
                count={count.Anime}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Blog Writer"
                count={countWriter}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Blogs
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              List Of All Blogs
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            {blog.map((item) => (
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={`http://45.90.108.22:3001/${item.blogs_image1}`}
                  label={item.blogs_type}
                  title={item.blogs_heading1}
                  description={item.blogs_shortpara1}
                  action={{
                    type: "internal",
                    route: `/Read~Blog?id=${item.blogs_id}`,
                    color: "info",
                    label: "view Blog",
                  }}
                  authors={[
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                  ]}
                />
              </Grid>
            ))}
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            My Blogs
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              List Of All My Blogs
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            {myblog.map((item) => (
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={`http://45.90.108.22:3001/${item.blogs_image1}`}
                  label={item.blogs_type}
                  title={item.blogs_heading1}
                  description={item.blogs_shortpara1}
                  action={{
                    type: "internal",
                    route: `/Read~Blog?id=${item.blogs_id}`,
                    color: "info",
                    label: "view Blog",
                  }}
                  authors={[
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                  ]}
                />
              </Grid>
            ))}
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
