import React from "react";
import { createRoot } from "react-dom/client";
import Joi from "joi";
import { validateProps } from "./utils";
// TODO: lakukan validasi properti dengan menggunakan Joi
function News(props) {
  const { title, description, image, isFeatured, tags, bookmark, style } = validateProps(newPropsSchema, props, "News");
  return (
    <article style={style}>
      <img src={image} alt={title} />
      {isFeatured && (
        <p>
          <strong>Hot News!</strong>
        </p>
      )}
      <h2>{title}</h2>
      <p>{description}</p>
      <br />
      <p>{tags.map((tag) => `#${tag} `)}</p>
      <button onClick={bookmark}>Bookmark</button>
    </article>
  );
}

const newPropsSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  isFeatured: Joi.boolean().required(),
  tags: Joi.array().items(Joi.string()).required(),
  bookmark: Joi.function().required(),
  style: Joi.object().unknown(true),
});

// Referensi penggunaan komponen News
const root = createRoot(document.getElementById("root"));
root.render(
  <News
    title="Annual Planting"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus imperdiet sagittis metus, eget dapibus risus laoreet sed. Praesent ante magna ..."
    image="https://picsum.photos/id/239/800/600"
    isFeatured={true}
    tags={["plant", "nature", 1]}
    bookmark={() => alert("Bookmarked!")}
    style={{
      // ini opsional
      width: 300,
      border: "1px solid black",
      margin: "0 auto",
      padding: 16,
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
    }}
  />,
);
