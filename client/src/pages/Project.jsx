import { useState } from "react"
import { FaEdit, FaRegEdit } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useQuery } from "@apollo/client"
import { GET_PROJECT } from "../queries/projectQueries"
import ClientInfo from "../components/ClientInfo"
// import DeleteProjectButton from "../components/DeleteProjectButton"
import EditProjectForm from "../components/EditProjectForm"

const Project = () => {
  const [showProjectEditForm, setShowProjectEditForm] = useState(false)
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  })

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong</p>

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <div className='d-flex justify-content-end align-items-center'>
            <button
              onClick={() => setShowProjectEditForm(!showProjectEditForm)}
              type='button'
              className='btn btn-dark btn-sm me-2'
            >
              <FaEdit className='icon' />
              Edit
            </button>
            <Link to='/' className='btn btn-primary btn-sm w-auto'>
              Back
            </Link>
          </div>

          <h1>{data.project.name}</h1>
          <p>{data.project?.description}</p>
          <h5 className='mt-3'>Project Status</h5>
          <p className='lead'>{data.project.status}</p>
          <ClientInfo client={data.project.client} />

          {showProjectEditForm && (
            <EditProjectForm
              project={data.project}
              showEditForm={setShowProjectEditForm}
            />
          )}
        </div>
      )}
    </>
  )
}

export default Project
