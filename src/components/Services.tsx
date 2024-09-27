import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Button, Paper } from "@mui/material";
import { MdOutlineSmartToy } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { FaBaby } from "react-icons/fa";
import { useFilterContext } from "../contexts/filterContext";
import { useProductsContext } from "../contexts/productsContext";

const Services = () => {
  const { updateFilter, handleClickFromService } = useFilterContext();
  const { clearFilter } = useProductsContext();
  const services = [
    {
      id: 1,
      icon: <MdOutlineSmartToy />,
      title: "toy",
      text: "toy text",
    },
    {
      id: 2,
      icon: <GiClothes />,
      title: "clothing",
      text: "clothing text",
    },
    {
      id: 3,
      icon: <FaBaby />,
      title: "accessories",
      text: "accessories text",
    },
  ];

  return (
    <Box
      sx={{
        padding: { xs: "5rem 0", md: "0" },
        background: "var(--clr-primary-10)",
        ".MuiTypography-h3": { color: "var(--clr-primary-1)" },
        ".MuiTypography-h4": { color: "var(--clr-primary-1)" },
        ".MuiTypography-body1": { color: "var(--clr-primary-3)", lineHeight: 1.8 },
        ".MuiPaper-root": {
          background: "var(--clr-primary-7)",
          textAlign: "center",
          padding: "2.5rem 2rem",
          borderRadius: "var(--radius)",
          marginBottom: "2.5rem",
        },
        ".MuiButton-root": { marginTop: "1rem" },
      }}
    >
      {/* Header */}
      <Box sx={{ marginBottom: "4rem" }}>
        <Typography variant="h3" component="h3">
          Gold & Diamond <br /> Jewellery
        </Typography>
        <Typography>
          You can pick whatever jewellery you like from worldwide renowned
          manufacturers, with guaranteed quality and fair price.
        </Typography>
        <Typography>Start browsing different types of products:</Typography>
      </Box>
      {/* Service Cards */}
      <Grid container spacing={2.5}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Paper elevation={3}>
              <Box sx={{ ".MuiSvgIcon-root": { fontSize: "2rem" } }}>
                <span className="icon">{service.icon}</span>
              </Box>
              <Typography variant="h4">{service.title}</Typography>
              <Link to="/products" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    clearFilter();
                    handleClickFromService();
                    // updateFilter(e);
                  }}
                >
                  Click here for {service.title}
                </Button>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;