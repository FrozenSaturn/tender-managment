"use client";

import { Title, Text, Button, Container, Stack, Paper } from "@mantine/core";
import { useRouter } from "next/navigation";

export function Welcome() {
  const router = useRouter();
  return (
    <Container size="md" py="xl">
      <Paper p="xl" radius="lg" bg="dark.8">
        <Stack gap="xl">
          <Title order={1} ta="center" c="accent.0">
            Welcome to{" "}
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{ from: "accent.6", to: "primary.9" }}
            >
              Tender Management
            </Text>
          </Title>
          <Text c="dark.0" ta="center" size="lg" maw={580} mx="auto">
            Manage your tenders efficiently with our platform. Create, track,
            and manage tenders all in one place.
          </Text>
          <Button
            fullWidth
            variant="gradient"
            gradient={{ from: "accent.6", to: "primary.9" }}
            size="md"
            onClick={() => {
              router.push("/landing"); 
            }}
          >
            Get Started
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
