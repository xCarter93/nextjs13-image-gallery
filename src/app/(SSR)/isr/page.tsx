import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
	title: "Incremental Static Regeneration - NextJS 13.4 Image Gallery",
};

export const revalidate = 15;

export default async function DynamicPage() {
	const response = await fetch(
		`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
		{
			//next: {revalidate: 15}
		}
	);
	const image: UnsplashImage = await response.json();

	const width = Math.min(500, image.width);
	const height = (width / image.width) * image.height;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Alert>
				This page uses <strong>incremental static regeneration</strong>. A new
				image is fetched every 15 seconds (after refreshing the page) and then
				served from the cache for that duration.
			</Alert>
			<Image
				src={image.urls.raw}
				width={width}
				height={height}
				alt={image.description}
				className="rounded shadow min-w-full h-full mb-4"
			/>
			by{" "}
			<Link href={`/users/${image.user.username}`}>{image.user.username}</Link>
		</div>
	);
}
