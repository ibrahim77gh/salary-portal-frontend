import { apiSlice } from '../services/apiSlice';

const quickbookApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		retrieveContact: builder.query({
			query: () => '/contact/',
		}),
        retrieveItem: builder.query({
			query: () => '/item/',
		}),
        retrieveRedirect: builder.query({
			query: () => '/qb/oauth/',
		}),
        connectQuicbook: builder.mutation({
			query: ({ auth_code, state_token, realm_id }) => ({
				url: '/qb/oauth/',
				method: 'POST',
				body: { auth_code, state_token, realm_id },
			}),
		}),
        refreshCustomers: builder.mutation({
			query: () => ({
				url: '/contact/quickbook-customers/',
				method: 'POST',
			}),
		}),
		refreshItems: builder.mutation({
			query: () => ({
				url: '/item/quickbook-items/',
				method: 'POST',
			}),
		}),
    }),
});

export const {
	useRetrieveContactQuery,
	useRetrieveItemQuery,
    useRetrieveRedirectQuery,
    useConnectQuicbookMutation,
	useRefreshCustomersMutation,
	useRefreshItemsMutation,
} = quickbookApiSlice;