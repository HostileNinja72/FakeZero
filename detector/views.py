from rest_framework.decorators import api_view
from rest_framework.response import Response
from transformers import pipeline

# Load your pre-trained model
model = pipeline("text-classification", model="your-model-path-or-huggingface-model")

@api_view(["POST"])
def predict(request):
    article = request.data.get("article", "")
    # Predict using the model
    result = model(article)[0]
    label = result["label"]
    confidence = result["score"]
    return Response({"label": label, "confidence": confidence})