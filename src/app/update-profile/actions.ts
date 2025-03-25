"use server"

import { prisma } from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getCurrentUserAction = async () => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) throw new Error("Unauthorized");

	const currentUser = await prisma.user.findUnique({
		where: {
			id: user.id,
		}
	})

	return currentUser;
}

export const updateUserProfileAction = async ({ name, image }: { name: string, image: string }) => {
	if (!name && !image) throw new Error("Already up to date");

	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) throw new Error("Unauthorized");

	const updatedFields: Partial<User> = {};

	if (name) updatedFields.name = name;
	if (image) updatedFields.image = image;

	const updatedUser = await prisma.user.update({
		where: {
			id: user.id,
		},
		data: updatedFields,
	})

	// update the cache
	revalidatePath("/update-profile");

	return { success: true, user: updatedUser }
}