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
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import { REGISTER_MUTATION } from "@/graphql/mutations";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Repeat password is required"),
});

const Register = () => {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [registerUser] = useMutation(REGISTER_MUTATION);

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
                Register
              </Typography>

              <Formik
                initialValues={{
                  email: "",
                  username: "",
                  password: "",
                  repeatPassword: "",
                }}
                validationSchema={validationSchema}
                validateOnChange={true}
                validateOnBlur={true}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  setGeneralError(null);
                  try {
                    const { data } = await registerUser({
                      variables: {
                        createUserInput: {
                          email: values.email,
                          password: values.password,
                          repeatPassword: values.repeatPassword,
                          userName: values.username,
                        },
                      },
                    });

                    if (data?.register) {
                      window.location.href = "/login";
                    }
                  } catch (err: any) {
                    setGeneralError(
                      err.message || "An error occurred during registration."
                    );
                    setSubmitting(false);
                  }
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Email Address"
                      type="email"
                      fullWidth
                      required
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={{ marginBottom: "15px" }}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      label="Username"
                      type="text"
                      fullWidth
                      required
                      name="username"
                      value={values.username}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={{ marginBottom: "15px" }}
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                    />
                    <TextField
                      label="Password"
                      type="password"
                      fullWidth
                      required
                      name="password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={{ marginBottom: "15px" }}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <TextField
                      label="Repeat Password"
                      type="password"
                      fullWidth
                      required
                      name="repeatPassword"
                      value={values.repeatPassword}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={{ marginBottom: "15px" }}
                      error={
                        touched.repeatPassword && Boolean(errors.repeatPassword)
                      }
                      helperText={
                        touched.repeatPassword && errors.repeatPassword
                      }
                    />

                    {generalError && (
                      <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                        {generalError}
                      </Typography>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={isSubmitting}
                      sx={{ mt: 2, height: "52px" }}
                    >
                      {isSubmitting ? "Registering..." : "Register"}
                    </Button>
                  </form>
                )}
              </Formik>

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
                Register with Google
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
                Register with Facebook
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
                onClick={() => signIn("zoho", { callbackUrl: "/home" })}
              >
                Login with Zoho
              </Button>

              <Typography variant="body2" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Link href="/login" passHref>
                  Log in
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
