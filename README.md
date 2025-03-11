# 🚀 RuralCare AI-Powered Healthcare Chatbot

## 📌 Project Overview
RuralCare is an **AI-powered healthcare chatbot** designed to assist people, especially in rural areas, by **analyzing symptoms**, **recommending medical specialists**, and **providing guidance** on whether a user needs emergency care. It also integrates **Google Maps** to show nearby hospitals and healthcare facilities.

## 🚀 Features
- 🤖 **AI Medical Chatbot** – Analyzes symptoms and provides healthcare recommendations.
- 🏥 **Find Nearby Hospitals** – Retrieves and displays nearby hospitals based on user location.
- 📊 **Medical History Awareness** – Considers previous medical conditions for recommendations.
- 🚨 **Emergency Detection** – Alerts users if symptoms indicate a medical emergency.
- 🔎 **Specialist Recommendation** – Matches symptoms with appropriate medical departments.

## 📌 Why Use This Project?
✅ **Helps rural users find the right healthcare services faster.**<br/>
✅ **AI-driven symptom analysis to suggest possible health concerns.**<br/>
✅ **Emergency alert system for life-threatening conditions.**<br/>
✅ **Real-time hospital and clinic lookup based on user location.**<br/>
✅ **Privacy-focused with secure authentication.**<br/>

## Technologies Used 🛠
| Component       | Technology Used        |
|----------------|-----------------------|
| **Frontend**   | React.js, Bootstrap   |
| **Backend**    | Node.js, Express.js   |
| **Database**   | Firebase Firestore    |
| **APIs**       | OpenAI API (GPT-4), Google Maps API, Twilio SMS API |

## 🔧 Installation & Setup 🚀
1. **Clone the Repository**
    ```sh
    git clone https://github.com/Mr-BiG1/hack2.0.git
    cd hack2.0
    ```
2. **Install Dependencies**
    ```sh
    npm install
    ```
3. **Set Up Environment Variables** (Create a `.env` file and add these values)
    ```env
    OPENAI_API_KEY=your_openai_api_key
    FIREBASE_CONFIG=your_firebase_config
    GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    ```
4. **Run the Project**
    ```sh
    npm start
    ```

## 🎮 How to Use?
1. **User logs in or registers** to create an account.
2. **Enter symptoms** into the chatbot interface.
3. **Chatbot analyzes symptoms** and provides recommendations.
4. **If necessary, an emergency alert is triggered.**
5. **User can view nearby hospitals and specialists.**
6. **Chat history is saved for future reference.**

## 🌟 Example Inputs & Use Cases
### **🩺 Test Cases**
#### **Case 1: Chest Pain (Emergency Alert)**
💬 **User:** "I'm experiencing severe chest pain and shortness of breath."

✅ **Expected Output:**
```
🚨 Emergency Alert: Your symptoms may indicate a serious condition.
**Call 911 immediately or visit the nearest ER!**
```

#### **Case 2: Skin Rash (Specialist Recommendation)**
💬 **User:** "I have a skin rash that has been spreading for a few days."

✅ **Expected Output:**
```
🔎 Based on your symptoms, I recommend visiting a **Dermatologist**.

🩺 Searching for nearby hospitals...
📍 **Nearby Hospitals:**
1. **ABC Skin Clinic** - 📍 123 Main St
2. **XYZ Medical Center** - 📍 456 Elm St
```
✅ **Map should display the first recommended hospital.**

#### **Case 3: Dizziness and Weakness (Neurological Concern)**
💬 **User:** "I feel dizzy and lightheaded most of the day."

✅ **Expected Output:**
```
🔎 Based on your symptoms, I recommend visiting a **Neurologist**.

🩺 Searching for nearby hospitals...
📍 **Nearby Hospitals:**
1. **Brain & Spine Institute** - 📍 789 Neurology Rd
2. **Downtown Medical Hospital** - 📍 321 City Ave
```
✅ **Map should display the first recommended hospital.**

#### **Case 4: General Fatigue & Headaches (AI-Generated Response)**
💬 **User:** "I've been feeling extremely tired and having frequent headaches."

✅ **Expected Output (AI Response from GPT-4):**
```
Based on your symptoms and medical history, fatigue and frequent headaches can be linked to multiple conditions such as **anemia, dehydration, or chronic stress**.

It is recommended to visit a **General Practitioner (GP)** for further evaluation.
```

## Contributing 🤝
We welcome contributors! 🚀

### Steps to Contribute
1. **Fork the repository** 🍴
2. **Create a feature branch:**
   ```sh
   git checkout -b feature-new-feature
   ```
3. **Commit your changes**
   ```sh
   git commit -m "Added new feature"
   ```
4. **Push your branch:**
   ```sh
   git push origin feature-new-feature
   ```
5. **Submit a Pull Request (PR)** 📢

### Issues & Bugs
- If you find any issues, please create a new issue in the GitHub repo.
- For security vulnerabilities, contact us directly.

## License 📝
This project is licensed under [LICENSE]. See the LICENSE file for details.

## 📞 Contact & Support
- **Darsan Sabu George**  
  Email: darsansabu09@gmail.com  
  GitHub: [your-github](https://github.com/Mr-BiG1)  
  LinkedIn: [your-linkedin](www.linkedin.com/in/darsan-sabu-george)  

## ⭐ Support Us!
If you find this project useful, please star this repo ⭐ and share it with others! Together, we can make a difference! 🚀💙

