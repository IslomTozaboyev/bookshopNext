import axios from "axios";
import {
  get_books,
  get_categorys,
  loading_on,
  loading_off,
} from "../../redux/actions";

const list = "hardcover-nonfiction";
const apiKey = `0nG5do2caU59G7F2PT1eRQD0RAsaX5Du`;
const baseUrl = `https://api.nytimes.com/svc/books/v3/`;
const urlList = `${baseUrl}/lists/names.json?api-key=${apiKey}`;

let cancelToken;

const axios_instance = axios.create({
  baseURL: baseUrl,
});

const getBooks = async (category = list) => {
  if (cancelToken) {
    console.log("Cencel");
    cancelToken.cancel("Cencel");
  }
  cancelToken = axios.CancelToken.source();
  loading_on();
  try {
    const res = await axios_instance.get(
      `lists/current/${category}.json?api-key=${apiKey}`,
      {
        cancelToken: cancelToken.token,
      }
    );
    get_books(res.data.results.books);

    if (res.status == 200) {
      loading_off();
      return res.data.results.books;
    }
  } catch (error) {
    loading_off();
  }
};

const getCategorys = async () => {
  loading_on(true);
  try {
    const res = await axios_instance.get(urlList);
    if (res.status == 200) {
      get_categorys(res.data.results);
      loading_off();
      return res.data.results;
    }
  } catch (error) {
    loading_off();
    console.log(error);
  }
};

export { getBooks, getCategorys };
