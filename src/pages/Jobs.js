import React from "react";
import { useGetJobsQuery } from "../app/features/apis/jobApi";
import JobCard from "../components/reusable/JobCard";
import Loading from '../components/reusable/Loading'

const Jobs = () => {
  const { data,isLoading} = useGetJobsQuery();
  if(isLoading){
    return <Loading />
  }
  return (
    <div className='pt-14'>
      <div className='bg-primary/10 p-5 rounded-2xl'>
        <h1 className='font-semibold text-xl'>Find Jobs</h1>
      </div>
      <div className='grid grid-cols-2 gap-5 mt-5'>
        {data?.data.map((job)=>{
          return <JobCard key={job._id} jobData={job} />
        })}
      </div>
    </div>
  );
};

export default Jobs;
