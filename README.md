# AMD Lumina Frames

A responsive, single-page business website for AMD Lumina Frames, a doors and windows business in Pursurah, West Bengal. Built with semantic HTML, custom CSS, Bootstrap 5, Bootstrap Icons, and vanilla JavaScript.

## Folder structure

```text
amd-lumina-frames/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       └── README.md
└── README.md
```

## Run the website

1. Open the project folder in VS Code.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html` and choose **Open with Live Server**.
4. The page also works by opening `index.html` directly in a modern browser. A network connection is needed for the Bootstrap, icon, font, and sample image CDNs.

## Update company details

Open `js/script.js` and edit the `businessDetails` object near the top of the file:

```js
const businessDetails = {
  businessPhone: "",
  whatsappNumber: "",
  email: "",
  registeredAddress: "AMD Lumina Frames\nAMD House, Jangalpara, Pursurah\nNear BDO Office\nWest Bengal – 712401",
  manufacturingAddress: "AMD House, Pursurah\nNear BDO Office, Ground Floor\nWest Bengal – 712401"
};
```

Enter only confirmed contact details. The visible phone and email placeholders remain non-clickable until valid values are configured. The Google Maps directions links are built from the address values; they do not use fabricated coordinates.

## Configure WhatsApp enquiries

Set `whatsappNumber` to the business's verified number in international format, using digits only, including the country code and omitting `+`, spaces, and punctuation. For example, replace the empty string with an owner-supplied number. The site validates the value before creating `wa.me` links. Product buttons and the contact form then open a pre-filled WhatsApp message.

The form runs in the visitor's browser. It does not send, store, or transmit an enquiry to a website backend.

## Replace sample images

The architectural sample images are illustrative, not photographs of completed company projects. Add business-owned or properly licensed, web-optimized photographs under `assets/images/`, then update image `src` URLs in `index.html` and the hero background URL in `css/style.css`. Keep the image alternative text accurate; use descriptive alt text for meaningful photos and empty alt text only for decorative imagery. Broken images display a fallback.

## Add a backend or email service later

The current form intentionally opens WhatsApp and does not claim to submit to a server. To collect enquiries through a backend, connect the form to a secured API or a reputable email/form provider, add server-side validation and abuse protections, and update the privacy notice to describe what is collected and how it is used. Never place private API keys in client-side JavaScript.

## SEO customisation

Update the page `<title>`, meta description, Open Graph title/description/image, headings, and image alt text in `index.html` to match the final services and service area. Keep local references accurate, and do not add unverifiable reviews, ratings, certifications, or business claims. Configure a canonical URL and social sharing image after the site has a production domain.

## External resources

Bootstrap 5, Bootstrap Icons, Google Fonts, and illustrative Unsplash images load from their respective CDNs. Use a connection to the internet to load these resources.
