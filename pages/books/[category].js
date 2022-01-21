import React, { useMemo, useState } from "react";
import { getBooks, getCategorys } from "../api";
import { useSelector } from "react-redux";
import Link from "next/link";

const Books = ({ books, categorys }) => {
  const [search, setSearch] = useState("");
  const loading = useSelector((state) => state.booksReducer.loading);

  const filterData = useMemo(() => {
    return books?.filter((value) =>
      value.author.trim().toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [books, search]);

  return (
    <div className="d-flex p-0">
      <div className="categorys">
        <h4 className="fw-bold"># Categorys</h4>
        {categorys?.length > 0 &&
          categorys?.map((value, index) => {
            return (
              <div style={{ cursor: `pointer` }} key={index}>
                <Link
                  href={`/books/${value.list_name_encoded}`}
                  className="fw-bold mb-0 subtitle"
                >
                  <a>
                    {index}. {value?.list_name_encoded}
                  </a>
                </Link>
              </div>
            );
          })}
      </div>

      <div className="container">
        <h1 className="text-center fw-bold text-warning my-4">My Book Shop</h1>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="form-control"
          placeholder="...Search"
        />

        <div className="row">
          {loading ? (
            <h1 className="text-center my-5 text-white">Loading...</h1>
          ) : filterData.length > 0 ? (
            filterData?.map((value, index) => {
              return (
                <div key={index} className="col-12 col-sm-6 col-xxl-4 my-4">
                  <div
                    style={{
                      border: `3px solid orange`,
                      borderRadius: "15px",
                    }}
                    className="d-flex align-items-center overflow-hidden m-0 h-100 bg-white"
                  >
                    <Link href={`/book_info/${value?.book_uri.slice(11)}`}>
                      <a>
                        <img
                          style={{
                            objectFit: "cover",
                            width: "200px",
                            height: "300px",
                          }}
                          className="h-100 me-5"
                          src={value?.book_image}
                          alt=""
                        />
                      </a>
                    </Link>
                    <div className="m-0 p-0">
                      <h5 className="mb-0 fw-bold text-primary">
                        {value?.author}
                      </h5>
                      <h3 className="mb-0 text-warning">{value?.price} $</h3>
                      <p className="mb-0"> {value?.description}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="text-white fw-bold my-5">Error</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const res = await getBooks(context.query.category);
  const categorylist = await getCategorys();

  return {
    props: {
      books: res ? res : [],
      categorys: categorylist ? categorylist : [],
    },
  };
};

// export async function getServerSideProps() {
//   return {
//     props: (async function () {
//       const res = await getBooks();

//       console.log(res);

//       return {
//         books: res,
//       };
//     })(),
//   };
// }

export default Books;
