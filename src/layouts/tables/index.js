import { useState, useEffect } from "react";

// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

function Tables() {
  // const { columns, rows } = authorsTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();
  const [writerDetail, setWriter] = useState([]);

  const getAllWRITER = async () => {
    try {
      await fetch("http://45.90.108.22:3001/getWriterdata")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setWriter(data);
        });
      // .then(
      //   (response) => console.log(response)
      //   // setWriter(response.json())
      // );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllWRITER();
  }, []);

  useEffect(async () => {
    await console.log(writerDetail);
  }, [writerDetail]);

  useEffect(() => {
    try {
      const writer = JSON.parse(localStorage.getItem("writer"));
      const name = writer[0].Name;
      console.log(name);
    } catch (err) {
      window.location.replace("/authentication/sign-in");
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {writerDetail.map((element, index) => (
            <tr>
              <td>
                <strong>{index}</strong>
              </td>
              <td>{element.name}</td>
              <td>{element.email}</td>
              <td>{element.joining_date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Authors Tablesss
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox> */}
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
