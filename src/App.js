import Details from "./Components/Details";
import Footer from "./Components/Footer";
import RepoList from "./Components/RepoList";
import Search from "./Components/Search";
import { github } from "./Components/utils";
import { useEffect, useState } from "react";
import FollowersList from "./Components/FollowersList";
import FollowingList from "./Components/FollowingList";

function App() {

  const [detail, setDetail] = useState({});
  const [repoList, setRepoList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [username, setUsername] = useState("aayusharyan");
  const [isSuccessful, setSuccessful] = useState(true);
  const [visibleComponent, setVisibleComponent] = useState(2);

  useEffect(_ => {
    setDetail({});
    setSuccessful(true);
    if(username === ""){
      return;
    }
    (async _ => {
      try {
        const responce = await github.get(`/${username}`);
        setDetail(responce.data);
      } catch (e) {
        setSuccessful(false);
      }
    })();
  }, [username]);

  useEffect(_ => {
    setRepoList([]);
    if(username === ""){
      return;
    }
    (async _ => {
      const responce = await github.get(`/${username}/repos`);
      setRepoList(responce.data);
    })();
  }, [username]);

  useEffect(_ => {
    setFollowerList([]);
    if(username === ""){
      return;
    }
    (async _ => {
      const responce = await github.get(`/${username}/followers`);
      setFollowerList(responce.data);
    })();
  }, [username]);

  useEffect(_ => {
    setFollowingList([]);
    if(username === ""){
      return;
    }
    (async _ => {
      const responce = await github.get(`/${username}/following`);
      setFollowingList(responce.data);
    })();
  }, [username]);

  const searchedUsername = user => {
    console.log(user);
    setUsername(user);
  }

  const showLoadMore = () => {
    if(visibleComponent === 1) {
      if (followerList.length === detail.followers) {
        return false;
      } else {
        return true;
      }
    } else if (visibleComponent === 2) {
      if(repoList.length === detail.public_repos) {
        return false;
      } else {
        return true;
      }
    } else {
      if (followingList.length === detail.following) {
        return false;
      } else {
        return true;
      }
    }
  }

  const loadMoreData = async _ => {
    //Fetch more data from follower-list
    if(visibleComponent === 1){
      const currentPages = Math.ceil(followerList.length / 30);
      const nextPage = currentPages + 1;
      const responce = await github.get(`/${username}/followers?page=${nextPage}`);
      const list = responce.data;
      setFollowerList(currentList => {
        const newList = [...currentList , ...list];
        return newList;
      });
    }else if(visibleComponent === 2){
      //Fetch more data from Repo-list
      const currentPages = Math.ceil(repoList.length / 30);
      const nextPage = currentPages + 1;
      const responce = await github.get(`/${username}/repos?page=${nextPage}`);
      const list = responce.data;
      setRepoList(currentList => {
        const newList = [...currentList , ...list];
        return newList;
      });
    }else if(visibleComponent === 3){
      //Fetch more data from following-list
      const currentPages = Math.ceil(followingList.length / 30);
      const nextPage = currentPages + 1;
      const responce = await github.get(`/${username}/following?page=${nextPage}`);
      const list = responce.data;
      setFollowingList(currentList => {
        const newList = [...currentList , ...list];
        return newList;
      });
    }
  }


  //******************** HTML Part ************************ */
  return (
    <main className="App">
      <Search searchedUsername={searchedUsername} isSuccessful={isSuccessful} />
      {detail.id === undefined ? (
        false
      ) : (
        <>
          <Details data={detail} changeVisibleComponent={setVisibleComponent} visibleComponent={visibleComponent} />
          {visibleComponent === 1 ? (
            <FollowersList data={followerList} />
          ) : (
            visibleComponent === 2 ? (
              <RepoList data={repoList} />
            ) : (
              <FollowingList data={followingList} />
            )
          )}
          {showLoadMore() === true ? (
            <div className="card load-more">
              <button onClick={loadMoreData}>Load More</button>
            </div>
          ) : (false)}
        </>
      )}
      <Footer />
    </main>
  );
}

export default App;
