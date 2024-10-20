const Watch = require("../models/watch");
const Comment = require("../models/comment");
const Brand = require("../models/brand");
const Member = require("../models/member");

class HomeController {
  // Method to get the home page
  getHomePage(req, res) {
    const member = req.session.member || null; // Get member from session or null if not logged in
    Watch.find({})
      .then((Watch) => {
        res.render('home', { Watch: Watch, Member: member });
      })
  }
  getShopPage(req, res) {
    const member = req.session.member || null; // Get member from session or null if not logged in
    Watch.find({})
      .populate('brand') // Populates the brand field with data from the Brands collection
      .then((Watch) => {
        Brand.find({})
          .then((Brand) => {
            console.log(Watch)
            res.render('shop', { Watch: Watch, Brand: Brand, Member: member });
          })
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error fetching data");
      });
  }

  getWatchDetailPage(req, res) {
    const member = req.session.member || null; // Get member from session or null if not logged in
    const err = req.session.err || null; 
    req.session.err = null;
    Watch.findById(req.params.id)
    .populate({
      path: 'comments',
      populate: {
        path: 'author', // This will populate the 'author' field inside 'comments'
        model: 'Members' // Ensure this matches your Members model
      }
    })
      .populate('brand')
      .then((Watch) => {
            res.render('details', { Watch: Watch, Member: member, err: err });
      })
      .catch((err) => {
        console.error("Error fetching brand:", err);
        res.status(500).send("Error fetching brand");
      });
  };
  postComment(req, res) {
    const member = req.session.member || null;
    const { rating, content } = req.body;
    const watchId = req.params.id; // Capture the watch ID from the URL parameter
    if (!member) {
      return res.status(403).send("You must be logged in to post a comment.");
    }
  
    // Check if the user has already commented on this watch
    Comment.findOne({ author: member._id, watch: watchId })
      .then((existingComment) => {
        if (existingComment) {
          req.session.err = 'Only one comment per watch';
          res.redirect(`/shop/details/${watchId}`);
        } else {
          // If no comment exists, create a new comment
          Comment.create({ rating: rating, content: content, author: member._id, watch: watchId })
            .then((newComment) => {
              // After creating the comment, update the watch to include this comment's ID
              return Watch.findByIdAndUpdate(
                watchId,
                { $push: { comments: newComment._id } }, // Push the comment ID to the 'comments' array
                { new: true } // Return the updated document
              );
            })
            .then(() => {
              // Redirect back to the watch detail page after adding the comment
              res.redirect(`/shop/details/${watchId}`);
            })
            .catch((err) => {
              console.error("Error posting comment:", err);
              res.status(500).send("Error posting comment");
            });
        }
      })
      .catch((err) => {
        console.error("Error checking for existing comment:", err);
        res.status(500).send("Error checking for existing comment");
      });
  }
  
  
}

module.exports = new HomeController();
