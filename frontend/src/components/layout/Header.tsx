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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import Link from "next/link";

const links = [
  { link: "/features", label: "Features" },
  {
    link: "#1",
    label: "Learn",
    links: [
      { link: "/docs", label: "Documentation" },
      { link: "/resources", label: "Resources" },
    ],
  },
  { link: "/about", label: "About" },
  { link: "/pricing", label: "Pricing" },
  
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} component={Link} href={item.link}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton className={classes.link}>
              <Center>
                <span>{link.label}</span>
                <IconChevronDown
                  size={12}
                  stroke={1.5}
                  className={classes.chevron}
                />
              </Center>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

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
          <Group gap={32} visibleFrom="sm" className={classes.links}>
            {items}
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
