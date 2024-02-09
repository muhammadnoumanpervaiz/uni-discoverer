const router = require("express").Router();
const university = require("../models/UniversitiesSchema");

router.post("/", async (req, res) => {
  try {
    const { countryName, universities } = req.body;
    let exisitingUniversity = await university.findOne({ countryName });
    if (exisitingUniversity) {
      res.send({ error: "Data Already Exist" });
      return;
    }
    const savedUniversitiesByCountry = new university({
      countryName,
      universities,
    });
    await savedUniversitiesByCountry.save();
    res.send({ res: savedUniversitiesByCountry });
  } catch (error) {
    res.json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const universities = await university.find();
    const countries = universities.map((c) => c.countryName);
    res.send({ countries });
  } catch (error) {
    res.json(error);
  }
});

router.get("/:country", async (req, res) => {
  try {
    const countryName = req.params.country;
    const universities = await university.findOne({ countryName: countryName });
    res.send(universities);
  } catch (error) {
    res.json(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const { countryName, universities } = req.body;
    const updatedUniversity = await university.findOneAndUpdate({
      countryName,
      universities,
    });
    await updatedUniversity.save();
    res.send({ updatedUniversity });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
