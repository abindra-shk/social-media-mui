"use client";

import { useState } from "react";
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
import Image from "next/image";
import { signIn } from "next-auth/react";
// import { POST } from "@/app/api/sign-up/route";

const Register = () => {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("../api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (response.ok) {
        // Redirect to login or home page
        window.location.href = "/login";
      } else {
        const data = await response.json();
        setError(data.message || "An error occurred during registration.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
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
        <Grid item xs={12} md={4}>
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
                Register
              </Typography>

              <form onSubmit={handleRegister}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style ={{
                    marginBottom:'15px'
                  }}
                />
                <TextField
                  label="Username"
                  type="text"
                  fullWidth
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style ={{
                    marginBottom:'15px'
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style ={{
                    marginBottom:'15px'
                  }}
                />

                {error && (
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Register
                </Button>
              </form>

              <Divider>OR</Divider>

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
                onClick={() => signIn("github", { callbackUrl: "/home" })}
              >
                Register with GitHub
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
                onClick={() => signIn("google", { callbackUrl: "/home" })}
              >
                Register with Google
              </Button>

              <Typography
                component={Link}
                href="/login"
                variant="subtitle1"
                sx={{ textDecoration: "none" }}
              >
                Already have an account? Login
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
