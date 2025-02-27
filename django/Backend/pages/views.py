import os
import torch
import torch.nn.functional as F
from transformers import BertTokenizer, BertForSequenceClassification
from rest_framework.decorators import api_view
from rest_framework.response import Response


MODEL_DIR = "/home/env/backend/models"

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


FAKE_NEWS_MODEL_PATH = os.path.join(MODEL_DIR, "model1.pth")
TOKENIZER_PATH = os.path.join(MODEL_DIR, "bert-base-uncased")

if os.path.exists(FAKE_NEWS_MODEL_PATH):
    try:
        print("🔄 Loading Fake News Detection Model...")
        fake_news_tokenizer = BertTokenizer.from_pretrained(TOKENIZER_PATH)
        fake_news_model = BertForSequenceClassification.from_pretrained(TOKENIZER_PATH, num_labels=2)
        fake_news_model.load_state_dict(torch.load(FAKE_NEWS_MODEL_PATH, map_location=device))
        fake_news_model.to(device)
        fake_news_model.eval()
        print("✅ Fake News Model Loaded Successfully!")
    except Exception as e:
        print(f"❌ Error loading Fake News Model: {e}")
        fake_news_model = None
else:
    print(f"❌ Fake News Model file not found: {FAKE_NEWS_MODEL_PATH}")
    fake_news_model = None


CATEGORY_MODEL_PATH = os.path.join(MODEL_DIR, "bert_text_classifier")
CATEGORY_TOKENIZER_PATH = os.path.join(MODEL_DIR, "bert_text_classifier")

if os.path.exists(CATEGORY_MODEL_PATH):
    try:
        print("🔄 Loading Category Classification Model...")
        category_model = BertForSequenceClassification.from_pretrained(CATEGORY_MODEL_PATH)
        category_tokenizer = BertTokenizer.from_pretrained(CATEGORY_TOKENIZER_PATH)
        category_model.to(device)
        category_model.eval()
        print("✅ Category Model Loaded Successfully!")
    except Exception as e:
        print(f"❌ Error loading Category Model: {e}")
        category_model = None
else:
    print(f"❌ Category Model file not found: {CATEGORY_MODEL_PATH}")
    category_model = None

# ✅ Label mapping for category classification
label_mapping = {
    0: "tech",
    1: "business",
    2: "sports",
    3: "entertainment",
    4: "politics"
}

@api_view(["POST"])
def analyze_text(request):
    """
    API endpoint to analyze text for fake news and category classification.
    """
    try:
        text = request.data.get("text", "")
        print(f"📩 Received Text: {text}")

        if not text:
            print("❌ Error: No text provided")
            return Response({"error": "No text provided"}, status=400)

        response_data = {}

        # ✅ **Fake News Prediction**
        if fake_news_model:
            fake_inputs = fake_news_tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512).to(device)
            with torch.no_grad():
                fake_outputs = fake_news_model(**fake_inputs)

            fake_probabilities = F.softmax(fake_outputs.logits, dim=1)
            fake_pred = torch.argmax(fake_probabilities, 1).item()
            fake_news_result = "Real" if fake_pred == 1 else "Fake"

            fake_news_confidence = {
                "Real": round(fake_probabilities[0][1].item() * 100, 2),
                "Fake": round(fake_probabilities[0][0].item() * 100, 2),
            }

            response_data["fake_news"] = {"prediction": fake_news_result, "confidence": fake_news_confidence}
        else:
            print("⚠️ Fake News Model is not available")
            response_data["fake_news"] = {"error": "Fake news model is unavailable"}

        # ✅ **Category Classification**
        if category_model:
            category_inputs = category_tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512).to(device)
            with torch.no_grad():
                category_outputs = category_model(**category_inputs)

            category_probabilities = F.softmax(category_outputs.logits, dim=1)
            category_pred = torch.argmax(category_probabilities, dim=1).item()
            category_result = label_mapping.get(category_pred, "unknown")
            category_confidence = {label_mapping[i]: round(category_probabilities[0][i].item() * 100, 2) for i in range(len(label_mapping))}

            response_data["category"] = {"prediction": category_result, "confidence": category_confidence}
        else:
            print("⚠️ Category Model is not available")
            response_data["category"] = {"error": "Category model is unavailable"}

        print("✅ Successfully processed the text")
        return Response(response_data)

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return Response({"error": str(e)}, status=500)
