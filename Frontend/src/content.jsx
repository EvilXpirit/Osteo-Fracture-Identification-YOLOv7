import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import banner from "./images/bone-banner.jpeg";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import medical from "./images/medical4.png";
import medical2 from "./images/medical6.png";
import medical3 from "./images/x-ray.png";
import medical4 from "./images/medical.png";
import medical5 from "./images/medical2.png";
import bone from "./images/bone fracture.png";
import MyLottieAnimation from "./MyLottieAnimation";
import MyLottieAnimation2 from "./MyLottieAnimation2";
import MyLottieAnimation3 from "./MyLottieAnimation3";
import AnimatedTextCharacter from "./AnimatedTextCharacter";

const Content = () => {
  return (
    <div className="content">
      <motion.div
        className="banner mb-5"
        id="home"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{ backgroundImage: `url(${banner})` }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="title z-1 position-relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {" "}
            <h1 className="osteo-title">
              <motion.div
                initial={{ y: -40, opacity: 1 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.1, 1, 1.15],
                  rotate: [1, 1, 2, 0],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 0,
                }}
              >
                Osteo
              </motion.div>
            </h1>
            <h1 className="fracture-title">
              <motion.div
                initial={{ y: -40, opacity: 1 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.5, 1, 1.15],
                  rotate: [1, 0, 2, 0],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 0,
                }}
              >
                Fracture
              </motion.div>
            </h1>
            <h1 className="identification-title">
              <motion.div
                initial={{ y: -40, opacity: 1 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.1, 1, 1.15],
                  rotate: [1, 0, 2, -2],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 0,
                }}
              >
                Identification
              </motion.div>
            </h1>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ y: -40, opacity: 1 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: [1, 1.1, 1, 1.15],
            rotate: [1, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 0,
          }}
          className="bone-banner-img"
        >
          <img className="bone-img" src={bone} />
        </motion.div>
        <motion.div
          initial={{ y: -20, opacity: 1 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: [1, 1.1, 1, 1.15],
            rotate: [1, 0, 2, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 0,
          }}
          className="scan-animation"
        >
          <MyLottieAnimation2 />
        </motion.div>
      </motion.div>
      <Container>
        <Row className="flex-column flex-sm-row">
          <p className="fw-bolder fs-2 heading">
            <AnimatedTextCharacter text="Get Started With Our App" />
          </p>
          <Col>
            <p className="fs-5 pt-3">
              <motion.span
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Fractures of bones are a common medical issue, often resulting
                from accidents or incidents involving significant force on the
                skeletal structure. Accurate fracture identification is crucial
                for effective patient care, as even experienced radiologists can
                miss fractures, especially in complex cases. To address this, we
                propose a novel computer-aided detection system powered by
                cutting-edge machine learning and deep learning algorithms. Our
                approach is grounded in an extensive literature review,
                providing a solid foundation for the development of our system.
                The primary objective of our system is to create a highly
                effective image processing system capable of swiftly and
                accurately Identifying bone fractures using X-ray images.
              </motion.span>
            </p>
            <motion.div
              initial={{ y: -40, opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 0,
              }}
            >
              <MyLottieAnimation3 />
            </motion.div>
            <motion.div
              initial={{ y: -40, opacity: 1 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: [1, 1.05, 1, 1.1],
                rotate: [1, -1, 1, 0],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 0,
              }}
            >
              <button
                type="button"
                className="detect-button btn btn-danger btn-lg rounded-pill fw-bold fs-3"
                onClick={() =>
                  (window.location.href = "https://osteo-fracture-identification.streamlit.app")
                }
              >
                Detect Fracture
              </button>
            </motion.div>
          </Col>
          <Col sm={6}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                initial={{ y: -40, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 0,
                }}
              >
                <img className="patient w-100" src={medical} />
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
      <div className="instructions" id="instructions">
        <Container>
          <Row className="flex-column-reverse flex-sm-row">
            <Col>
              <motion.div
                initial={{ y: -40, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 0,
                }}
              >
                <img className="w-75" src={medical2} />
              </motion.div>
            </Col>
            <Col>
              <p className="fw-bolder fs-2 heading mb-5">
                <AnimatedTextCharacter text="Instructions" />
              </p>
              <ul className="fs-4">
                <li>
                  <strong>Upload Image:</strong> Click the file uploader to
                  select an image (PNG, JPG, JPEG, or GIF) from your device.
                </li>
                <li>
                  <strong>Adjust Threshold:</strong> Use the slider to set the
                  object confidence threshold (from 0.2 to 1.0).
                </li>
                <li>
                  <strong>View Predictions:</strong> Click the 'Predict' button
                  to see the model's predictions on the uploaded image.
                </li>
                <li>
                  <strong>Download Results:</strong> Use the download buttons to
                  save the prediction image and detection results as a text
                  file.
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="our-mission2 mt-1">
        <Container>
          <Row className="flex-column flex-sm-row">
            <Col>
              <p className="fs-3 mt-3">
                <strong>Go Back to Home: </strong>
                Use the provided button in the sidebar to navigate back to the
                home page or another relevant link.
              </p>
            </Col>
            <Col>
              <motion.div
                className="ms-5"
                initial={{ y: -40, opacity: 1 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.1, 1, 1.15],
                  rotate: [1, 0, 2, 0],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 0,
                }}
              >
                <MyLottieAnimation />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="mt-5">
        <Row className="flex-column-reverse flex-sm-row">
          <Col>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                initial={{ y: -40, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 0,
                }}
              >
                <img className="w-75" src={medical3} />
              </motion.div>
            </motion.div>
          </Col>
          <Col>
            <p className="fw-bolder fs-2 mt-1">
              <AnimatedTextCharacter text="How It Works:" />
            </p>
            <p className="fs-5 pt-3">
              <motion.span
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ul>
                  <li>
                    <strong>Image Upload:</strong> The app analyzes the uploaded
                    medical image using a trained model to identify potential
                    bone fractures or abnormalities.
                  </li>
                  <li>
                    <strong>Detection Process:</strong> The app detects and
                    highlights areas of interest, such as fractures, foreign
                    bodies, or other anomalies.
                  </li>
                  <li>
                    <strong>Adjust Threshold:</strong> You can adjust the
                    sensitivity of the detection to focus on areas with higher
                    certainty of abnormalities.
                  </li>
                  <li>
                    <strong>Visual Feedback:</strong> Detected areas are marked
                    with bounding boxes and labels, making it easy to identify
                    them in the image.
                  </li>
                  <li>
                    <strong>Download Options:</strong> You can download the
                    annotated image for reference or the detection results for
                    further analysis.
                  </li>
                </ul>
              </motion.span>
            </p>
          </Col>
        </Row>
      </Container>
      <div className="info" id="info">
        <Container>
          <Row className="flex-column flex-sm-row">
            <p className="fw-bolder fs-2 mt-1">
              <AnimatedTextCharacter text="Results Interpretation: " />
            </p>
            <Col>
              <ul className="fs-4">
                <li>
                  <strong>Fracture Detection:</strong> Areas where the model
                  detects potential fractures are marked with boxes and labeled
                  as "Fracture" with a confidence score.
                </li>
                <li>
                  <strong>Other Anomalies:</strong> The model can also detect
                  other bone anomalies, foreign bodies, and soft tissue
                  abnormalities, each labeled accordingly with a confidence
                  score.
                </li>
                <li>
                  <strong>Accuracy:</strong> The model's predictions are based
                  on its training on various bone images and may not be 100%
                  accurate, so consult a medical professional for a definitive
                  diagnosis.
                </li>
              </ul>
            </Col>
            <Col>
              <motion.div
                initial={{ y: -40, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 0,
                }}
              >
                <img className="w-100 ms-5" src={medical4} />
              </motion.div>{" "}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="our-vision">
        <Container>
          <Row className="flex-column-reverse flex-sm-row">
            <Col className="">
              <motion.div
                className=""
                initial={{ y: -40, opacity: 1 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: [1, 1.1, 1, 1.15],
                  rotate: [1, 0, 2, 0],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 0,
                }}
              >
                <img className="w-100" src={medical5} />
              </motion.div>
            </Col>
            <Col>
            <p className="fw-bolder fs-2 mt-1">
              <AnimatedTextCharacter text="Important Information: " />
            </p>
              <ul className="fs-4">
                <li>
                  <strong>Accuracy Disclaimer:</strong> The model's predictions
                  are based on patterns it learned during training and may not
                  always be accurate. Always consult a healthcare professional
                  for medical advice.
                </li>
                <li>
                  <strong>Confidentiality:</strong> Uploaded images are not
                  stored or shared; they are processed solely for the purpose of
                  making predictions in the app.
                </li>
                <li>
                  <strong>For Medical Use:</strong> This app is designed for
                  educational and informational purposes only and should not
                  replace professional medical advice or diagnosis.
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Content;
