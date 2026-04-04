import express from "express";
const router = express.Router();

router.get("/", (_, res) => {
	res.send("Ini adalah Homepage");
});

router.get("/about", (_, res) => {
  res.send("Ini adalah About");
});

router.get("/hello{/:name}", (req, res) => {
  const { name = "stranger" } = req.params;
  const { lang } = req.query;

  console.log(lang);
  if (lang === "id") {
    return res.send(`Hai, ${name}`);
  }

  res.send(`Hello, ${name}!`);
});

router.all("/", (_, res) => {
  res.status(405).send("Page is not found!");
});

router.all("/about", (_, res) => {
  res.status(405).send("Page is not found!");
});

router.use((_, res) => {
  res.send("Halaman tidak ditemukan!");
});
export default router;
