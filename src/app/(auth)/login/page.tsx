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
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {jwtDecode} from "jwt-decode";
// Install this package using `npm install jwt-decode`
import { signIn } from "next-auth/react";

const Login = () => {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the authorization code from the query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (code) {
      console.log("Authorization Code:", code);
      handleZohoTokenExchange(code);
    }
  }, []);

  const handleZohoTokenExchange = async (code: string) => {
    try {
      const response = await fetch('/api/zoho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
  
      const data = await response.json();
      console.log('Token Response:', data);
  
      if (data.access_token) {
        const decodedToken = jwtDecode(data.id_token);
        console.log('Decoded JWT:', decodedToken);
  
        router.push('/signup');
      } else {
        console.error('Failed to retrieve access token');
      }
    } catch (error) {
      console.error('Error exchanging authorization code for token:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Your existing login logic
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
                size="large"
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

              <Button
                color="primary"
                variant="outlined"
                fullWidth
                size="large"
                startIcon={
                  <Image
                    src="/assets/images/auth/facebook.svg"
                    width={24}
                    height={24}
                    alt="facebook"
                  />
                }
                onClick={() => signIn("facebook", { callbackUrl: "/home" })}
              >
                Login with Facebook
              </Button>

              <Button
                color="primary"
                variant="outlined"
                fullWidth
                size="large"
                startIcon={
                  <Image
                    src="/assets/images/auth/zoho.svg"
                    width={24}
                    height={24}
                    alt="zoho"
                  />
                }
                onClick={() => {
                  const clientId = "1000.MRUB4RWQJMYD0CYN6JW0VLAFXP0HTZ"; // Replace with your client ID
                  const redirectUri = "http://localhost:3000/login";
                  const scope = "email";
                  const responseType = "code";

                  window.location.href = `https://accounts.zoho.com/oauth/v2/auth?response_type=${responseType}&client_id=${clientId}&scope=${scope}&redirect_uri=${encodeURIComponent(
                    redirectUri
                  )}`;
                }}
              >
                Login with Zoho
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
