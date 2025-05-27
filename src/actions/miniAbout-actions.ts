'use server';

import prisma from '@/app/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const SkillSchema = z.object({
  name: z.string().min(1),
  icon: z.string().optional(),
  description: z.string(),
  experience: z.string(),
});

const SkillsCategorySchema = z.object({
  name: z.string().min(1),
  skills: z.array(SkillSchema),
});

const ExperienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  period: z.string(),
  description: z.string(),
  iconKey: z.string(),
});

const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  description: z.string(),
  period: z.string(),
  iconKey: z.string(),
});

const MiniAboutSchema = z.object({
  userId: z.string().min(1),
  about: z.array(z.string().min(1)),
  skillsCategory: z.array(SkillsCategorySchema),
  experiences: z.array(ExperienceSchema),
  educations: z.array(EducationSchema),
});

export async function createMiniAbout(_: any, formData: FormData) {
  const userId = formData.get('userId') as string;
  const about = formData.getAll('about') as string[];

  const skillsRaw = formData.getAll('skillsCategory') as string[];
  const experiencesRaw = formData.getAll('experiences') as string[];
  const educationsRaw = formData.getAll('educations') as string[];

  const skillsCategory = skillsRaw.map((s) => JSON.parse(s));
  const experiences = experiencesRaw.map((e) => JSON.parse(e));
  const educations = educationsRaw.map((e) => JSON.parse(e));

  const parsed = MiniAboutSchema.safeParse({
    userId,
    about,
    skillsCategory,
    experiences,
    educations,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.format() };
  }

  try {
    await prisma.miniAbout.create({
      data: {
        userId,
        about: parsed.data.about,
        skillsCategory: parsed.data.skillsCategory,
        experiences: parsed.data.experiences,
        educations: parsed.data.educations,
      },
    });

    revalidatePath('/dashboard');
    return { success: true, message: 'MiniAbout created successfully!' };
  } catch (error) {
    return { success: false, error: 'Failed to create MiniAbout.' };
  }
}
