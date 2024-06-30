import React, { useState } from "react";
import usePhotos from "../hooks/usePhotos";

const List = () => {
  const [qwery, setQwery] = useState("random");
  const [pageNumber, setPageNumber] = useState(1);

  const photosApiData = usePhotos(qwery, pageNumber);
  console.log(photosApiData);
  return (
    <>
      <h1 className="text-4xl">Unsplash Clone.</h1>
      <label className="block mb-4" htmlFor="search">
        Look for images...
      </label>
      <input
        type="text"
        placeholder="Look for something..."
        className="block w-full mb-14 text-slate-800 py-3 px-2 text-md outline-gray-500 rounded border border-slate-400"
      />
    </>
  );
};

export default List;
