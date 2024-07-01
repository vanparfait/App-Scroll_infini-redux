import React, { useState } from "react";
import usePhotos from "../hooks/usePhotos";
import spinner from "../assets/spinner.svg";

const List = () => {
  const [qwery, setQwery] = useState("random");
  const [pageNumber, setPageNumber] = useState(1);

  const photosApiData = usePhotos(qwery, pageNumber);
  console.log(photosApiData);
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
          photosApiData.photos.map((photo, indes) => (
            <li key={photo.id}>
              <img
                src={photo.urls.regular}
                alt={photo.alt_description}
                className="h-full w-full object-cover"
              />
            </li>
          ))}
      </ul>

      {/* Loader */}
      {photosApiData.loading && !photosApiData.error.state && (
        <img src={spinner} alt="spinner" className="block mx-auto" />
      )}
    </>
  );
};

export default List;
