import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { Announcement, AnnouncementInput, BanUpdate, HealthStatus, JoinInput, Law, LawInput, Member, RankUpdate } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: Parameters<typeof customFetch>[1]) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListMembersUrl: () => string;
/**
 * @summary List all members
 */
export declare const listMembers: (options?: Parameters<typeof customFetch>[1]) => Promise<Member[]>;
export declare const getListMembersQueryKey: () => readonly ["/api/members"];
export declare const getListMembersQueryOptions: <TData = Awaited<ReturnType<typeof listMembers>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMembers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listMembers>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListMembersQueryResult = NonNullable<Awaited<ReturnType<typeof listMembers>>>;
export type ListMembersQueryError = ErrorType<unknown>;
/**
 * @summary List all members
 */
export declare function useListMembers<TData = Awaited<ReturnType<typeof listMembers>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMembers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetMyProfileUrl: () => string;
/**
 * @summary Get current user's member profile
 */
export declare const getMyProfile: (options?: Parameters<typeof customFetch>[1]) => Promise<Member>;
export declare const getGetMyProfileQueryKey: () => readonly ["/api/members/me"];
export declare const getGetMyProfileQueryOptions: <TData = Awaited<ReturnType<typeof getMyProfile>>, TError = ErrorType<void>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMyProfile>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMyProfile>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMyProfileQueryResult = NonNullable<Awaited<ReturnType<typeof getMyProfile>>>;
export type GetMyProfileQueryError = ErrorType<void>;
/**
 * @summary Get current user's member profile
 */
export declare function useGetMyProfile<TData = Awaited<ReturnType<typeof getMyProfile>>, TError = ErrorType<void>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMyProfile>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getJoinImperiumUrl: () => string;
/**
 * @summary Join the Imperium
 */
export declare const joinImperium: (joinInput: JoinInput, options?: Parameters<typeof customFetch>[1]) => Promise<Member>;
export declare const getJoinImperiumMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof joinImperium>>, TError, {
        data: BodyType<JoinInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof joinImperium>>, TError, {
    data: BodyType<JoinInput>;
}, TContext>;
export type JoinImperiumMutationResult = NonNullable<Awaited<ReturnType<typeof joinImperium>>>;
export type JoinImperiumMutationBody = BodyType<JoinInput>;
export type JoinImperiumMutationError = ErrorType<void>;
/**
* @summary Join the Imperium
*/
export declare const useJoinImperium: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof joinImperium>>, TError, {
        data: BodyType<JoinInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof joinImperium>>, TError, {
    data: BodyType<JoinInput>;
}, TContext>;
export declare const getUpdateMemberRankUrl: (userId: string) => string;
/**
 * @summary Update a member's rank (admin only)
 */
export declare const updateMemberRank: (userId: string, rankUpdate: RankUpdate, options?: Parameters<typeof customFetch>[1]) => Promise<Member>;
export declare const getUpdateMemberRankMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMemberRank>>, TError, {
        userId: string;
        data: BodyType<RankUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateMemberRank>>, TError, {
    userId: string;
    data: BodyType<RankUpdate>;
}, TContext>;
export type UpdateMemberRankMutationResult = NonNullable<Awaited<ReturnType<typeof updateMemberRank>>>;
export type UpdateMemberRankMutationBody = BodyType<RankUpdate>;
export type UpdateMemberRankMutationError = ErrorType<void>;
/**
* @summary Update a member's rank (admin only)
*/
export declare const useUpdateMemberRank: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMemberRank>>, TError, {
        userId: string;
        data: BodyType<RankUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateMemberRank>>, TError, {
    userId: string;
    data: BodyType<RankUpdate>;
}, TContext>;
export declare const getBanMemberUrl: (userId: string) => string;
/**
 * @summary Ban or unban a member (admin only)
 */
export declare const banMember: (userId: string, banUpdate: BanUpdate, options?: Parameters<typeof customFetch>[1]) => Promise<Member>;
export declare const getBanMemberMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof banMember>>, TError, {
        userId: string;
        data: BodyType<BanUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof banMember>>, TError, {
    userId: string;
    data: BodyType<BanUpdate>;
}, TContext>;
export type BanMemberMutationResult = NonNullable<Awaited<ReturnType<typeof banMember>>>;
export type BanMemberMutationBody = BodyType<BanUpdate>;
export type BanMemberMutationError = ErrorType<void>;
/**
* @summary Ban or unban a member (admin only)
*/
export declare const useBanMember: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof banMember>>, TError, {
        userId: string;
        data: BodyType<BanUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof banMember>>, TError, {
    userId: string;
    data: BodyType<BanUpdate>;
}, TContext>;
export declare const getListAnnouncementsUrl: () => string;
/**
 * @summary List all announcements (newest first)
 */
export declare const listAnnouncements: (options?: Parameters<typeof customFetch>[1]) => Promise<Announcement[]>;
export declare const getListAnnouncementsQueryKey: () => readonly ["/api/announcements"];
export declare const getListAnnouncementsQueryOptions: <TData = Awaited<ReturnType<typeof listAnnouncements>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAnnouncements>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAnnouncements>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAnnouncementsQueryResult = NonNullable<Awaited<ReturnType<typeof listAnnouncements>>>;
export type ListAnnouncementsQueryError = ErrorType<unknown>;
/**
 * @summary List all announcements (newest first)
 */
export declare function useListAnnouncements<TData = Awaited<ReturnType<typeof listAnnouncements>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAnnouncements>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateAnnouncementUrl: () => string;
/**
 * @summary Post a new announcement (head admin only)
 */
export declare const createAnnouncement: (announcementInput: AnnouncementInput, options?: Parameters<typeof customFetch>[1]) => Promise<Announcement>;
export declare const getCreateAnnouncementMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAnnouncement>>, TError, {
        data: BodyType<AnnouncementInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createAnnouncement>>, TError, {
    data: BodyType<AnnouncementInput>;
}, TContext>;
export type CreateAnnouncementMutationResult = NonNullable<Awaited<ReturnType<typeof createAnnouncement>>>;
export type CreateAnnouncementMutationBody = BodyType<AnnouncementInput>;
export type CreateAnnouncementMutationError = ErrorType<void>;
/**
* @summary Post a new announcement (head admin only)
*/
export declare const useCreateAnnouncement: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAnnouncement>>, TError, {
        data: BodyType<AnnouncementInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createAnnouncement>>, TError, {
    data: BodyType<AnnouncementInput>;
}, TContext>;
export declare const getDeleteAnnouncementUrl: (id: number) => string;
/**
 * @summary Delete an announcement (head admin only)
 */
export declare const deleteAnnouncement: (id: number, options?: Parameters<typeof customFetch>[1]) => Promise<void>;
export declare const getDeleteAnnouncementMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAnnouncement>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteAnnouncement>>, TError, {
    id: number;
}, TContext>;
export type DeleteAnnouncementMutationResult = NonNullable<Awaited<ReturnType<typeof deleteAnnouncement>>>;
export type DeleteAnnouncementMutationError = ErrorType<void>;
/**
* @summary Delete an announcement (head admin only)
*/
export declare const useDeleteAnnouncement: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAnnouncement>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteAnnouncement>>, TError, {
    id: number;
}, TContext>;
export declare const getListLawsUrl: () => string;
/**
 * @summary List all laws in display order
 */
export declare const listLaws: (options?: Parameters<typeof customFetch>[1]) => Promise<Law[]>;
export declare const getListLawsQueryKey: () => readonly ["/api/laws"];
export declare const getListLawsQueryOptions: <TData = Awaited<ReturnType<typeof listLaws>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLaws>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listLaws>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListLawsQueryResult = NonNullable<Awaited<ReturnType<typeof listLaws>>>;
export type ListLawsQueryError = ErrorType<unknown>;
/**
 * @summary List all laws in display order
 */
export declare function useListLaws<TData = Awaited<ReturnType<typeof listLaws>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLaws>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateLawUrl: () => string;
/**
 * @summary Add a new law (head admin only)
 */
export declare const createLaw: (lawInput: LawInput, options?: Parameters<typeof customFetch>[1]) => Promise<Law>;
export declare const getCreateLawMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLaw>>, TError, {
        data: BodyType<LawInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createLaw>>, TError, {
    data: BodyType<LawInput>;
}, TContext>;
export type CreateLawMutationResult = NonNullable<Awaited<ReturnType<typeof createLaw>>>;
export type CreateLawMutationBody = BodyType<LawInput>;
export type CreateLawMutationError = ErrorType<void>;
/**
* @summary Add a new law (head admin only)
*/
export declare const useCreateLaw: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLaw>>, TError, {
        data: BodyType<LawInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createLaw>>, TError, {
    data: BodyType<LawInput>;
}, TContext>;
export declare const getUpdateLawUrl: (id: number) => string;
/**
 * @summary Edit a law's content (head admin only)
 */
export declare const updateLaw: (id: number, lawInput: LawInput, options?: Parameters<typeof customFetch>[1]) => Promise<Law>;
export declare const getUpdateLawMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateLaw>>, TError, {
        id: number;
        data: BodyType<LawInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateLaw>>, TError, {
    id: number;
    data: BodyType<LawInput>;
}, TContext>;
export type UpdateLawMutationResult = NonNullable<Awaited<ReturnType<typeof updateLaw>>>;
export type UpdateLawMutationBody = BodyType<LawInput>;
export type UpdateLawMutationError = ErrorType<void>;
/**
* @summary Edit a law's content (head admin only)
*/
export declare const useUpdateLaw: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateLaw>>, TError, {
        id: number;
        data: BodyType<LawInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateLaw>>, TError, {
    id: number;
    data: BodyType<LawInput>;
}, TContext>;
export declare const getDeleteLawUrl: (id: number) => string;
/**
 * @summary Delete a law (head admin only)
 */
export declare const deleteLaw: (id: number, options?: Parameters<typeof customFetch>[1]) => Promise<void>;
export declare const getDeleteLawMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteLaw>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteLaw>>, TError, {
    id: number;
}, TContext>;
export type DeleteLawMutationResult = NonNullable<Awaited<ReturnType<typeof deleteLaw>>>;
export type DeleteLawMutationError = ErrorType<void>;
/**
* @summary Delete a law (head admin only)
*/
export declare const useDeleteLaw: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteLaw>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteLaw>>, TError, {
    id: number;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map