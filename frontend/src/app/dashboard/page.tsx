"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
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
} from "@tabler/icons-react";
import { getMyCompanyProfile, getAllTenders } from "@/libs/api";
import classes from "./NavbarSimple.module.css";

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
  href: string;
}

function NavbarLink({ icon: Icon, label, active, href }: NavbarLinkProps) {
  return (
    <Link href={href} className={classes.linkWrapper}>
      <UnstyledButton
        className={`${classes.link} ${active ? classes.active : ""}`}
      >
        <Group>
          <Icon size={20} stroke={1.5} />
          <Text size="sm" fw={500}>
            {label}
          </Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

const navLinks = [
  { icon: IconUser, label: "Manage Profile", href: "/dashboard/profile" },
  {
    icon: IconFileDescription,
    label: "My Tenders",
    href: "/dashboard/tenders",
  },
  {
    icon: IconPlus,
    label: "Create New Tender",
    href: "/dashboard/tenders/new",
  },
  {
    icon: IconSearch,
    label: "Browse All Tenders",
    href: "/tenders",
  },
];

export default function DashboardPage() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

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
      <AppShell.Navbar p="xs">
        <AppShell.Section mt="xs">
          <Title order={4} p="md" c="accent.5">
            Welcome, {profile?.name}!
          </Title>
        </AppShell.Section>
        <AppShell.Section grow mt="md">
          {navLinks.map((link) => (
            <NavbarLink
              key={link.label}
              {...link}
              active={pathname === link.href}
            />
          ))}
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
        <div style={{ padding: rem(20) }}>
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
              {tenders
                .filter((tender) => tender.companyName !== profile?.name) // Don't show own tenders
                .map((tender) => (
                  <Card
                    key={tender.id}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                  >
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
                        Deadline:{" "}
                        {new Date(tender.deadline).toLocaleDateString()}
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
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
