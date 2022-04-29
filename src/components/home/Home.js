import React, { useState } from "react";
import HomeCSS from "./Home.module.css";
import CardProjectInfo from "../elements/cards/CardProjectInfo";
import SubHeader from "../elements/navigation/subHeader/SubHeader";
import { Pagination } from "../elements/pagination/Pagination";
import projectHooks from "../../hooks/query/project";
import useDebounce from "../../hooks/custom/useDebounce";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import GIJane2 from "../../assets/16331238.jpg";
import LoadingSpinner from "../elements/loadingSpinner/LoadingSpinner";

export const Home = () => {
  const [authState, authDispatch] = useAuth();
  const [pageNumber, setPageNumber] = useState(0);
  const [projectName, setProjectName] = useState("");
  const debouncedPageNumber = useDebounce(pageNumber, 250);
  const debouncedProjectName = useDebounce(projectName, 1000);
  const projects = projectHooks.useProjects(debouncedProjectName, debouncedPageNumber, authState.user.id);
  console.log(projects);

  const handlePageChange = async (event) => {
    setPageNumber(event.target.value);
  };

  const handleNextPageChange = async () => {
    setPageNumber(projects.data?.meta.pagination.page + 1);
  };

  const handlePreviousPageChange = async () => {
    setPageNumber(projects.data?.meta.pagination.page - 1);
  };

  const handleProjectNameFilter = async (event) => {
    setPageNumber(1);
    setProjectName(event.target.value);
  };

  return (
    <div className={HomeCSS.wrapper}>
      <SubHeader onChange={handleProjectNameFilter} />
      <div className={HomeCSS.container}>
        {projects.isLoading && <LoadingSpinner />}
        {projects.status === "success" && (
          <>
            {projects.data.data.length === 0 && (
              <div className={HomeCSS.no_projects_container}>
                <img src={GIJane2} alt="#" />
                <p className={HomeCSS.no_projects_message}>No projects found</p>
              </div>
            )}
            <div className={HomeCSS.card_container}>
              {projects.status === "success" &&
                projects.data?.data.map((project) => (
                  <Link state={{ id: project.id }} key={project.id} to={`/projects/${project.id}`}>
                    <CardProjectInfo key={project.id} project={project} />
                  </Link>
                ))}
            </div>
            <div className={HomeCSS.pagination}>
              <Pagination
                handlePageChange={handlePageChange}
                handleNextPageChange={handleNextPageChange}
                handlePreviousPageChange={handlePreviousPageChange}
                currentPage={projects.data?.meta.pagination.page}
                totalCount={projects.data?.meta.pagination.total}
                pageSize={projects.data?.meta.pagination.pageSize}
              />
            </div>
          </>
        )}
      </div>

      <div />
    </div>
  );
};
//
