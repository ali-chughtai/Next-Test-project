import emailjs from "@emailjs/browser";

export default async function sendEmails(formData: any) {
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const EMAILJS_USER_TEMPLATE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID!;
  const EMAILJS_ADMIN_TEMPLATE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID!;
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
  emailjs.init(EMAILJS_PUBLIC_KEY);
  try {
    const templateParams = {
      user_name: formData.name,
      father_name: formData.fatherName,
      city: formData.city,
      education: formData.education,
      last_degree: formData.lastDegreeName,
      university: formData.university,
      scholarship_country: formData.scholarshipCountry,
      level_for: formData.levelFor,
      contact_number: formData.contactNumber,
      user_email: formData.email,
      selected_package: formData.package,
      selected_timezone: formData.timezone,
      appointment_day: formData.appointment_day,
      submission_time: new Date().toLocaleString(),
    };

    const userEmailPromise = emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_USER_TEMPLATE_ID,
      {
        to_email: formData.email,
        to_name: formData.name,
        ...templateParams,
      }
    );

    const adminEmailPromise = emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_ADMIN_TEMPLATE_ID,
      {
        to_email: process.env.NEXT_PUBLIC_COMPANY_MAIL,
        ...templateParams,
      }
    );

    await Promise.all([userEmailPromise, adminEmailPromise]);

  } catch (error) {
    console.error("Error sending emails:", error);
    throw new Error("Failed to send confirmation emails");
  }
}
