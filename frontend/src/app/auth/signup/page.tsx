"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Anchor,
  Button,
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Title,
  Text,
} from "@mantine/core";
import Link from "next/link";
import classes from "./SignUp.module.css";

export default function SignUpPage() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, email, password }),
        credentials: "include",
        mode: "cors",
      });

      if (res.ok) {
        router.push("/auth/login");
      } else {
        const data = await res.json();
        setError(data.message || "An error occurred during sign-up.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title
        ta="center"
        className={classes.title}
        fz={40}
        fw={700}
        mb={10}
        mt={20}
      >
        Create Your Company Account
      </Title>

      <Text
        c="accent.1"
        size="sm"
        ta="center"
        mt={5}
        className={classes.subtitle}
      >
        Already have an account?{" "}
        <Anchor
          component={Link}
          href="/auth/login"
          size="sm"
          c="accent.4"
          fw={500}
        >
          Login here
        </Anchor>
      </Text>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        withBorder
        shadow="xl"
        p={30}
        mt={30}
        radius="md"
        className={classes.form}
        bg="primary.0"
        style={{ borderColor: "var(--mantine-color-primary-0)" }}
      >
        {error && (
          <Text c="red" size="sm" ta="center" mb="sm" className={classes.error}>
            {error}
          </Text>
        )}

        <TextInput
          label="Company Name"
          placeholder="Your company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          radius="md"
          styles={{
            label: { color: "var(--mantine-color-accent-0)" },
            input: {
              "&:focus": {
                borderColor: "var(--mantine-color-accent-5)",
              },
            },
          }}
        />

        <TextInput
          label="Email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          mt="md"
          radius="md"
          styles={{
            label: { color: "var(--mantine-color-accent-0)" },
            input: {
              "&:focus": {
                borderColor: "var(--mantine-color-accent-5)",
              },
            },
          }}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mt="md"
          radius="md"
          styles={{
            label: { color: "var(--mantine-color-accent-0)" },
            input: {
              "&:focus": {
                borderColor: "var(--mantine-color-accent-5)",
              },
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          mt="xl"
          radius="md"
          variant="gradient"
          gradient={{ from: "accent.5", to: "primary.7" }}
          className={classes.control}
          size="md"
        >
          Sign Up
        </Button>

        <Text c="accent.1" size="xs" ta="center" mt="sm">
          By signing up, you agree to our{" "}
          <Anchor
            component={Link}
            href="/terms"
            size="xs"
            c="accent.4"
            fw={500}
          >
            Terms of Service
          </Anchor>{" "}
          and{" "}
          <Anchor
            component={Link}
            href="/privacy"
            size="xs"
            c="accent.4"
            fw={500}
          >
            Privacy Policy
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
