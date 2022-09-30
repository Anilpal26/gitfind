import React from 'react';

const RepoList = ({ data }) => {


  // *******************************//
  return (
    <div className='card repo-list'>
      <h2>Repo List</h2>
      <ol>
        {data.map((singleRepo, idx) => {
          return (
            <li key={idx}>
              <a href={singleRepo.html_url} target="_blank" rel='noreferrer'>
                {singleRepo.name}
              </a>
            </li>
          );
        })}
        <li>Repo 1</li>
        <li>Repo 2</li>
      </ol>
    </div>
  )
}

export default RepoList;