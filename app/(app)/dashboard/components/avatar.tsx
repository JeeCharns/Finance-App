import { createClient } from "@/lib/supabase/server";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import type { ComponentProps } from "react";

type AvatarProps = Partial<
  Pick<ComponentProps<typeof Image>, "width" | "height" | "className">
>;

export default async function Avatar({ width = 32, height = 32 }: AvatarProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const avatarPath = user?.user_metadata?.avatar;
  if (!avatarPath) {
    return <CircleUser className="w-6 h-6" />;
  }

  const { data, error } = await supabase.storage
    .from("avatars")
    .createSignedUrl(avatarPath, 300);

  if (error || !data?.signedUrl) {
    return <CircleUser className="w-6 h-6" />;
  }

  return (
    <Image
      src={data.signedUrl}
      width={width}
      height={height}
      alt="User avatar"
      className="rounded-full"
    />
  );
}
