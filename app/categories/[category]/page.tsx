import { redirect } from "next/navigation";

interface CategoryDetailPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { category } = await params;
  redirect(`/documents?category=${encodeURIComponent(category)}`);
}
