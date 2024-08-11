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

export const raffleMemberIndexInfosSchema = z.object({
  accountId: z.string(),
  raffleIndex: z.number(),
});
export const rafflePickedIndexInfosSchema = z.object({
  accountId: z.string(),
  pickedIndex: z.number(),
});
export const raffleWinnerInfosSchema = z.object({
  accountId: z.string(),
});
export const workationRaffleSchema = z.object({
  wktId: z.number(),
  raffleMemberIndexInfos: z.array(raffleMemberIndexInfosSchema),
  rafflePickedIndexInfos: z.array(rafflePickedIndexInfosSchema),
  raffleWinnerInfos: z.array(raffleWinnerInfosSchema),
});

// Type

export type ReviewInfoForMemberType = z.infer<typeof reviewInfoForMemberSchema>;
