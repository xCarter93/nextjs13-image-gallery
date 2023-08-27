import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
	title: "Static Fetching - NextJS 13.4 Image Gallery",
};

export default async function StaticPage() {
	const response = await fetch(
		`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
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
				This page <strong>fetches and caches data at build time</strong>. Even
				though the Unsplash API always returns a new image, we see the same
				image after refreshing the page until we compile the project again.
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
