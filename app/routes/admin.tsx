import React from "react";
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";

const config = {
  categories: {
    custom: {
      title: "Custom",
      components: ["ProductGrid", "Hero"]
    }
  },
  components: {
    ProductGrid: {
      render: ({ title }: { title: string }) => (
        <div className="product-grid" style={{ padding: "20px" }}>
          <h2>{title || "Products"}</h2>
        </div>
      )
    },
    Hero: {
      render: ({ heading, subheading }: { heading: string; subheading: string }) => (
        <div className="hero" style={{ padding: "40px", textAlign: "center", background: "#f5f5f5" }}>
          <h1>{heading || "Welcome"}</h1>
          <p>{subheading || "Shop our collection"}</p>
        </div>
      )
    }
  }
};

const initialData = {
  content: [],
  root: {},
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