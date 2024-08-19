"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Image from "next/image";

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  // Map picture to image
  const userImage = session.user?.picture || session.user?.image;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Home
          </Typography>

          {userImage && (
            <Image
              src={userImage} // Using the mapped image URL
              alt={session.user.name || "User"}
              width={40} // Adjust width to match your design
              height={40} // Adjust height to match your design
              className="rounded-full"
            />
          )}

          <Button 
            color="inherit" 
            onClick={() => signOut({ callbackUrl: "/login" })} 
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Welcome, {session.user?.name}!
                </Typography>
                <Typography variant="body1">
                  Email: {session.user?.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
