"use client";

import {
  IconCheck,
  IconShield,
  IconTrophy,
  IconUsers,
} from "@tabler/icons-react";
import {
  Button,
  Container,
  Group,
  Image,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import classes from "./About.module.css";
import Link from "next/link";

export function About() {
  return (
    <Container size="lg" py={100} id="about">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Transform Your{" "}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "accent.6", to: "primary.9" }}
              inherit
            >
              Procurement Process
            </Text>{" "}
            with TenderFlow
          </Title>

          <Text c="dimmed" mt="md">
            TenderFlow is a comprehensive tender management platform designed to
            streamline your procurement workflow. We combine powerful features
            with an intuitive interface to make tender management efficient and
            effective.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon
                size={20}
                radius="xl"
                variant="gradient"
                gradient={{ from: "accent.6", to: "primary.9" }}
              >
                <IconCheck size={12} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Trusted by Industry Leaders</b> – Join hundreds of companies
              who have transformed their tender management process with
              TenderFlow
            </List.Item>
            <List.Item>
              <b>Compliance and Security</b> – Built with industry-standard
              security protocols and compliance requirements in mind
            </List.Item>
            <List.Item>
              <b>24/7 Support</b> – Our dedicated support team is always
              available to help you get the most out of TenderFlow
            </List.Item>
          </List>

          
        </div>

        <div className={classes.image}>
          <Image
            src="/about-illustration.svg"
            alt="TenderFlow Platform"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </Container>
  );
}
