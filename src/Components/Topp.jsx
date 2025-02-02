import React, { useContext, useEffect } from "react";
import Newsitem from "./Newsitem";
import { Context } from "../Context/Context";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const Topp = ({ category }) => {
  const { article, onload,loading,hasMore,fetchMOREData } =
    useContext(Context);

  useEffect(() => {
    onload(category);
  }, [category]);
 
  return (
    <>
    
        <h2 className="text-center" style={{ marginTop: "90px" }}>NEWS AT YOUR DESK</h2>

        {loading && article.length === 0 ? (
          <Spinner />
        ) : (
          <>
            {article.length === 0 && !loading ? (
              <h4 className="text-center">No articles available</h4> 
            ) : (
              <InfiniteScroll
                dataLength={article.length}
                next={fetchMOREData}
                hasMore={hasMore}
                loader={hasMore ? <Spinner /> : null}
              > 
               <div className="container my-3">
                <div className="row my-3">
                  {article.map((item, index) => (
                   <div className="col-md-4" key={item.url ? item.url : `${item.publishedAt}-${index}`}>
                      <Newsitem
                        title={item.title ? item.title.slice(0, 45) : ""}
                        des={item.description ? item.description.slice(0, 88) : ""}
                        url={
                          item.urlToImage
                            ? item.urlToImage
                            : "https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_1280.jpg"
                        }
                        urltonews={item.url ? item.url : ""}
                        author={item.author ? item.author : "Unknown"}
                        date={item.publishedAt ? item.publishedAt : ""}
                        source={item.source.name ? item.source.name : "News"}
                      />
                    </div>
                  ))}
                </div>
                </div>
              </InfiniteScroll>
            )}
          </>
        )}
   
    </>
  );
};

export default Topp;