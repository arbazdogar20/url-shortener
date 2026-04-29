import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001";


  const { slug } = await params;
  const res = await fetch(`${serverUrl}/url/${slug}`);
  if (res.ok) {
    const data = await res.json();
    if (data.url.includes("http://") || data.url.includes("https://")) {
      redirect(data.url);
    } else {
      redirect(`http://${data.url}`);
    }
  } else {
    redirect("/");
  }
}
