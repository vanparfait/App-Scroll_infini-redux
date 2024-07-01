import React, { useEffect, useRef, useState } from "react";
import usePhotos from "../hooks/usePhotos";
import spinner from "../assets/spinner.svg";

const List = () => {
  const [qwery, setQwery] = useState("random");
  const [pageNumber, setPageNumber] = useState(1);

  const photosApiData = usePhotos(qwery, pageNumber);
  console.log(photosApiData);
  const lastPicRef = useRef();
  useEffect(() => {
    if (lastPicRef.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && photosApiData.maxpages !== pageNumber) {
          setPageNumber(pageNumber + 1);
          lastPicRef.current = null;
          observer.disconnect();
        }
      });

      observer.observe(lastPicRef.current);
    }
  }, [photosApiData]);
  return (
    <>
      <h1 className="text-4xl">Unsplash Clone.</h1>
      <form action="">
        <label className="block mb-4" htmlFor="search">
          Look for images...
        </label>
        <input
          type="text"
          placeholder="Look for something..."
          className="block w-full mb-14 text-slate-800 py-3 px-2 text-md outline-gray-500 rounded border border-slate-400"
        />
      </form>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] auto-rows-[175px] gap-4 justify-center">
        {!photosApiData.loading &&
          photosApiData.photos.length !== 0 &&
          photosApiData.photos.map((photo, index) => {
            if (photosApiData.photos.length === index + 1) {
              return (
                <li ref={lastPicRef} key={photo.id}>
                  <img
                    src={photo.urls.regular}
                    alt={photo.alt_description}
                    className="h-full w-full object-cover border-4 border-red-500"
                  />
                </li>
              );
            } else {
              return (
                <li key={photo.id}>
                  <img
                    src={photo.urls.regular}
                    alt={photo.alt_description}
                    className="h-full w-full object-cover"
                  />
                </li>
              );
            }
          })}
      </ul>

      {/* Loader */}
      {photosApiData.loading && !photosApiData.error.state && (
        <img src={spinner} alt="spinner" className="block mx-auto" />
      )}
    </>
  );
};

export default List;
