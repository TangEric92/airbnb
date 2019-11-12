const express = require("express");
const router = express.Router();

const db_room = require("../models/db_room");

router.post("/api/room/publish", async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const photos = req.body.photos;
    const price = req.body.price;
    const city = req.body.city;
    const loc = req.body.loc;

    if (title !== null && price !== null && city !== null) {
      const newRoom = new db_room({
        title: title,
        description: description,
        photos: photos,
        price: price,
        city: city,
        loc: loc
      });
      await newRoom.save();
      res.status(200).json(newRoom);
    } else {
      res.status(400).json("Veuillez compléter les champs");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/api/room/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const room = await db_room.findOne({ _id: id });
    res.json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/api/room", async (req, res) => {
  const city = req.query.city;
  const priceMin = req.query.priceMin;
  const priceMax = req.query.priceMax;

  //console.log(city);
  try {
    const options = {};
    if (priceMin !== undefined) {
      options.price = { $gt: priceMin };
    }
    if (priceMax !== undefined) {
      options.price = { $lt: priceMax };
    }
    if (city !== undefined) {
      options.city = city;
    }
    //console.log(options);
    const room = await db_room.find(options);
    const resultats = {
      rooms: room,
      count: room.length
    };

    return res.json(resultats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
