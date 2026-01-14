const Book  = require('../model/book.model');

const handlebookstorecontroller = async (req, res) => {
  try {
    const body = req.body;
    console.log("REQ BODY:", body); // 👈 DEBUG 1

    if (
      !body.BookName ||
      !body.BookTitle ||
      !body.Author ||
      !body.SellingPrice
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const bookadd = await Book.create(body); // 👈 MUST USE create
    console.log("BOOK ADDED:", bookadd);     // 👈 DEBUG 2

    return res.status(201).json({
      message: "Book added successfully",
      success: true,
      Id: bookadd?._id,
      data: bookadd,
    });

  } catch (error) {
    console.error("🔥 REAL ERROR:", error); // 👈 MOST IMPORTANT

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


const handlebooklistcontroller= async (req,res)=>{
  try{
    const booklist = await Book.find({});
    
    return res.status(200).json({
        message: "All books fetched successfully",
        success: true,
        TotalCount: booklist.length,
        data: booklist,
      });
  }catch(error){
     return res.status(500).json({
      message: error.message,
      success: false,
    });

  }
};

const handlebookDeletecontroller = async (req, res) => {
  try {
    const body = req.body; // ✅ ADD THIS LINE

    const deleted = await Book.deleteOne({ _id: body.Id });

    if (deleted.deletedCount > 0) {
      return res.status(200).json({
        message: "Book deleted successfully",
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


const handlebookUpdatecontroller = async (req, res) => {
  try {
    const body = req.body;

    const updating = await Book.updateOne(
      { _id: body._id },
      { $set: body }
    );

    if (updating.modifiedCount > 0) {
      return res.status(200).json({
        message: "Book updated successfully",
        success: true,
      });
    }

    return res.status(200).json({
      message: "No changes made",
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


module.exports = { handlebookstorecontroller , handlebooklistcontroller,handlebookDeletecontroller ,handlebookUpdatecontroller};
