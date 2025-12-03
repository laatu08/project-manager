

import React, { useEffect } from 'react'
import { getProjects } from '../services/projectApi'

export default function AdminProjects() {
    const [projects,setProjects]=React.useState([])

    useEffect(()=>{
        getProjects().then(res=>{
          console.log(".......................(",res);
            setProjects(res);
        })
        // console.log(projects);
    },[]);

  return (
    <div className="p-5">
      <h1 className="text-3xl">Projects</h1>

      <div className="mt-5 space-y-4">
        {projects.map(p => (
          <div key={p._id} className="border p-3 rounded">
            <h2 className="text-xl">{p.title}</h2>
            <p className="text-gray-600">{p.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
