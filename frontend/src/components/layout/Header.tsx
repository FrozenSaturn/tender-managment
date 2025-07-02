"use client";

import { IconChevronDown } from "@tabler/icons-react";
import {
  Burger,
  Center,
  Container,
  Group,
  Menu,
  Text,
  UnstyledButton,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import Link from "next/link";

const links = [
  { link: "/features", label: "Features" },
  { link: "/about", label: "About" },
  { link: "/pricing", label: "Pricing" },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="lg">
        <div className={classes.inner}>
          <Text
            component={Link}
            href="/"
            size="xl"
            fw={700}
            variant="gradient"
            gradient={{ from: "accent.6", to: "primary.9" }}
            className={classes.logo}
          >
            TenderFlow
          </Text>

          <Group gap={32} visibleFrom="sm">
            <Group gap={32} className={classes.links}>
              {items}
            </Group>
            <Group>
              <Button component={Link} href="/auth/login" variant="subtle">
                Log in
              </Button>
              <Button component={Link} href="/auth/signup">
                Sign up
              </Button>
            </Group>
          </Group>

          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            color="var(--mantine-color-accent-0)"
          />
        </div>
      </Container>
    </header>
  );
}
