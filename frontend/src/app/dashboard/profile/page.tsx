// frontend/src/app/dashboard/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Title,
  Paper,
  TextInput,
  Textarea,
  Button,
  Stack,
  Select,
  Alert,
  Text,
  Card,
  Group,
  Badge,
  FileInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getMyCompanyProfile, updateCompanyProfile } from "@/libs/api";
import {
  IconBuilding,
  IconBuildingFactory,
  IconFileDescription,
  IconCheck,
  IconX,
  IconUpload,
} from "@tabler/icons-react";

// List of industries (you can expand this list)
const INDUSTRIES = [
  "Technology",
  "Manufacturing",
  "Construction",
  "Healthcare",
  "Finance",
  "Retail",
  "Energy",
  "Transportation",
  "Education",
  "Agriculture",
  "Other",
].map((industry) => ({ value: industry, label: industry }));

type CompanyProfile = {
  id: number;
  name: string;
  industry: string;
  description: string;
  logo?: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    description: "",
    logo: null as File | null,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyCompanyProfile();
        setProfile(data);
        setFormData({
          name: data.name,
          industry: data.industry,
          description: data.description,
          logo: data.logo ? new File([], data.logo) : null,
        });
      } catch (error) {
        console.error(error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await updateCompanyProfile({
        id: profile?.id || 0,
        name: formData.name,
        industry: formData.industry,
        description: formData.description,
        logo: formData.logo || undefined,
      });
      setProfile({
        ...profile!,
        name: formData.name,
        industry: formData.industry,
        description: formData.description,
        logo: profile?.logo,
      });
      setIsEditing(false);
      notifications.show({
        title: "Success",
        message: "Profile updated successfully",
        color: "green",
        icon: <IconCheck size={16} />,
      });
    } catch (error) {
      console.error(error);
      setError("Failed to update profile");
      notifications.show({
        title: "Error",
        message: "Failed to update profile",
        color: "red",
        icon: <IconX size={16} />,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container size="md" py="xl">
        <Text ta="center">Loading profile...</Text>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container size="md" py="xl">
        <Alert color="red" title="Error">
          Failed to load profile. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Title order={2}>Company Profile</Title>

        {!isEditing ? (
          // View Mode
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              <Group>
                <IconBuilding
                  size={24}
                  style={{ color: "var(--mantine-color-blue-6)" }}
                />
                <div>
                  <Text size="sm" fw={500} c="dimmed">
                    Company Name
                  </Text>
                  <Text size="lg" fw={500}>
                    {profile.name}
                  </Text>
                </div>
              </Group>

              {profile.logo && (
                <Group>
                  <img
                    src={profile.logo}
                    alt={`${profile.name} logo`}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #eee",
                      background: "#fff",
                    }}
                  />
                </Group>
              )}

              <Group>
                <IconBuildingFactory
                  size={24}
                  style={{ color: "var(--mantine-color-blue-6)" }}
                />
                <div>
                  <Text size="sm" fw={500} c="dimmed">
                    Industry
                  </Text>
                  <Badge size="lg" radius="sm">
                    {profile.industry}
                  </Badge>
                </div>
              </Group>

              <Group align="flex-start">
                <IconFileDescription
                  size={24}
                  style={{ color: "var(--mantine-color-blue-6)" }}
                />
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500} c="dimmed">
                    Company Description
                  </Text>
                  <Paper withBorder p="md" mt={4}>
                    <Text>{profile.description}</Text>
                  </Paper>
                </div>
              </Group>

              <Button onClick={() => setIsEditing(true)} mt="md">
                Edit Profile
              </Button>
            </Stack>
          </Card>
        ) : (
          // Edit Mode
          <Paper shadow="sm" p="md" withBorder>
            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <TextInput
                  label="Company Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter company name"
                  required
                />

                <Select
                  label="Industry"
                  placeholder="Select your industry"
                  data={INDUSTRIES}
                  value={formData.industry}
                  onChange={(value) =>
                    setFormData({ ...formData, industry: value || "" })
                  }
                  searchable
                  required
                />

                <Textarea
                  label="Company Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe your company..."
                  minRows={4}
                  required
                />

                <FileInput
                  label="Company Logo"
                  placeholder="Upload your company logo"
                  accept="image/*"
                  value={formData.logo}
                  onChange={(file) => setFormData({ ...formData, logo: file })}
                  clearable
                />

                {error && (
                  <Alert color="red" title="Error">
                    {error}
                  </Alert>
                )}

                <Group justify="flex-end" gap="sm">
                  <Button
                    variant="light"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: profile.name,
                        industry: profile.industry,
                        description: profile.description,
                        logo: profile.logo ? new File([], profile.logo) : null,
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" loading={saving}>
                    Save Changes
                  </Button>
                </Group>
              </Stack>
            </form>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
