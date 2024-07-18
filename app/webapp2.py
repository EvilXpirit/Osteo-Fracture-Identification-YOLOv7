import os
import cv2
import numpy as np
import streamlit as st
import onnxruntime as ort
from matplotlib.colors import TABLEAU_COLORS 
from pathlib import Path
import base64


# def get_img_as_base64(file):
#     with open(file, "rb") as f:
#         data = f.read()
#     return base64.b64encode(data).decode()

def get_img_as_base64(file):
    file_path = os.path.join(os.getcwd(), file)  # Assuming file is in the current working directory
    try:
        with open(file_path, "rb") as f:
            data = f.read()
            return base64.b64encode(data).decode()
    except FileNotFoundError:
        st.error(f"File '{file}' not found. Please check the file path.")
        return None


# background = get_img_as_base64("C:/Users/Future/Desktop/YOLOv7-Bone-Fracture-Detection-main/app/medical-background.jpeg")
background = get_img_as_base64("./app/medical-background.jpeg")
# hand = get_img_as_base64("C:/Users/Future/Desktop/YOLOv7-Bone-Fracture-Detection-main/app/bone_hand.jpg")



ALLOWED_EXTENSIONS = {"txt", "pdf", "png", "jpg", "jpeg", "gif"}
parent_root = Path(__file__).parent.parent.absolute().__str__() # os.path.dirname(os.path.abspath(__file__))
h, w = 640, 640
model_onnx_path = os.path.join(parent_root, "yolov7-p6-bonefracture.onnx")
device = "cuda"

def color_list():
    # Return first 10 plt colors as (r,g,b) https://stackoverflow.com/questions/51350872/python-from-color-name-to-rgb
    def hex2rgb(h):
        return tuple(int(h[1 + i:1 + i + 2], 16) for i in (0, 2, 4))

    return [hex2rgb(h) for h in TABLEAU_COLORS.values()]

colors = color_list()

def xyxy2xywhn(bbox, H, W):

    x1, y1, x2, y2 = bbox

    return [0.5*(x1+x2)/W, 0.5*(y1+y2)/H, (x2-x1)/W, (y2-y1)/H]

def xywhn2xyxy(bbox, H, W):

    x, y, w, h = bbox

    return [(x-w/2)*W, (y-h/2)*H, (x+w/2)*W, (y+h/2)*H]

def load_img(uploaded_file):
    """ Load image from bytes to numpy
    """

    file_bytes = np.asarray(bytearray(uploaded_file.read()), dtype=np.uint8)
    opencv_image = cv2.imdecode(file_bytes, 1)
    return opencv_image[..., ::-1]

def preproc(img):
    """ Image preprocessing
    """
    img = cv2.resize(img, (w, h), interpolation=cv2.INTER_LINEAR)
    img = img.astype(np.float32).transpose(2, 0, 1)/255
    return np.expand_dims(img, axis=0)

def model_inference(model_path, image_np, device="cpu"):

    providers = ["CUDAExecutionProvider"] if device=="cuda" else ["CPUExecutionProvider"]
    session = ort.InferenceSession(model_path, providers=providers)
    input_name = session.get_inputs()[0].name
    output_name = session.get_outputs()[0].name
    output = session.run([output_name], {input_name: image_np})

    return output[0][:, :6]


def post_process(img, output, score_threshold=0.3):
    """
    Draw bounding boxes on the input image. Dump boxes in a txt file.
    """
    # assert format == "xyxy" or format == "xywh"

    det_bboxes, det_scores, det_labels = output[:, 0:4], output[:, 4], output[:, 5]
    id2names = {
        0: "boneanomaly", 1: "bonelesion", 2: "foreignbody", 
        3: "fracture", 4: "metal", 5: "periostealreaction", 
        6: "pronatorsign", 7:"softtissue", 8:"text"
    }

    if isinstance(img, str):
        img = cv2.imread(img)
    
    img = img.astype(np.uint8)
    H, W = img.shape[:2]
    label_txt = ""

    for idx in range(len(det_bboxes)):
        if det_scores[idx]>score_threshold:
            bbox = det_bboxes[idx]
            label = det_labels[idx]
            
            # Convert bbox from normalized form to pixel values
            bbox = xyxy2xywhn(bbox, h, w)
            bbox_pixel = [int(bbox[0]*W), int(bbox[1]*H), int(bbox[2]*W), int(bbox[3]*H)]
            label_txt += f"{int(label)} {det_scores[idx]*100:.2f}% {bbox_pixel[0]} {bbox_pixel[1]} {bbox_pixel[2]} {bbox_pixel[3]}\n"

            # Convert confidence score to percentage
            conf_percentage = det_scores[idx] * 100

            # Draw bounding box on the image
            bbox = xywhn2xyxy(bbox, H, W)
            bbox_int = [int(x) for x in bbox]
            x1, y1, x2, y2 = bbox_int
            color_map = colors[int(label)]
            txt = f"{id2names[label]} {conf_percentage:.2f}%"
            (text_width, text_height), _ = cv2.getTextSize(txt, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)
            
            cv2.rectangle(img, (x1, y1), (x2, y2), color_map, 2)
            cv2.rectangle(img, (x1-2, y1-text_height-10), (x1 + text_width+2, y1), color_map, -1)
            cv2.putText(img, txt, (x1, y1-5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
    
    return img, label_txt

# Custom HTML template with background image
custom_html = f"""
<style>
[data-testid="stAppViewContainer"] > .main {{
background-image: url("data:image/png;base64,{background}");
 background-size: cover; 
 background-position: center; 
background-repeat: no-repeat;
}}


[data-testid="stHeader"] {{
background: rgba(0,0,0,0);
}}

[data-testid="stToolbar"] {{
right: 2rem;
}}

</style>
"""

# Display the custom HTML
st.markdown(custom_html, unsafe_allow_html=True)

# Custom HTML template with background image
custom_html2 = f"""
<div style="background-image: url('https://t4.ftcdn.net/jpg/05/75/79/71/360_F_575797114_S5OeWNJaUSxWx4ociLgVNeJ2oPy8XRpj.jpg'); background-size: cover; background-position: center; font-family: Arial, sans-serif; padding: 20px; border-radius: 20px;">
    <h1 style="text-align: center;">Upload Image Below</h1>
    </div>
</div>
"""

# Display the custom HTML
st.markdown(custom_html2, unsafe_allow_html=True)

st.sidebar.markdown("### Instructions")
st.sidebar.markdown("""
1. Upload an image using the file uploader on the main page.
2. Adjust the object confidence threshold using the slider.
3. Click the 'Predict' button to see the model's predictions.
4. Download the prediction or detection results using the download buttons.
""")

st.sidebar.markdown('<a href="http://localhost:5173/" style="text-decoration: none;"><button style="padding: 10px 20px; background-color: #f0f0f0; color: #333; border: none; cursor: pointer; border-radius: 5px;">Go Back to Home</button></a>', unsafe_allow_html=True)


# File uploader and processing logic
uploaded_file = st.file_uploader(" ", type=["png", "jpg", "jpeg", "gif"], key='file-upload')

if uploaded_file is not None:
    conf_thres = st.slider("Object confidence threshold", 0.2, 1., step=0.05)

    # load and display orignal image
    img = load_img(uploaded_file)

    # inference
    img_pp = preproc(img)
    out = model_inference(model_onnx_path, img_pp, device)
    out_img, out_txt = post_process(img, out, conf_thres)
    st.image(out_img, caption="Prediction", channels="RGB")

    col1, col2 = st.columns(2)

    col1.download_button(
        label="Download prediction",
        data=cv2.imencode(".png", out_img[..., ::-1])[1].tobytes(),
        file_name=uploaded_file.name,
        mime="image/png"
    )
    col2.download_button(
        label="Download detections",
        data=out_txt,
        file_name=uploaded_file.name[:-4] + ".txt",
        mime="text/plain"
    )
