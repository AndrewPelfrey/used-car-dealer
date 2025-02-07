// import express from "express";
// import Contact from "./models/ContactModel";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const newMessage = await Contact.create(req.body);
//   res.json(newMessage);
// });

// router.get("/", async (req, res) => {
//   const messages = await Contact.findAll();
//   res.json(messages);
// });

// router.delete("/:id", async (req, res) => {
//   await Contact.destroy({ where: { id: req.params.id } });
//   res.sendStatus(204);
// });

// export default router;
