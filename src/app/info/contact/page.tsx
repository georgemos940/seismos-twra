"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ContactPage from "@/components/shared/ContactPage";

export default function Page() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
      <ContactPage />
    </GoogleReCaptchaProvider>
  );
}
