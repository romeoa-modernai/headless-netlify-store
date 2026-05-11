// ✅ NO server imports - this runs entirely in the browser
import React from "react";
import { Puck } from "@measured/puck";

// ✅ Simple client-side auth (NOT secure for production, but works for testing)
// For real auth, you'd use Shopify's App Bridge or a proper auth system

const config = {
  components: {
    ProductGrid: {
      fields: { title: { type: "text" } },
      render: ({ title }: { title: string }) => (
        <div className="product-grid">
          <h2>{title || "Products"}</h2>
        </div>
      )
    },
    Hero: {
      fields: { 
        heading: { type: "text" },
        subheading: { type: "text" }
      },
      render: ({ heading, subheading }: { heading: string; subheading: string }) => (
        <div className="hero">
          <h1>{heading || "Welcome"}</h1>
          <p>{subheading || "Shop our collection"}</p>
        </div>
      )
    }
  }
};

const initialData = {
  root: { props: {} },
  content: [],
  zones: {}
};

export default function Admin() {
  // Simple client-side auth (check URL param)
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const secret = params.get("secret");
    // ⚠️ This is NOT secure - just for testing!
    if (secret === "m0d3rn@i2026") {
      setIsAuthorized(true);
    }
  }, []);
  
  if (!isAuthorized) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h1>Access Denied</h1>
        <p>Add ?secret=m0d3rn@i2026 to the URL to access the editor</p>
      </div>
    );
  }
  
  return (
    <div style={{ height: "100vh" }}>
      <Puck
        config={config}
        data={initialData}
        onChange={(data) => {
          console.log("Page structure changed:", data);
        }}
      />
    </div>
  );
}