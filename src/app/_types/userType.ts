import { z } from 'zod';
import { pageInfoSchema } from './adminType';

export const reviewInfoForMemberSchema = z.object({
  reviewId: z.number(),
  wktId: z.number(),
  reviewer: z.string(),
  wktTitle: z.string(),
  wktPlace: z.string(),
  department: z.string(),
  rating: z.number(),
  content: z.string(),
  lastModifiedAt: z.string(),
});

export const reviewInfosForMemberSchema = z.object({
  reviewInfosForMember: z.array(reviewInfoForMemberSchema),
  pageInfo: pageInfoSchema,
});

// Type

export type ReviewInfoForMemberType = z.infer<typeof reviewInfoForMemberSchema>;
