"use server";

import { db } from "@/lib/db";
import { z } from "zod";

export const GetSpacesSchema = z.object({
  userId: z.string().uuid(),
});

export const getUserSpaces = async (
  values: z.infer<typeof GetSpacesSchema>,
) => {
  const validatedFields = GetSpacesSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid user ID!" };
  }

  const { userId } = validatedFields.data;

  try {
    const userSpaces = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        userSpaces: {
          select: {
            space: {
              select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            role: true,
          },
        },
      },
    });

    if (!userSpaces) {
      return { error: "User not found!" };
    }

    return {
      success: true,
      spaces: userSpaces.userSpaces.map((userSpace) => ({
        id: userSpace.space.id,
        name: userSpace.space.name,
        description: userSpace.space.description,
        createdAt: userSpace.space.createdAt,
        updatedAt: userSpace.space.updatedAt,
        role: userSpace.role,
      })),
    };
  } catch (error) {
    console.error("Error fetching user spaces:", error);
    return { error: "Something went wrong!" };
  }
};

export const CreateSpaceSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  description: z.string().optional(),
  userId: z.string().uuid("Invalid user ID"),
});

export const createSpace = async (
  values: z.infer<typeof CreateSpaceSchema>,
) => {
  const validatedFields = CreateSpaceSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, description, userId } = validatedFields.data;

  try {
    const space = await db.space.create({
      data: {
        name,
        description,
        userSpaces: {
          create: {
            userId,
            role: "ADMIN",
          },
        },
      },
      include: {
        userSpaces: true,
      },
    });

    return {
      success: true,
      space,
    };
  } catch (error) {
    console.error("Error creating space:", error);
    return { error: "Failed to create space!" };
  }
};
