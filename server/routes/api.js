const express = require("express");
const router = express.Router();

const firebase = require("../firebase");
const { firestore } = require("firebase");
const firestoreDb = firebase.firestore();

router.post("/level/:id/:level", (req, res) => {
  console.log(req.params);
  firestoreDb
    .collection("plants")
    .doc(req.params.id)
    .update({
      level: req.params.level,
    })
    .then(() => {
      res.json({
        status: "ok",
      });
    });
});

router.get("/readings/:id/", (req, res) => {
  firestoreDb
    .collection(`plants/${req.params.id}/readings`)
    .orderBy("time", "desc")
    .where(
      "time",
      ">=",
      firestore.Timestamp.fromDate(
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
      )
    )
    .get()
    .then(snapshot => {
      console.log(snapshot.docs.length);
      const data = snapshot.docs.map(doc => doc.data());
      res.json({
        status: "ok",
        data,
      });
    });
});

module.exports = router;
