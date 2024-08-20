import { apiSlice } from '../services/apiSlice';

const googleApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
        retrieveGoogleRedirect: builder.query({
			query: () => '/email/google-authorize/',
		}),
		retrieveEmail: builder.query({
			query: () => '/email/email-client/',
		}),
		retrieveEmailContent: builder.query({
			query: () => '/email/email-content/',
		}),
		retrieveEmailLine: builder.query({
			query: () => '/email/email-line/',
		}),
        connectGoogle: builder.mutation({
			query: ({ code, state, error }) => ({
				url: '/email/google-authorize/',
				method: 'POST',
				body: { code, state, error },
			}),
		}),
		extractEmail: builder.mutation({
			query: ({ start_date, end_date}) => ({
				url: '/email/extract/',
				method: 'POST',
				body: { start_date, end_date },
			}),
		}),
		processAgent: builder.mutation({
			query: () => ({
				url: '/email/agent/',
				method: 'POST',
			}),
		}),
    }),
});

export const {
    useRetrieveGoogleRedirectQuery,
    useConnectGoogleMutation,
	useExtractEmailMutation,
	useRetrieveEmailQuery,
	useRetrieveEmailContentQuery,
	useRetrieveEmailLineQuery,
	useProcessAgentMutation,
} = googleApiSlice;