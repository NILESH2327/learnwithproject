import React from "react";
import { useState } from "react";
import { bookBaseUrl } from "../axiosInstance";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

// 🔔 NEW: toast import
import { toast } from "react-toastify";

const Home = () => {

  /* ---------------- FORM STATE ---------------- */
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
  });

  /* ---------------- BOOK LIST STATE ---------------- */
  const [bookList, setBookList] = useState([]);
  const [isUpdating, setIsUpdating]= useState(false);

  /* ---------------- GET ALL BOOK LIST ---------------- */
  const getAllBookList = async () => {
    try {
      const { data } = await bookBaseUrl.get('/booklists');

      // backend se books "data" key me aa rahi hain
      setBookList(data?.data || []);

      console.log("Book List Response:", data);
    } catch (err) {
      console.log("Error fetching book list:", err);
    }
  };

  // page load par book list fetch
  useEffect(() => {
    getAllBookList();
  }, []);

  /* ---------------- FORM CHANGE HANDLER ---------------- */
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- SAVE BOOK ---------------- */
  const handleSave = async () => {
    try {
      // basic validation
      if(!isUpdating){

      
      if (
        !bookForm.BookName ||
        !bookForm.BookTitle ||
        !bookForm.Author ||
        !bookForm.SellingPrice
      ) {
        // ❌ OLD alert
        // alert("All fields are required");

        // ✅ NEW toast
        toast.warning("All fields are required");
        return;
      }
      // ✅ FIX: ADD ke time payload me _id nahi bhejna
        const payload = {
          BookName: bookForm.BookName,
          BookTitle: bookForm.BookTitle,
          Author: bookForm.Author,
          SellingPrice: bookForm.SellingPrice,
          PublishDate: bookForm.PublishDate,
        };

      const { data } = await bookBaseUrl.post('/addbook', payload);

      // backend me key hai "Success"
      if (data?.success) {

        // ❌ OLD alert
        // alert("Book added successfully");

        // ✅ NEW toast
        toast.success("Book added successfully");

        // form reset
        setBookForm({
          BookName: "",
          BookTitle: "",
          Author: "",
          SellingPrice: "",
          PublishDate: "",
        });

        // list refresh
        getAllBookList();
      }
     }
      else{
        const { data } = await bookBaseUrl.put('/updatebook', bookForm);

       // backend me key hai "Success"
        if (data?.success) {

        // ❌ OLD alert
        // alert("Book added successfully");

        // ✅ NEW toast
        toast.success("Book updated successfully");

        // form reset
        setBookForm({
          // _id: "",
          BookName: "",
          BookTitle: "",
          Author: "",
          SellingPrice: "",
          PublishDate: "",
        });
        setIsUpdating(false);
        // list refresh
        getAllBookList();

      }
    }

      // console.log("Add Book Response:", data);
    } catch (err) {
      console.log("Error adding book:", err);
    }
  };

  /* ---------------- DELETE BOOK ---------------- */
  const handleDelete = async (id) => {
    try {
      const { data } = await bookBaseUrl.post('/deletebook', { Id: id });
      console.log("Delete response:", data);

      if (data?.success) {

        // ❌ OLD alert
        // alert(data?.message);

        // ✅ NEW toast (delete = error/red style)
        toast.error(data?.message);

        // refresh list
        getAllBookList();
      }
    } catch (error) {
      console.log("Error deleting book:", error);
    }
  };

  const handleUpdate = async (data) => {
        setBookForm({
          _id: data._id,
          BookName: data.BookName,
          BookTitle: data.BookTitle,
          Author: data.Author,
          SellingPrice: data.SellingPrice,
          PublishDate: data.PublishDate,
        });
        setIsUpdating(true);
    
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 pt-24 text-white">

      {/* ================= FORM SECTION ================= */}
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-medium mb-6">
          Add Book
        </h2>

        <form className="space-y-4">

          <div>
            <label className="block text-gray-400 mb-1">Book Name</label>
            <input
              type="text"
              placeholder="Book name"
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-md outline-none focus:border-blue-500"
              name="BookName"
              value={bookForm.BookName}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Book Title</label>
            <input
              type="text"
              placeholder="Book title"
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-md outline-none focus:border-blue-500"
              name="BookTitle"
              value={bookForm.BookTitle}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Author</label>
            <input
              type="text"
              placeholder="Author name"
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-md outline-none focus:border-blue-500"
              name="Author"
              value={bookForm.Author}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Selling Price</label>
            <input
              type="number"
              placeholder="Price"
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-md outline-none focus:border-blue-500"
              name="SellingPrice"
              value={bookForm.SellingPrice}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label className="block text-red-400 mb-1">Publish Date</label>
            <input
              type="date"
              className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded-md outline-none focus:border-blue-500"
              name="PublishDate"
              value={bookForm.PublishDate}
              onChange={handleFormChange}
            />
          </div>

          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
            onClick={handleSave}
          >
            Save Book
          </button>

        </form>
      </div>

      {/* ================= TABLE SECTION ================= */}
      <div className="max-w-5xl mx-auto mt-14">
        <h3 className="text-xl font-medium mb-4">
          Book List
        </h3>

        <table className="w-full border border-gray-700 rounded-md overflow-hidden">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Book Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Book Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Selling Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Publish Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Action</th>
            </tr>
          </thead>

          <tbody className="bg-gray-950 divide-y divide-gray-800">
            {
              bookList.length > 0 ? (
                bookList.map((book, index) => (
                  <tr className="hover:bg-gray-900 transition" key={index}>
                    <td className="px-6 py-3 text-sm text-gray-300">{book?.BookName}</td>
                    <td className="px-6 py-3 text-sm text-gray-300">{book?.BookTitle}</td>
                    <td className="px-6 py-3 text-sm text-gray-300">{book?.Author}</td>
                    <td className="px-6 py-3 text-sm text-gray-300">{book?.SellingPrice}</td>
                    <td className="px-6 py-3 text-sm text-gray-300">{book?.PublishDate}</td>
                    <td className="px-6 py-3 text-sm text-gray-300">
                      <div className="w-20 flex justify-center gap-5">
                        <div
                          className="h-8 w-8 flex justify-center items-center bg-red-100 text-red-600 rounded text-lg cursor-pointer"
                          onClick={() => handleDelete(book._id)}
                        >
                          <MdDelete />
                        </div>
                        <div className="h-8 w-8 flex justify-center items-center bg-green-100 text-green-600 rounded text-lg cursor-pointer"
                          onClick={()=>handleUpdate(book)}>
                          <FaPen />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No books found
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Home;
