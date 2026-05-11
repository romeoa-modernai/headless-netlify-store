import React from "react";
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";

const ProductCard = ({ title, price, image, handle }: { title?: string; price?: string; image?: string; handle?: string }) => (
  <div style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "8px" }}>
    {image && <img src={image} alt={title} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} />}
    <h4 style={{ margin: "8px 0 4px" }}>{title || "Product"}</h4>
    <p style={{ color: "#666", margin: 0 }}>{price || "$0.00"}</p>
    {handle && <a href={`/products/${handle}`} style={{ fontSize: "12px", color: "#0070f3" }}>View Product →</a>}
  </div>
);

const config = {
  categories: {
    layout: { title: "Layout", components: ["Hero", "Section", "Columns"] },
    shopify: { title: "Shopify", components: ["ProductGrid", "ProductCard", "CollectionGrid"] },
    content: { title: "Content", components: ["Heading", "Text", "Image", "Button"] },
  },
  components: {
    Hero: {
      fields: {
        heading: { type: "text" },
        subheading: { type: "text" },
        backgroundImage: { type: "text" },
        ctaText: { type: "text" },
        ctaLink: { type: "text" },
      },
      render: ({ heading, subheading, backgroundImage, ctaText, ctaLink }: any) => (
        <div style={{
          padding: "80px 20px",
          textAlign: "center",
          background: backgroundImage ? `url(${backgroundImage}) center/cover` : "#f5f5f5",
          color: backgroundImage ? "#fff" : "#000",
        }}>
          <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>{heading || "Welcome"}</h1>
          <p style={{ fontSize: "20px", marginBottom: "24px" }}>{subheading || "Shop our collection"}</p>
          {ctaText && <a href={ctaLink || "/"} style={{
            background: "#0070f3",
            color: "#fff",
            padding: "12px 32px",
            borderRadius: "4px",
            textDecoration: "none",
            display: "inline-block",
          }}>{ctaText}</a>}
        </div>
      ),
    },
    Section: {
      fields: {
        title: { type: "text" },
        content: { type: "textarea" },
        backgroundColor: { type: "text" },
      },
      render: ({ title, content, backgroundColor }: any) => (
        <div style={{ padding: "60px 20px", background: backgroundColor || "#fff", textAlign: "center" }}>
          {title && <h2 style={{ marginBottom: "16px" }}>{title}</h2>}
          {content && <p style={{ maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>{content}</p>}
        </div>
      ),
    },
    Columns: {
      fields: {
        count: { type: "radio", options: [{ label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }] },
      },
      render: ({ count = "3" }: any) => (
        <div style={{ display: "flex", gap: "20px", padding: "40px 20px" }}>
          {[...Array(parseInt(count))].map((_, i) => (
            <div key={i} style={{ flex: 1, padding: "20px", border: "1px dashed #ccc", textAlign: "center", minHeight: "100px" }}>
              Column {i + 1} - Drop content here
            </div>
          ))}
        </div>
      ),
    },
    ProductGrid: {
      fields: {
        title: { type: "text" },
        limit: { type: "number" },
        collectionHandle: { type: "text" },
      },
      render: ({ title, limit = 4 }: any) => (
        <div style={{ padding: "40px 20px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>{title || "Featured Products"}</h2>
          <p style={{ textAlign: "center", color: "#666" }}>← Edit in Puck to configure Shopify products</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", marginTop: "20px" }}>
            {[...Array(limit)].map((_, i) => (
              <div key={i} style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ background: "#f5f5f5", height: "150px", borderRadius: "4px", marginBottom: "8px" }} />
                <p>Sample Product {i + 1}</p>
                <p style={{ color: "#666" }}>$19.99</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    ProductCard: {
      fields: {
        productHandle: { type: "text" },
      },
      render: ({ productHandle }: any) => (
        <ProductCard title="Sample Product" price="$29.99" handle={productHandle} />
      ),
    },
    CollectionGrid: {
      fields: {
        title: { type: "text" },
        collectionHandle: { type: "text" },
      },
      render: ({ title, collectionHandle }: any) => (
        <div style={{ padding: "40px 20px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>{title || "Collections"}</h2>
          <p style={{ textAlign: "center", color: "#666" }}>Configure collection handle: {collectionHandle || "frontpage"}</p>
        </div>
      ),
    },
    Heading: {
      fields: {
        text: { type: "text" },
        level: { type: "radio", options: [{ label: "H1", value: "h1" }, { label: "H2", value: "h2" }, { label: "H3", value: "h3" }] },
        align: { type: "radio", options: [{ label: "Left", value: "left" }, { label: "Center", value: "center" }, { label: "Right", value: "right" }] },
      },
      render: ({ text, level = "h2", align = "left" }: any) => {
        const Tag = level as any;
        return <Tag style={{ textAlign: align, margin: "20px 0" }}>{text || "Heading"}</Tag>;
      },
    },
    Text: {
      fields: {
        content: { type: "textarea" },
        align: { type: "radio", options: [{ label: "Left", value: "left" }, { label: "Center", value: "center" }, { label: "Right", value: "right" }] },
      },
      render: ({ content, align = "left" }: any) => (
        <p style={{ textAlign: align, lineHeight: 1.6, margin: "20px 0" }}>{content || "Add your text here..."}</p>
      ),
    },
    Image: {
      fields: {
        src: { type: "text" },
        alt: { type: "text" },
        width: { type: "text" },
      },
      render: ({ src, alt, width = "100%" }: any) => (
        <div style={{ padding: "20px", textAlign: "center" }}>
          {src ? <img src={src} alt={alt || ""} style={{ maxWidth: "100%", width }} /> : <div style={{ background: "#f5f5f5", padding: "60px" }}>Click to add image URL →</div>}
        </div>
      ),
    },
    Button: {
      fields: {
        text: { type: "text" },
        link: { type: "text" },
        variant: { type: "radio", options: [{ label: "Primary", value: "primary" }, { label: "Secondary", value: "secondary" }] },
      },
      render: ({ text, link, variant = "primary" }: any) => (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <a href={link || "#"} style={{
            background: variant === "primary" ? "#0070f3" : "#fff",
            color: variant === "primary" ? "#fff" : "#0070f3",
            padding: "12px 32px",
            borderRadius: "4px",
            textDecoration: "none",
            display: "inline-block",
            border: variant === "secondary" ? "2px solid #0070f3" : "none",
          }}>{text || "Button"}</a>
        </div>
      ),
    },
  },
};

const initialData = {
  content: [
    {
      ...config.components.Hero.render({ heading: "Welcome to Our Store", subheading: "Browse our latest collection", ctaText: "Shop Now", ctaLink: "/collections/all" }),
      props: { heading: "Welcome to Our Store", subheading: "Browse our latest collection", ctaText: "Shop Now", ctaLink: "/collections/all" },
    },
  ],
  root: { props: { title: "Home" } },
  zones: {},
};

export default function Admin() {
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const secret = params.get("secret");
    if (secret === "m0d3rn@i2026") {
      setIsAuthorized(true);
      const saved = localStorage.getItem("puck-page-data");
      if (saved) {
        try {
          setData(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load saved data", e);
        }
      }
    }
  }, []);

  const handleChange = (newData: any) => {
    setData(newData);
    localStorage.setItem("puck-page-data", JSON.stringify(newData));
    console.log("Page saved:", newData);
  };

  if (!isAuthorized) {
    return (
      <div style={{ padding: "50px", textAlign: "center", fontFamily: "system-ui" }}>
        <h1>🔒 Access Denied</h1>
        <p>Add <code>?secret=m0d3rn@i2026</code> to the URL to access the editor</p>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh" }}>
      <Puck
        config={config}
        data={data}
        onChange={handleChange}
      />
    </div>
  );
}