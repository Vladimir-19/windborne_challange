import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Hard-coded application data
    const payload = {
      career_application: {
        name: "Vladimir Salavei",
        email: "vladimir.salovei@gmail.com",
        role: "Junior Web Developer",
        notes:
          "I stay calm under pressure, and consistently drive teams toward high-quality, on-time delivery.",
        submission_url: "https://windborne-challange.vercel.app/",
        portfolio_url: "https://github.com/Vladimir-19",
        resume_url:
          "https://github.com/Vladimir-19/resume/blob/main/Vladimir%20Salovei%20resume%202025.pdf",
      },
    };

    // Send POST request to WindBorne API
    const response = await axios.post(
      "https://windbornesystems.com/career_applications.json",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    // Return the API response to the frontend
    res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    console.error("Submit application error:", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to submit application",
      details: err.message,
    });
  }
}
