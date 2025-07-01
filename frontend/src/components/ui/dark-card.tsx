"use client";

import { Card, Text, Button, Group } from "@mantine/core";

export function DarkCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} size="lg" c="accent.0">
          Dark Theme Example
        </Text>
      </Group>

      <Text size="sm" c="dimmed">
        This is an example of how components look in dark mode with our custom
        color palette.
      </Text>

      <Button
        fullWidth
        mt="md"
        radius="md"
        variant="gradient"
        gradient={{ from: "accent.6", to: "primary.9" }}
      >
        Dark Button
      </Button>
    </Card>
  );
}
