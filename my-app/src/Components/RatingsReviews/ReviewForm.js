import { useState } from "react";
import Star from "./Star";
import serverIO from "./serverIO";

const ReviewForm = (props) => {
  const { meta } = props;
  const { characteristics } = meta;
  const [Size, setSize] = useState(0);
  const [Width, setWidth] = useState(0);
  const [Comfort, setComfort] = useState(0);
  const [Quality, setQuality] = useState(0);
  const [Length, setLength] = useState(0);
  const [Fit, setFit] = useState(0);
  const charStates = { Size, Width, Comfort, Quality, Length, Fit };
  const [body, setBody] = useState("");
  const [summary, setSummary] = useState("");
  const [recommend, setRecommend] = useState(false);
  const [reviewer_name, setReviewerName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [showValidity, setShowValidity] = useState(false);

  const BODY_MIN = 50;
  const CHAR_MAX = 60;
  const BODY_MAX = 1000;

  const openModal = () => {
    window.reviewFormWindow.showModal();
  };

  const closeModal = () => {
    window.reviewFormWindow.close();
  };
  const validateRating = () => {
    const valid = rating > 0;
    setShowValidity(!valid);
    document.getElementById("rate-select").focus();
    return valid;
  };

  const handleSubmit = (e) => {
    if (!validateRating()) {
      e.preventDefault();
      return;
    }

    const params = {
      product_id: Number(meta.product_id),
      rating: rating,
      summary: summary,
      body: body,
      recommend: recommend,
      name: reviewer_name,
      email: email,
      photos: [],
      characteristics: {},
    };

    for (const key in charStates) {
      if (charStates[key] > 0) {
        const id = meta.characteristics[key].id;
        params.characteristics[id] = charStates[key];
      }
    }
    console.log(params);

    serverIO.submitReview(params);
  };

  const charLegend = {
    Size: [
      "A size too small",
      "1/2 a size too small",
      "Perfect",
      "1/2 a size too big",
      "A size too big",
    ],
    Width: [
      "Too narrow",
      "Slightly narrow",
      "Perfect",
      "Slightly wide",
      "Too wide",
    ],
    Comfort: [
      "Uncomfortable",
      "Slightly uncomfortable",
      "Ok",
      "Comfortable",
      "Perfect",
    ],
    Quality: [
      "Poor",
      "Below average",
      "What I expected",
      "Pretty great",
      "Perfect",
    ],
    Length: [
      "Runs Short",
      "Runs slightly short",
      "Perfect",
      "Runs slightly long",
      "Runs long",
    ],
    Fit: [
      "Runs tight",
      "Runs slightly tight",
      "Perfect",
      "Runs slightly tight",
      "Runs tight",
    ],
  };

  const getCharDescription = (char, value) => {
    if (value === 0) return "*";
    else return " - " + charLegend[char][value - 1];
  };

  const stars = [];
  for (let i = 1; i < 6; i++) {
    const select = setRating.bind(null, i);
    const fill = rating < i ? 0 : 100;
    stars.push(
      <span key={`star-select-${i}`} onClick={select}>
        <Star id={`star-select-${i}`} size="xl" fill={fill} />
      </span>,
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isChecked = e.target.checked;
    switch (name) {
      case "Size":
        setSize(Number(value));
        break;
      case "Width":
        setWidth(Number(value));
        break;
      case "Comfort":
        setComfort(Number(value));
        break;
      case "Quality":
        setQuality(Number(value));
        break;
      case "Length":
        setLength(Number(value));
        break;
      case "Fit":
        setFit(Number(value));
        break;
      case "recommend":
        setRecommend(isChecked);
        break;
      case "body":
        setBody(value);
        break;
      case "summary":
        setSummary(value);
        break;
      case "reviewer_name":
        setReviewerName(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const charSelectors = [];
  for (let key in characteristics) {
    const buttons = [];
    for (let i = 0; i < 5; i++) {
      buttons.push(
        <input
          required
          type="radio"
          onChange={handleChange}
          name={key}
          key={key + i}
          value={i + 1}
        />,
      );
    }
    charSelectors.push(
      <fieldset key={key}>
        <legend>{key + getCharDescription(key, charStates[key])}</legend>
        {buttons}
      </fieldset>,
    );
  }

  let bodyProgress = `${body.length}/${BODY_MAX}`;
  if (body.length < BODY_MIN) {
    bodyProgress += ` (minimum required characters left: ${
      BODY_MIN - body.length
    })`;
  } else {
    bodyProgress += ` (minimum reached)`;
  }

  return (
    <div className="flex items-center m-4">
      <button className="btn grow" onClick={openModal}>
        Review this product!
      </button>
      <dialog id="reviewFormWindow" className="modal">
        <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
          <section>
            <p id="rate-select">Select a Star Rating*</p>
            <div className="flex items-center">{stars}</div>
            <p hidden={!showValidity}>
              Please select a rating between 1 and 5 stars
            </p>

            <label forname="recommend" className="label">
              Would you recommend purchasing this product?*
            </label>
            <input
              name="recommend"
              type="checkbox"
              className="checkbox"
              onChange={handleChange}
              maxLength={CHAR_MAX}
            />

            <label forname="summary" className="label">
              TLDR:
            </label>
            <input
              type="text"
              name="summary"
              onChange={handleChange}
              className="input-bordered"
              maxLength={CHAR_MAX}
            />

            <label forname="body" className="label">
              Tell us more...*
            </label>
            <div className="flex items-center">
              <textarea
                required
                name="body"
                onChange={handleChange}
                className="textarea-bordered grow h-16"
                minLength={BODY_MIN}
                maxLength={BODY_MAX}
              />
            </div>
            <p>{bodyProgress}</p>

            <label forname="reviewer_name" className="label">
              Nickname*
            </label>
            <input
              required
              type="text"
              onChange={handleChange}
              name="reviewer_name"
              className="input-bordered"
              maxLength={CHAR_MAX}
            />

            <label forname="email" className="label">
              Email*
            </label>
            <input
              required
              type="text"
              onChange={handleChange}
              name="email"
              className="input-bordered"
              maxLength={CHAR_MAX}
            />

            {charSelectors}
          </section>

          <menu className="modal-action">
            <button className="btn">Submit</button>
            <button className="btn" type="button" onClick={closeModal}>
              Cancel
            </button>
          </menu>
        </form>
      </dialog>
    </div>
  );
};

export default ReviewForm;
