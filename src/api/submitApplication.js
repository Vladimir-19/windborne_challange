export async function submitApplication() {
  const response = await fetch(
    "https://windbornesystems.com/career_applications.json",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        career_application: {
          name: "Vladimir",
          email: "Salavei",
          role: "Junior Web Developer",
          notes:
            "I stay calm under pressure, and consistently drive teams toward high-quality, on-time delivery.",
          submission_url: "https://your-submission.com",
          portfolio_url: "https://your-portfolio.com",
          resume_url: "https://your-resume.com",
        },
      }),
    }
  );

  return response.json();
}
