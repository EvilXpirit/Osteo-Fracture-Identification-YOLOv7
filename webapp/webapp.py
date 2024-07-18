from flask import Flask, send_file, request, render_template
import os
import cv2
import numpy as np
import onnxruntime as ort
from pathlib import Path
from matplotlib.colors import TABLEAU_COLORS

ALLOWED_EXTENSIONS = {"txt", "pdf", "png", "jpg", "jpeg", "gif"}
parent_root = Path(__file__).parent.parent.absolute().__str__()
h, w = 640, 640
model_onnx_path = os.path.join(parent_root, "yolov7-p6-bonefracture.onnx")
device = "cuda"

def xyxy2xywhn(bbox, H, W):
    x1, y1, x2, y2 = bbox
    return [0.5*(x1+x2)/W, 0.5*(y1+y2)/H, (x2-x1)/W, (y2-y1)/H]

def xywhn2xyxy(bbox, H, W):
    x, y, w, h = bbox
    return [(x-w/2)*W, (y-h/2)*H, (x+w/2)*W, (y+h/2)*H]

colors = [TABLEAU_COLORS[col] for col in TABLEAU_COLORS]

app = Flask(__name__)

def load_img(file):
    """ Load image from bytes to numpy
    """

    file_bytes = np.asarray(bytearray(file.read()), dtype=np.uint8)
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
        if det_scores[idx] > score_threshold:
            bbox = det_bboxes[idx]
            label = det_labels[idx]
            
            bbox = xyxy2xywhn(bbox, h, w)
            label_txt += f"{int(label)} {det_scores[idx]:.5f} {bbox[0]:.5f} {bbox[1]:.5f} {bbox[2]:.5f} {bbox[3]:.5f}\n"

            bbox = xywhn2xyxy(bbox, H, W)
            bbox_int = [int(x) for x in bbox]
            x1, y1, x2, y2 = bbox_int
            color_map = colors[int(label)]
            txt = f"{id2names[label]} {det_scores[idx]:.2f}"
            (text_width, text_height), _ = cv2.getTextSize(txt, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)
            
            cv2.rectangle(img, (x1, y1), (x2, y2), color_map, 2)
            cv2.rectangle(img, (x1-2, y1-text_height-10), (x1 + text_width+2, y1), color_map, -1)
            cv2.putText(img, txt, (x1, y1-5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
    
    return img, label_txt

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return "No file part"
    file = request.files['file']
    if file.filename == '':
        return "No selected file"
    if file:
        img = load_img(file)
        img_pp = preproc(img)
        out = model_inference(model_onnx_path, img_pp, device)
        out_img, out_txt = post_process(img, out)
        cv2.imwrite('static/predicted_image.png', out_img)
        return render_template('predict.html', image_path='static/predicted_image.png')

if __name__ == "__main__":
    app.run(debug=True)
