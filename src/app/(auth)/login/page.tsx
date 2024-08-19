"use client";

import Link from "next/link";
import { Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { signIn } from "next-auth/react";
import Image from "next/image";


const Login = () => {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));


  const handleLogin = async (provider: string) => {
    await signIn(provider, {
      callbackUrl: "/home",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        backgroundColor: "#eef2f6",
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "background.paper",
              textAlign: "center",
            }}
          >
            <Stack spacing={2}>
              <Typography color="secondary.main" variant={downMD ? "h3" : "h2"}>
                Login
              </Typography>

              <TextField
                label="Email Address"
                type="email"
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
              />

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Login
              </Button>

              <Divider>OR</Divider>

              {/* GitHub Sign-in Button */}
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                fullWidth
                startIcon={
                  <Image
                    src="/assets/images/auth/github.svg"
                    width={24}
                    height={24}
                    alt="github"
                  />
                }
                onClick={() => handleLogin("github")}
              >
                Login with GitHub
              </Button>

              <Button
                color="primary"
                variant="outlined"
                fullWidth
                startIcon={
                  <Image
                    src="/assets/images/auth/google.svg"
                    width={24}
                    height={24}
                    alt="google"
                  />
                }
                onClick={() => handleLogin("google")}
              >
                Login with Google
              </Button>

              <Typography
                component={Link}
                href="/register"
                variant="subtitle1"
                sx={{ textDecoration: "none" }}
              >
                Don&apos;t have an account? Sign up
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
