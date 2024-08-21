import { apiSlice } from '../services/apiSlice';

const salaryApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
        retrieveEmployee: builder.query({
			query: () => '/api/employee/',
		}),
		retrieveSalarySlip: builder.query({
			query: () => '/api/salary-slip/',
		}),
		retrieveNotification: builder.query({
			query: () => '/api/notification/',
		}),
		markNotificationRead: builder.mutation({
			query: () => ({
				url: `/api/notifications-read/`,
				method: 'POST',
			}),
		}),
        addEmployee: builder.mutation({
			query: ({ employee_id, first_name, last_name, email, department, designation }) => ({
				url: '/email/google-authorize/',
				method: 'POST',
				body: { employee_id, first_name, last_name, email, department, designation },
			}),
		}),
		deleteEmployee: builder.mutation({
			query: ({ employee_id }) => ({
				url: `/api/employee/${employee_id}/`,
				method: 'DELETE',
			}),
		}),
		uploadExcel: builder.mutation({
			query: (formData) => ({
				url: '/api/upload-excel/',
				method: 'POST',
				body: formData,
			}),
		}),
    }),
});

export const {
    useRetrieveEmployeeQuery,
	useRetrieveSalarySlipQuery,
	useRetrieveNotificationQuery,
	useMarkNotificationReadMutation,
    useAddEmployeeMutation,
	useDeleteEmployeeMutation,
	useUploadExcelMutation,
} = salaryApiSlice;