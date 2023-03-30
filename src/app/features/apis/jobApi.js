import apiSlice from "../apiSlice";
const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) =>( {
    postJob: builder.mutation({
      query: (data) => ({
        url: "/jobs",
        method: "POST",
        body: data,
      }),
      invalidatesTags:['jobs']
    }),
    getJobs:builder.query({
      query:()=>({
        url:'/jobs',
        method:"GET"
      }),
      providesTags:['jobs']
    }),
    getJobsById:builder.query({
      query:(id)=>({
        url:`/jobs/${id}`,
        method:"GET"
      })
    })
  })
});

export const { usePostJobMutation, useGetJobsQuery, useGetJobsByIdQuery } = jobApi