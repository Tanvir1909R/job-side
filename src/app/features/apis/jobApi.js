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
    apply: builder.mutation({
      query: (data) => ({
        url: "/jobs/apply",
        method: "PATCH",
        body: data,
      })
    }),
    question: builder.mutation({
      query: (data) => ({
        url: "/jobs/question",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:['job']
    }),
    reply: builder.mutation({
      query: (data) => ({
        url: "/jobs/reply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:['job']
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
      }),
      providesTags:['job']
    }),
    getAppliedJobs:builder.query({
      query:(email)=>({
        url:`/jobs/appliedJobs/${email}`,
        method:"GET"
      })
    })
  })
});

export const { usePostJobMutation, useGetJobsQuery, useGetJobsByIdQuery, useApplyMutation, useGetAppliedJobsQuery, useQuestionMutation, useReplyMutation } = jobApi