import { useEffect } from "react";

// Import components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileEditDialog from "./profile-edit-dialog";

// Import types
import type { TUser } from "@/modules/user/type";

export type TProfileDetailProps = {
  profileId?: string;
  profile?: TUser;
};

export default function ProfileDetail(props: TProfileDetailProps) {
  useEffect(() => {
    console.log("Profile id:", props.profileId);

    if (props.profileId === "me") return;
  }, [props.profileId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Avatar className="size-18">
            <AvatarImage src={props.profile?.photo} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <p>{props.profile?.fullName}</p>
          <Badge>{props.profile?.role.name}</Badge>
        </CardDescription>
        <CardAction>
          <Button className="cursor-pointer" variant="link">
            Copy URL
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="w-full mb-4">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Information
          </h4>

          <div className="w-full my-2 border-t" />

          <div className="grid grid-cols-2 gap-y-4">
            <div className="w-full flex flex-col items-center justify-between">
              <p className="w-full text-left font-semibold leading-7">Gender</p>
              <div className="w-full flex items-center justify-between">
                <p className="w-full text-left leading-7">
                  {props.profile?.gender}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-between">
              <p className="w-full text-left font-semibold leading-7">
                Birthdate
              </p>
              <div className="w-full flex items-center justify-between">
                <p className="w-full text-left leading-7">
                  {props.profile?.birthDate
                    ? new Date(props.profile?.birthDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-between">
              <p className="w-full text-left font-semibold leading-7">
                Username
              </p>
              <div className="w-full flex items-center justify-between">
                <p className="w-full text-left leading-7">
                  {props.profile?.username}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mt-4">
            <ProfileEditDialog {...props} />
          </div>
        </div>

        <div className="w-full">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Other
          </h4>

          <div className="w-full my-2 border-t" />

          <div className="w-full flex flex-col items-center justify-between">
            <div className="w-full mb-2">
              <Button
                className="cursor-pointer text-destructive p-0"
                variant="link"
              >
                Deactivate my account
              </Button>
              <p className="text-sm">
                Deactivating will suspend your account until you sign back in.
              </p>
            </div>
            <div className="w-full">
              <Button
                className="cursor-pointer text-destructive p-0"
                variant="link"
              >
                Delete my account
              </Button>
              <p className="text-sm">
                Permanently delete your account and all of your content.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="leading-7 text-muted-foreground">Profile</p>
      </CardFooter>
    </Card>
  );
}
