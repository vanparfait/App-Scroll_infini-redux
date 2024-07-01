import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

const usePhotos = (querySearch, pageIndex) => {
  const [error, setError] = useState({
    msg: "",
    state: false,
  });
  const [photos, setPhotos] = useState([]);
  const [maxpages, setMaxpages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (photos.length !== 0 && maxpages !== 0) {
      setPhotos([]);
      setMaxpages(0);
    }
  }, [querySearch]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${querySearch}&client_id=${
        import.meta.env.VITE_UNSPLASH_KEY
      }`
    )
      .then((response) => {
        if (!response.ok)
          throw new Error(`${response.status} Error, something went wrong`);

        return response.json();
      })
      .then((data) => {
        setPhotos((state) => [...state, ...data.results]);
        setMaxpages(data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        setError({
          msg: err.message,
          state: true,
        }),
          setLoading(false);
      });
  }, [querySearch, pageIndex]);

  return { error, photos, maxpages, loading };
};

export default usePhotos;
