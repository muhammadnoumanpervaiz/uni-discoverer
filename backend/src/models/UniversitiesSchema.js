const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const universitySchema = new Schema(
  {
    countryName: {
      type: String,
      required: true,
    },
    universities: [
      {
        domains: {
          type: [String],
          required: false,
        },
        name: {
          type: String,
          required: false,
        },
        alpha_two_code: {
          type: String,
          required: false,
        },
        web_pages: {
          type: [String],
          required: false,
        },
        "state-province": {
          type: String,
          required: false,
        },
        country: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("university", universitySchema);
