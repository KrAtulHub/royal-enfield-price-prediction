import streamlit as st
import pandas as pd
import numpy as np
import joblib
from datetime import datetime

# Streamlit App for Royal Enfield Bike Price Prediction
st.set_page_config(page_title="Royal Enfield Price Predictor", page_icon="🏍️", layout="centered")

# Title and description
st.title("🏍️ Royal Enfield Bike Price Predictor")
st.markdown("### Predict the resale price of your Royal Enfield motorcycle with precision!")

# Load the trained model and encoders
@st.cache_resource
def load_model():
    try:
        model = joblib.load("royal_enfield_model.pkl")
        le_model = joblib.load("le_model.pkl")
        le_owner = joblib.load("le_owner.pkl")
        le_transmission = joblib.load("le_transmission.pkl")
        return model, le_model, le_owner, le_transmission, True
    except (FileNotFoundError, Exception) as e:
        return None, None, None, None, False

# Load model and encoders
model, le_model, le_owner, le_transmission, model_loaded = load_model()

# Define bike model information with pros and cons
bike_info = {
    "Classic 350": {
        "pros": ["Timeless design", "Great build quality", "Comfortable for long rides", "Good resale value"],
        "cons": ["Heavy weight", "Less powerful compared to newer models", "Basic features"]
    },
    "Bullet 350": {
        "pros": ["Iconic design", "Very comfortable seating", "Excellent build quality", "Unique thump sound"],
        "cons": ["Heavy and difficult to maneuver", "Low power output", "High maintenance cost"]
    },
    "Himalayan": {
        "pros": ["Adventure touring capability", "Upright riding position", "Good ground clearance", "Affordable adventure bike"],
        "cons": ["Less powerful engine", "Basic features", "Not ideal for highway cruising"]
    },
    "Meteor 350": {
        "pros": ["Modern cruiser design", "Powerful engine", "Comfortable for city and highway", "Good features"],
        "cons": ["Higher price point", "Less luggage space", "Not suitable for off-roading"]
    },
    "Hunter 350": {
        "pros": ["Retro cafe racer design", "Lightweight and agile", "Fuel efficient", "Affordable price"],
        "cons": ["Less comfortable for long rides", "Limited touring capability", "Basic instrumentation"]
    },
    "Continental GT 650": {
        "pros": ["Premium cafe racer design", "Powerful 650cc engine", "Excellent performance", "High-quality components"],
        "cons": ["Higher price point", "Less practical for daily commuting", "Requires more maintenance"]
    },
    "INT 650": {
        "pros": ["Versatile design", "Strong 650cc engine", "Good for both city and touring", "Modern features"],
        "cons": ["Higher cost than 350cc models", "More complex maintenance", "Heavier than 350cc bikes"]
    },
    "Scram 411": {
        "pros": ["Adventure styling", "Good ground clearance", "Lightweight", "Fuel efficient"],
        "cons": ["Less powerful engine", "Limited luggage capacity", "Basic features"]
    },
    "Guerrilla 450": {
        "pros": ["Adventure touring focus", "Modern engine technology", "Good performance", "Advanced features"],
        "cons": ["Higher price", "More complex maintenance", "Less proven track record"]
    },
    "Himalayan 450": {
        "pros": ["Upgraded adventure bike", "More powerful engine", "Improved performance", "Modern features"],
        "cons": ["Higher cost", "More maintenance requirements", "Heavier than previous model"]
    },
    "Super Meteor 650": {
        "pros": ["Powerful 650cc engine", "Modern cruiser design", "Excellent performance", "Premium components"],
        "cons": ["Higher price point", "Heavier weight", "More complex maintenance"]
    },
    "Bullet 650": {
        "pros": ["Iconic design with modern engine", "Powerful 650cc motor", "Improved performance", "Classic aesthetics"],
        "cons": ["Higher cost than 350cc Bullet", "Heavier weight", "More maintenance required"]
    },
    "Goan Classic 350": {
        "pros": ["Unique styling", "Classic design with modern touches", "Good build quality", "Distinctive appearance"],
        "cons": ["Limited availability", "Specialized market", "May have lower resale value"]
    },
    "Bear 650": {
        "pros": ["Powerful 650cc engine", "Sturdy build", "Good for touring", "Premium components"],
        "cons": ["Higher price", "Heavy weight", "More complex maintenance"]
    },
    "Shotgun 650": {
        "pros": ["Unique styling", "Powerful engine", "Distinctive design", "Premium features"],
        "cons": ["Niche appeal", "Higher cost", "Specialized maintenance"]
    },
    "Scrambler 450": {
        "pros": ["Adventure styling", "Modern engine", "Good ground clearance", "Versatile design"],
        "cons": ["Less powerful than 650cc models", "Limited luggage space", "Specialized market"]
    },
    "Himalayan 750": {
        "pros": ["Most powerful Royal Enfield engine", "Excellent performance", "Advanced features", "Premium build"],
        "cons": ["Highest price point", "Most complex maintenance", "Heaviest model"]
    },
    "Flying Flea": {
        "pros": ["Unique compact design", "Lightweight", "Fuel efficient", "Distinctive styling"],
        "cons": ["Limited power", "Very specialized use", "Niche market appeal"]
    },
    "Interceptor 650": {
        "pros": ["Classic retro design", "Powerful 650cc engine", "Good performance", "Premium components"],
        "cons": ["Higher price", "More maintenance", "Heavier than 350cc models"]
    }
}

# Create input fields
st.sidebar.header("🔧 Bike Details")

# Get all unique models from the bike_info dictionary
all_models = list(bike_info.keys())

# Model selection
model_name = st.sidebar.selectbox("Model", all_models)

# Year selection (from 2000 to current year)
current_year = datetime.now().year
year = st.sidebar.number_input("Year of Manufacture", min_value=2000, max_value=current_year, value=2015)

# Present price
present_price = st.sidebar.number_input("Present Price (Lakhs)", min_value=0.1, max_value=10.0, value=1.5, step=0.1)

# Kms driven
kms_driven = st.sidebar.number_input("Kms Driven", min_value=0, max_value=100000, value=20000, step=1000)

# Owner type
owner = st.sidebar.selectbox("Owner Type", ["First", "Second", "Third"])

# Transmission type
transmission = st.sidebar.selectbox("Transmission", ["Manual"])

# Predict button
if st.sidebar.button("💰 Predict Price"):
    if not model_loaded:
        st.error("Model files not found. Please run the training script first.")
    else:
        # Calculate bike age
        bike_age = current_year - year
        
        # Check if all encoders are loaded
        if le_model is None or le_owner is None or le_transmission is None or model is None:
            st.error("Model files not loaded properly. Please run the training script first.")
        else:
            # Encode categorical variables
            model_encoded = le_model.transform([model_name])[0]
            owner_encoded = le_owner.transform([owner])[0]
            transmission_encoded = le_transmission.transform([transmission])[0]
            
            # Create feature array
            features = np.array([[model_encoded, bike_age, kms_driven, owner_encoded, transmission_encoded, present_price]])
            
            # Make prediction
            predicted_price = model.predict(features)[0]
            
            # Display results
            st.markdown("---")
            st.header("📊 Prediction Results")
            
            col1, col2 = st.columns(2)
            
            with col1:
                st.subheader("💰 Estimated Resale Price")
                st.markdown(f"## ₹ {predicted_price:.2f} Lakhs")
                
                # Show price comparison
                diff = present_price - predicted_price
                depreciation = (diff / present_price) * 100
                st.metric("Depreciation", f"{depreciation:.1f}%", f"-₹ {diff:.2f} Lakhs")
            
            with col2:
                st.subheader("📅 Bike Details")
                st.write(f"**Model:** {model_name}")
                st.write(f"**Age:** {bike_age} years")
                st.write(f"**Kms Driven:** {kms_driven:,} km")
                st.write(f"**Owner:** {owner}")
            
            # Show pros and cons
            st.markdown("---")
            st.header(f"⭐ {model_name} - Pros & Cons")
            
            col1, col2 = st.columns(2)
            
            with col1:
                st.subheader("✅ Pros")
                for pro in bike_info[model_name]["pros"]:
                    st.markdown(f"- {pro}")
            
            with col2:
                st.subheader("❌ Cons")
                for con in bike_info[model_name]["cons"]:
                    st.markdown(f"- {con}")
            
            # Show additional insights
            st.markdown("---")
            st.header("💡 Insights")
            
            # Age insight
            if bike_age <= 2:
                st.info("New bikes generally have higher resale value and lower depreciation.")
            elif bike_age <= 5:
                st.warning("Bikes with moderate age have moderate depreciation. Consider selling soon for better value.")
            else:
                st.error("Older bikes have significant depreciation. You might want to consider keeping it for personal use.")
            
            # Kms driven insight
            if kms_driven < 10000:
                st.info("Bikes with low kms driven have higher resale value.")
            elif kms_driven < 30000:
                st.warning("Bikes with moderate kms driven have average resale value.")
            else:
                st.error("Bikes with high kms driven have lower resale value.")

# Additional information
st.markdown("---")
st.markdown("### ℹ️ How to use this tool:")
st.markdown("""
1. Enter your bike details in the sidebar
2. Click on 'Predict Price' button
3. View the estimated resale price along with pros and cons of your bike model
4. Get insights on depreciation and value retention
""")

st.markdown("### 🏍️ About Royal Enfield:")
st.markdown("""
Royal Enfield is an Indian multinational motorcycle manufacturing company headquartered in Chennai, Tamil Nadu, India.
It is the world's oldest motorcycle brand in continuous production and is famous for its classic cruiser motorcycles.
""")