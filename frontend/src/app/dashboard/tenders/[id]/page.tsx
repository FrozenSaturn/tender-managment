// frontend/src/app/dashboard/tenders/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTenderDetails, getTenderApplications } from "@/libs/api";
import { Suspense } from "react";
import {
  Container,
  Title,
  Text,
  Card,
  Badge,
  Group,
  Avatar,
  Paper,
  Stack,
  Button,
  Loader,
  Alert,
  Divider,
  rem,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconCalendar,
  IconCoin,
  IconFileDescription,
  IconBuildingFactory,
} from "@tabler/icons-react";
import classes from "./TenderApplications.module.css";

type Application = {
  id: number;
  proposal: string;
  companyName: string;
  companyLogo?: string;
};

type TenderDetails = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  budget?: number;
};

function ApplicationsContent({ id }: { id: string }) {
  const [tender, setTender] = useState<TenderDetails | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tenderData, applicationsData] = await Promise.all([
          getTenderDetails(parseInt(id)),
          getTenderApplications(parseInt(id)),
        ]);
        setTender(tenderData);
        setApplications(applicationsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load tender details and applications");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Loader size="lg" />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Alert title="Error" color="red">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!tender) {
    return (
      <Container size="lg" py="xl">
        <Alert title="Not Found" color="red">
          Tender not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      {/* Back Button */}
      <Button
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        onClick={() => router.push("/dashboard")}
        mb="lg"
      >
        Back to My Tenders
      </Button>

      {/* Tender Details Card */}
      <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
        <Stack gap="md">
          <Title order={2}>{tender.title}</Title>

          <Group gap="lg">
            <Group gap="xs">
              <IconCalendar
                size={18}
                style={{ color: "var(--mantine-color-blue-6)" }}
              />
              <Text size="sm" c="dimmed">
                Deadline:{" "}
                {new Date(tender.deadline).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Group>

            {tender.budget && (
              <Group gap="xs">
                <IconCoin
                  size={18}
                  style={{ color: "var(--mantine-color-green-6)" }}
                />
                <Badge color="green" variant="light" size="lg">
                  ${tender.budget.toLocaleString()}
                </Badge>
              </Group>
            )}
          </Group>

          <Group gap="xs">
            <IconFileDescription
              size={18}
              style={{ color: "var(--mantine-color-gray-6)" }}
            />
            <Text>{tender.description}</Text>
          </Group>
        </Stack>
      </Card>

      {/* Applications Section */}
      <Paper shadow="sm" radius="md" withBorder>
        <Group justify="space-between" p="md" pb="xs">
          <Title order={3}>Applications ({applications.length})</Title>
        </Group>

        <Divider />

        {applications.length > 0 ? (
          <Stack gap={0}>
            {applications.map((application, index) => (
              <div key={application.id}>
                {index > 0 && <Divider />}
                <Paper p="md">
                  <Stack gap="md">
                    <Group>
                      <Avatar
                        src={application.companyLogo}
                        size="lg"
                        radius="xl"
                      >
                        {application.companyName[0]}
                      </Avatar>
                      <div>
                        <Group gap="xs">
                          <IconBuildingFactory
                            size={16}
                            style={{ color: "var(--mantine-color-blue-6)" }}
                          />
                          <Text fw={500} size="lg">
                            {application.companyName}
                          </Text>
                        </Group>
                      </div>
                    </Group>

                    <Text className={classes.proposal}>
                      {application.proposal}
                    </Text>
                  </Stack>
                </Paper>
              </div>
            ))}
          </Stack>
        ) : (
          <Paper p="xl">
            <Text c="dimmed" ta="center">
              No applications received yet.
            </Text>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}

export default function TenderApplicationsPage() {
  const { id } = useParams() as { id: string };

  return (
    <Suspense
      fallback={
        <Container size="lg" py="xl">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Loader size="lg" />
          </div>
        </Container>
      }
    >
      <ApplicationsContent id={id} />
    </Suspense>
  );
}
