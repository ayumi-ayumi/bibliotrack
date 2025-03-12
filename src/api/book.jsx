import axios from 'axios';

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response || 'Try later');
  },
);

const ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL;

const bookApi = {
  async getAllBooks() {
    const result = await axios.get(ENDPOINT_URL);
    return result.data;
  },
  async post(formInputs) {
    await axios.post(`${ENDPOINT_URL}/add`, formInputs);
  },
  async delete(book) {
    await axios.delete(`${ENDPOINT_URL}/${book._id}`);
  },
  async patch(editedBookData) {
    await axios.patch(`${ENDPOINT_URL}/${editedBookData._id}`, editedBookData);
  },
  async searchBook(input) {
    const result = await axios.post(`${ENDPOINT_URL}/search`, input);
    return result.data;
  },
};

export default bookApi;
