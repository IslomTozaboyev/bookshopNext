import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getBooks } from "../api";

const Book_uri = () => {
  const data = useSelector((state) => state.booksReducer.books);
  const router = useRouter();

  const filter = data?.filter(
    (value) => value.book_uri.slice(11) == router.query.book_uri
  )[0];

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="col-10 col-md-6 mx-auto rounded mx-auto my-4">
      <div className="bg-white rounded">
        <div
          style={{
            border: `3px solid orange`,
            borderRadius: "15px",
          }}
          className="d-flex align-items-center overflow-hidden m-0 h-100 bg-white"
        >
          <img
            style={{ objectFit: "cover", height: "400px !important" }}
            className="h-50 me-5"
            src={filter?.book_image}
            alt=""
          />
          <div className="m-0 p-0">
            <h5 className="mb-0 fw-bold text-primary">{filter?.author}</h5>
            <h3 className="mb-0 text-warning">{filter?.price} $</h3>
            <p className="mb-0"> {filter?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book_uri;
