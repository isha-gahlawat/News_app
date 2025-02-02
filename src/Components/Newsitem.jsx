import React, { useContext } from "react";
import { Context } from "../Context/Context";
const Newsitem = (props) => {
  const { onsent } = useContext(Context);
  return (
    <>
      <div className="my-3">
        <div className="card">
          <div style={{display:'flex', justifyContent:'flex-end',position:'absolute',right:'0'}}><span className="badge rounded-pill bg-danger"  >
              {props.source}
            </span></div>
          <img src={props.url} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.title}...</h5>
            
            <p className="card-text">{props.des}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {props.author} on {new Date(props.date).toGMTString()}
              </small>
            </p>
            <a
              href={props.urltonews}
              className="btn btn-primary btn-sm"
              onClick={() => onsent()}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newsitem;
