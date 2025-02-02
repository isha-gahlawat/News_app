import React from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";
import srch from "../Config/Config";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [article, setarticle] = useState([]);
  const [numberofarticles, setnumberofarticles] = useState(0);
  const [cache, setCache] = useState({});
  const [loading, setloading] = useState(false);
  const [category, setcategory] = useState("general");
  const [page, setpage] = useState(1);
  const [progress, setprogress] = useState(0);
  const [hasMore, setHasMore] = useState(true)

  const onload = async (change = "general") => {
    setloading(true);
    setcategory(change);
    setpage(1); 
    setprogress(0);
    setHasMore(true); 
    setarticle([]); 

    // Cache key based on category and page
    const cacheKey = `page-1-us-${change}`;

    // If cached data exists, use it
    if (cache[cacheKey]) {
      console.log("Using cached data for", page);
      setprogress(30);
      setarticle(cache[cacheKey].articles);
      setprogress(50);
      setnumberofarticles(cache[cacheKey].totalResults);
      setprogress(100);
      setloading(false);
      return;
    }

    // Fetch data if not in cache
    try {
      let data = await srch(1, "us", change);
      console.log("Fetched new data",data);
      if (data) {
        setprogress(30);
        setarticle(data.articles || []);
        setprogress(50);
        setnumberofarticles(data.totalResults || 0);
        setprogress(100);
        // Cache fetched data
        setCache((prevCache) => ({
          ...prevCache,
          [cacheKey]: data,
        }));
      } else {
        console.error("No data returned from srch");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setloading(false);
  };


  const fetchMOREData = async () => {
    if (loading || !hasMore) return;

    const nextPage = page + 1;
    const cacheKey = `page-${nextPage}-us-${category}`;
    setloading(true);

    try {
      if (cache[cacheKey]) {
        console.log("Using cached data for page", nextPage);
        setarticle((prevArticles) => [
          ...prevArticles,
          ...cache[cacheKey].articles,
        ]);
      } else {
        let data = await srch(nextPage, "us", category);
        console.log("Fetched more data:", data);

        if (data.articles.length === 0) {
          console.log("No more articles available. Stopping infinite scroll.");
          setHasMore(false);
          
        } else {
          setarticle((prevArticles) => [...prevArticles, ...data.articles]);
  
          setCache((prevCache) => ({
            ...prevCache,
            [cacheKey]: data,
          }));
        }
      }
      setpage(nextPage);
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setloading(false);
    }
  };

  const Contextvalue = {
    input,
    setinput,
    article,
    setarticle,
    onload,
    loading,
    category,
    setcategory,
    numberofarticles,
    setnumberofarticles,
    fetchMOREData,
    progress,
    setprogress,
    hasMore
  };

  return (
    <Context.Provider value={Contextvalue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
