"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppShell,
  Text,
  UnstyledButton,
  Group,
  rem,
  Title,
  Card,
  Badge,
  Button,
  Stack,
} from "@mantine/core";
import {
  IconUser,
  IconFileDescription,
  IconPlus,
  IconSearch,
  IconLogout,
  IconEye,
  IconBuilding,
  IconBuildingFactory,
  IconEdit,
} from "@tabler/icons-react";
import { getMyCompanyProfile, getAllTenders, createTender } from "@/libs/api";
import classes from "./NavbarSimple.module.css";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { DateInput } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";

type CompanyProfile = {
  id: number;
  name: string;
  industry: string;
  description: string;
};

type Tender = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  budget?: number;
  companyName: string;
};

interface NavbarLinkProps {
  icon: typeof IconUser;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <UnstyledButton
      className={`${classes.link} ${active ? classes.active : ""}`}
      onClick={onClick}
    >
      <Group>
        <Icon size={20} stroke={1.5} />
        <Text size="sm" fw={500}>
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  );
}

type ActiveSection = "profile" | "myTenders" | "newTender" | "browseTenders";

function ProfileSection({ profile }: { profile: CompanyProfile }) {
  const router = useRouter();

  return (
    <Stack>
      <Title order={2}>Company Profile</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Group>
            <IconBuilding
              size={18}
              style={{ color: "var(--mantine-color-blue-6)" }}
            />
            <div>
              <Text size="sm" fw={500} c="dimmed">
                Company Name
              </Text>
              <Text fw={500}>{profile.name}</Text>
            </div>
          </Group>

          <Group>
            <IconBuildingFactory
              size={18}
              style={{ color: "var(--mantine-color-blue-6)" }}
            />
            <div>
              <Text size="sm" fw={500} c="dimmed">
                Industry
              </Text>
              <Badge>{profile.industry}</Badge>
            </div>
          </Group>

          <Text lineClamp={3}>{profile.description}</Text>

          <Button
            onClick={() => router.push("/dashboard/profile")}
            leftSection={<IconEdit size={16} />}
            variant="light"
          >
            Edit Profile
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
}

function MyTendersSection({
  tenders,
  companyName,
}: {
  tenders: Tender[];
  companyName: string;
}) {
  const myTenders = tenders.filter(
    (tender) => tender.companyName === companyName
  );
  const router = useRouter();

  return (
    <Stack>
      <Title order={2}>My Tenders</Title>
      <div
        style={{
          display: "grid",
          gap: rem(16),
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {myTenders.map((tender) => (
          <Card key={tender.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="sm">
              <Title order={3} lineClamp={2}>
                {tender.title}
              </Title>
              <Text size="sm" c="dimmed" lineClamp={3}>
                {tender.description}
              </Text>
              {tender.budget && (
                <Badge color="green" variant="light">
                  ${tender.budget.toLocaleString()}
                </Badge>
              )}
              <Text size="sm" c="dimmed">
                Deadline: {new Date(tender.deadline).toLocaleDateString()}
              </Text>
              <Button
                variant="light"
                color="blue"
                leftSection={<IconEye size={16} />}
                onClick={() => router.push(`/dashboard/tenders/${tender.id}`)}
                fullWidth
              >
                View Applications
              </Button>
            </Stack>
          </Card>
        ))}
        {myTenders.length === 0 && (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text c="dimmed" ta="center">
              You haven't created any tenders yet.
            </Text>
          </Card>
        )}
      </div>
    </Stack>
  );
}

function NewTenderSection() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    budget: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert budget to number or undefined if empty
      const budget = formData.budget ? parseFloat(formData.budget) : undefined;

      await createTender({
        title: formData.title,
        description: formData.description,
        deadline: formData.deadline,
        budget,
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        deadline: "",
        budget: "",
      });

      notifications.show({
        title: "Success",
        message: "Tender created successfully",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message:
          error instanceof Error ? error.message : "Failed to create tender",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Stack>
      <Title order={2}>Create New Tender</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <div>
              <Text size="sm" fw={500} mb={4}>
                Title
              </Text>
              <input
                type="text"
                className="mantine-Input-input"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                placeholder="Enter tender title"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "var(--mantine-color-dark-6)",
                }}
              />
            </div>

            <div>
              <Text size="sm" fw={500} mb={4}>
                Description
              </Text>
              <textarea
                className="mantine-Textarea-input"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
                placeholder="Enter tender description"
                rows={5}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "var(--mantine-color-dark-6)",
                  resize: "vertical",
                }}
              />
            </div>

            <div>
              <Text size="sm" fw={500} mb={4}>
                Deadline
              </Text>
              <DateInput
                value={formData.deadline ? new Date(formData.deadline) : null}
                onChange={(date) =>
                  handleChange("deadline", date ? date.toISOString() : "")
                }
                required
                placeholder="Select deadline"
                minDate={new Date()}
              />
            </div>

            <div>
              <Text size="sm" fw={500} mb={4}>
                Budget (Optional)
              </Text>
              <input
                type="number"
                className="mantine-Input-input"
                value={formData.budget}
                onChange={(e) => handleChange("budget", e.target.value)}
                placeholder="Enter budget amount"
                min="0"
                step="0.01"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "var(--mantine-color-dark-6)",
                }}
              />
            </div>

            <Button
              type="submit"
              loading={loading}
              disabled={
                !formData.title || !formData.description || !formData.deadline
              }
            >
              Create Tender
            </Button>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
}

function BrowseTendersSection({
  tenders,
  companyName,
}: {
  tenders: Tender[];
  companyName: string;
}) {
  const otherTenders = tenders.filter(
    (tender) => tender.companyName !== companyName
  );

  return (
    <Stack>
      <Title order={2}>Available Tenders</Title>
      <Text c="dimmed" size="sm">
        Browse and apply for tenders from other companies
      </Text>
      <div
        style={{
          display: "grid",
          gap: rem(16),
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {otherTenders.map((tender) => (
          <Card key={tender.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="sm">
              <Title order={3} lineClamp={2}>
                {tender.title}
              </Title>

              <Text size="sm" c="dimmed" lineClamp={3}>
                {tender.description}
              </Text>

              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  By: {tender.companyName}
                </Text>
                {tender.budget && (
                  <Badge color="green" variant="light">
                    ${tender.budget.toLocaleString()}
                  </Badge>
                )}
              </Group>

              <Text size="sm" c="dimmed">
                Deadline: {new Date(tender.deadline).toLocaleDateString()}
              </Text>

              <Button
                component={Link}
                href={`/tenders/${tender.id}`}
                variant="light"
                fullWidth
              >
                View Details & Apply
              </Button>
            </Stack>
          </Card>
        ))}
      </div>
    </Stack>
  );
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] =
    useState<ActiveSection>("browseTenders");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [profileData, tendersData] = await Promise.all([
          getMyCompanyProfile(),
          getAllTenders(),
        ]);
        setProfile(profileData);
        setTenders(tendersData.data);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return profile && <ProfileSection profile={profile} />;
      case "myTenders":
        return (
          <MyTendersSection
            tenders={tenders}
            companyName={profile?.name || ""}
          />
        );
      case "newTender":
        return <NewTenderSection />;
      case "browseTenders":
        return (
          <BrowseTendersSection
            tenders={tenders}
            companyName={profile?.name || ""}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <AppShell
      padding="md"
      navbar={{
        width: { base: 300 },
        breakpoint: "sm",
        collapsed: { mobile: false },
      }}
    >
      <Notifications position="top-right" />
      <AppShell.Navbar p="xs">
        <AppShell.Section mt="xs">
          <Title order={4} p="md" c="accent.5">
            Welcome, {profile?.name}!
          </Title>
        </AppShell.Section>
        <AppShell.Section grow mt="md">
          <NavbarLink
            icon={IconUser}
            label="Manage Profile"
            active={activeSection === "profile"}
            onClick={() => setActiveSection("profile")}
          />
          <NavbarLink
            icon={IconFileDescription}
            label="My Tenders"
            active={activeSection === "myTenders"}
            onClick={() => setActiveSection("myTenders")}
          />
          <NavbarLink
            icon={IconPlus}
            label="Create New Tender"
            active={activeSection === "newTender"}
            onClick={() => setActiveSection("newTender")}
          />
          <NavbarLink
            icon={IconSearch}
            label="Browse All Tenders"
            active={activeSection === "browseTenders"}
            onClick={() => setActiveSection("browseTenders")}
          />
        </AppShell.Section>
        <AppShell.Section>
          <UnstyledButton
            className={classes.link}
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/auth/login");
            }}
          >
            <Group>
              <IconLogout size={20} stroke={1.5} />
              <Text size="sm" fw={500}>
                Logout
              </Text>
            </Group>
          </UnstyledButton>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <div style={{ padding: rem(20) }}>{renderContent()}</div>
      </AppShell.Main>
    </AppShell>
  );
}
