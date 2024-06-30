import React, { useEffect, useState } from "react";

const usePhotos = (querySearch, pageIndex) => {
  const [error, setError] = useState({
    msg: "",
    state: false,
  });
  const [photos, setPhotos] = useState([]);
  const [maxpages, setMaxpages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${querySearch}&client_id=${
        import.meta.env.VITE_UNSPLASH_KEY
      }`
    )
      .then((response) => {
        // if (!response.ok)
        //   throw new Error(`${response.status} Error, something went wrong`);

        return response.json();
      })
      .then((data1) => console.log(data1));
  });

  return { error, photos, maxpages, loading };
};

export default usePhotos;
