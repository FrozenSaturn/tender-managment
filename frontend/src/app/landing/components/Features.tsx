"use client";

import {
  IconFileCheck,
  IconUsers,
  IconChartBar,
  IconClipboardCheck,
  IconBuildingBank,
  IconShieldCheck,
} from "@tabler/icons-react";
import { Container, SimpleGrid, Text } from "@mantine/core";
import classes from "./Features.module.css";

interface FeatureProps extends React.ComponentPropsWithoutRef<"div"> {
  icon: React.FC<any>;
  title: string;
  description: string;
}

function Feature({
  icon: Icon,
  title,
  description,
  className,
  ...others
}: FeatureProps) {
  return (
    <div className={classes.feature} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={38} className={classes.icon} stroke={1.5} />
        <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text c="dimmed" fz="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const features = [
  {
    icon: IconFileCheck,
    title: "Streamlined Tender Creation",
    description:
      "Customize requirements, set deadlines, and manage documentation all in one place.",
  },
  {
    icon: IconUsers,
    title: "Contractor Management",
    description:
      "Connect with contractors, review proposals, and manage communications efficiently.",
  },
  {
    icon: IconChartBar,
    title: "Analytics & Reporting",
    description:
      "Track tender performance, contractor engagement, and make decisions.",
  },
  {
    icon: IconClipboardCheck,
    title: "Compliance Tracking",
    description:
      "Ensure all tenders meet regulatory requirements with built-in compliance checks and documentation management features.",
  },
  {
    icon: IconBuildingBank,
    title: "Enterprise Integration",
    description:
      "Seamlessly integrate with your existing enterprise systems. Compatible with major ERP and procurement platforms.",
  },
  {
    icon: IconShieldCheck,
    title: "Secure & Transparent",
    description:
      "Bank-grade security for all tender processes. Maintain complete audit trails and ensure transparency in all transactions.",
  },
];

export function Features() {
  const items = features.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container size="lg" py={100} id="features">
      <Text
        className={classes.sectionTitle}
        ta="center"
        mb={50}
        fz={40}
        fw={700} 
      >
        Why Choose{" "}
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: "accent.6", to: "primary.9" }}
          inherit
        >
          TenderFlow
        </Text>
      </Text>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing={{ base: 30, sm: 50 }}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
}
