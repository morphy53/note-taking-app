"use client";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const BackButton = () => {
	const router = useRouter();
	return (
		<Button variant={"ghost"} onClick={() => router.back()}>
			<ArrowBigLeft /> Go Back
		</Button>
	);
};

export default BackButton;
