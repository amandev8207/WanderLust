const mongoose = require("mongoose");
const reviews = require("./reviews");
const Schema = mongoose.Schema;
const Review = require("./reviews");

const listingShcema = new Schema({
    title: {
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    }

});

// Index for text-based search on 'title' and 'description'
listingShcema.index({ title: "text", description: "text" });

listingShcema.post("findOneAndDelete",async(listing) => {
    if(listing) {
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingShcema);
module.exports = Listing;