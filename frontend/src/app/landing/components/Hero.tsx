"use client";
import { Button, Container, Text, Title } from "@mantine/core";
import { Dots } from "./Dots";
import classes from "./Hero.module.css";
import { useRouter } from "next/navigation";

export function HeroText() {
  const router = useRouter();
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Streamline{" "}
          <Text component="span" className={classes.highlight} inherit>
            Tender Management
          </Text>{" "}
          Process
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Transform your procurement workflow with our comprehensive platform.
            Create, manage, and track tenders efficiently while connecting with
            qualified contractors all in one place.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
            onClick={() => router.push("/auth/signup")}
          >
            Get Started
          </Button>
          <Button
            className={classes.control}
            size="lg"
            onClick={() => router.push("/about")}
          >
            Learn More
          </Button>
        </div>
      </div>
    </Container>
  );
}
