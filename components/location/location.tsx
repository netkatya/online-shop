import { MapPin, Phone, Mail } from "lucide-react";

export default function Location() {
  return (
    <section className="bg-[var(--background)] w-full py-18" id="location">
      <div className="container w-[410px] md:w-[1440px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 text-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Location</h2>

          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-red-500" />
            <p>24 Bloomfield Road, London, UK</p>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-6 h-6 text-red-500" />
            <p>+44 20 7946 1287</p>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="w-6 h-6 text-red-500" />
            <p>info@cozycorner.co.uk</p>
          </div>

          <p className="text-gray-700 pt-4">
            Visit our cozy showroom or reach out to us for any questions — we’re
            happy to help you make your home feel even more welcoming.
          </p>
        </div>

        {/* Right side: Google map */}
        <div className="w-full h-[350px] rounded-lg overflow-hidden shadow-md">
          <iframe
            title="Cozy Corner Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19829.3727153457!2d-0.1324784!3d51.509865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3338dfb6b3%3A0x6aeb72b2e17e2c23!2sLondon%2C%20UK!5e0!3m2!1sen!2suk!4v1698752392314!5m2!1sen!2suk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
