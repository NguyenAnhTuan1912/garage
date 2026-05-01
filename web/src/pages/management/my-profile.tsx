import { useState, useEffect } from "react";
import { useParams } from "react-router";

// Import UI components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProfileEditDialog from "./components/profile-edit-dialog";

// Import states & types
import { useUserState } from "@/modules/user/state";
import type { TUser } from "@/modules/user/type";

export default function MyProfilePage() {
  const params = useParams();
  const { data: user } = useUserState();

  // Lưu ý: Nếu user từ state thay đổi, profile này nên được cập nhật
  // Ở đây mình dùng trực tiếp 'user' hoặc có thể dùng state nếu bạn muốn quản lý edit tạm thời
  const [profile, setProfile] = useState<TUser | undefined>(user);

  useEffect(() => {
    console.log("Profile id:", params.profileId);
    if (params.profileId === "me") {
      setProfile(user);
    } else {
      // Logic fetch profile của user khác nếu cần thiết
    }
  }, [params.profileId, user]);

  if (!profile) return <div>Loading...</div>;

  return (
    <section className="flex flex-col w-full bg-background">
      <div className="w-full sm:max-w-[600px] flex flex-col py-8 px-4 mx-auto space-y-8">
        {/* Header: Avatar & Basic Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary/10">
              <AvatarImage src={profile?.photo} alt={profile?.fullName} />
              <AvatarFallback className="text-xl">
                {profile?.fullName?.substring(0, 2).toUpperCase() || "CN"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">
                {profile?.fullName}
              </h2>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground">@{profile?.username}</p>
                <Badge variant="secondary">{profile?.role?.name}</Badge>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            Copy URL
          </Button>
        </div>

        <Separator />

        {/* Information Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight">
              Personal Information
            </h3>
            <ProfileEditDialog profile={profile} profileId={params.profileId} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Gender
              </p>
              <p className="text-base capitalize">
                {profile?.gender || "Not specified"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Birthdate
              </p>
              <p className="text-base">
                {profile?.birthDate
                  ? new Date(profile.birthDate).toLocaleDateString("vi-VN")
                  : "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Account Status
              </p>
              <p className="text-base">Active</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Danger Zone / Account Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-destructive">
            Account Settings
          </h3>
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 space-y-4">
            <div className="flex flex-col space-y-1">
              <Button
                className="w-fit cursor-pointer text-destructive p-0 h-auto font-semibold hover:no-underline"
                variant="link"
              >
                Deactivate my account
              </Button>
              <p className="text-sm text-muted-foreground">
                Deactivating will suspend your account until you sign back in.
              </p>
            </div>

            <div className="flex flex-col space-y-1">
              <Button
                className="w-fit cursor-pointer text-destructive p-0 h-auto font-semibold hover:no-underline"
                variant="link"
              >
                Delete my account
              </Button>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all of your content. This
                action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <footer className="pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} — Tnditor</p>
        </footer>
      </div>
    </section>
  );
}
