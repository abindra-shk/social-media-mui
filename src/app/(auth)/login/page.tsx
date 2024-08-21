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
import { useState } from "react";

const Login = () => {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/home",
    });

    if (result?.error) {
      setError(result.error);
    } else {
      // Redirect to the callback URL or home page
      window.location.href = "/home";
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
                Login
              </Typography>

              <form onSubmit={handleLogin}>
                <TextField
                  label="Email Address"
                  type="text"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    marginBottom: "15px",
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    marginBottom: "15px",
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
                  Login
                </Button>
              </form>
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
                onClick={() => signIn("github", { callbackUrl: "/home" })}
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
                onClick={() => signIn("google", { callbackUrl: "/home" })}
              >
                Login with Google
              </Button>

              <Typography
                component={Link}
                href="/signup"
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
