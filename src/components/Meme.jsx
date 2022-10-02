import React from "react";

const Meme = () => {
  let img;
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    // randomImage: "Drake Hotline Bling",
    imgUrl: "",
    message: "",
  });

  const [loading, setLoading] = React.useState(true);

  function generateNewImage() {
    setLoading(true);
    setMeme((state) => ({ ...state, message: "Generating new image..." }));
    fetch(
      "https://api.unsplash.com/photos/random/?client_id=Ig1PmFjHSihJpgtpBf57PxcBvHFITWIqAhkagSfIgbI"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setLoading(false);

        setMeme((state) => ({
          ...state,
          topText: "",
          bottomText: "",
          imgUrl: data.urls.full,
          message: "",
        }));
      })
      .catch((error) => {
        console.error(error);
        setMeme((state) => ({
          ...state,
          message: "Failed to generate image",
        }));
      });
  }

  React.useEffect(() => {
    generateNewImage();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <p>{img}</p>
      <div className="form">
        <div className="input-container">
          <input
            type="text"
            placeholder="Top text"
            className="form--input"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Bottom text"
            className="form--input"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
        <button className="form--button" onClick={generateNewImage}>
          Get a new meme image
        </button>
      </div>

      {loading ? (
        <h4 style={{ textAlign: "center", fontStyle: "italic" }}>
          {meme.message}
        </h4>
      ) : (
        <div className="meme">
          <img src={meme.imgUrl} />
          <div className="meme-container">
            <h2>{meme.topText}</h2>
            <h2>{meme.bottomText}</h2>
          </div>
        </div>
      )}
    </main>
  );
};

export default Meme;
