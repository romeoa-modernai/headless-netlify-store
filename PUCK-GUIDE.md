# 🛒 Hydrogen Storefront - Complete Guide

## Quick Access

- **Live Site:** https://cute-figolla-8bcbe2.netlify.app
- **Admin Editor:** https://cute-figolla-8bcbe2.netlify.app/admin?secret=m0d3rn@i2026

---

## 📋 Step-by-Step Guide

### 1. How to Access the Page Builder

1. Open your browser to:  
   `https://cute-figolla-8bcbe2.netlify.app/admin?secret=m0d3rn@i2026`
2. You'll see the Puck visual editor
3. The page auto-saves to your browser's localStorage

---

### 2. Creating a New Page

**Method 1 - Using the Editor:**
1. In Puck, click the **+** button in the left sidebar
2. Select a component (e.g., "Hero", "Product Grid", "Section")
3. Drag it onto the canvas
4. Click the component to edit its fields on the right

**Method 2 - Creating a New Route:**
- Pages are created automatically when you add routes in `app/routes/`
- Example: Create `app/routes/about.tsx` for `/about`

---

### 3. Understanding Components

#### 🎨 Layout Components
| Component | Description | Fields |
|-----------|-------------|--------|
| **Hero** | Large banner with background image | heading, subheading, backgroundImage, ctaText, ctaLink |
| **Section** | Content section with background | title, content, backgroundColor |
| **Columns** | Multi-column layout | count (2, 3, or 4) |

#### 🛒 Shopify Components
| Component | Description | Fields |
|-----------|-------------|--------|
| **ProductGrid** | Display products from Shopify | title, limit, collectionHandle |
| **ProductCard** | Single product display | productHandle |
| **CollectionGrid** | Show collections | title, collectionHandle |

#### 📝 Content Components
| Component | Description | Fields |
|-----------|-------------|--------|
| **Heading** | H1, H2, or H3 title | text, level, align |
| **Text** | Paragraph text | content, align |
| **Image** | Image with URL | src, alt, width |
| **Button** | Call-to-action button | text, link, variant |

---

### 4. How to Build a Page

**Example: Creating a Landing Page**

1. **Add a Hero Section**
   - Click **+** → Select "Hero" (under Layout)
   - Edit fields on the right:
     - Heading: "Welcome to Our Store"
     - Subheading: "Discover amazing products"
     - CTA Text: "Shop Now"
     - CTA Link: `/collections/all`

2. **Add a Product Grid**
   - Click **+** → Select "Product Grid" (under Shopify)
   - Edit fields:
     - Title: "Featured Products"
     - Limit: 8
     - Collection Handle: (leave empty for all products)

3. **Add a Call to Action**
   - Click **+** → Select "Button" (under Content)
   - Edit: Text = "Sign up for Newsletter", Link = "/pages/newsletter"

4. **Reorder Components**
   - Drag components up/down in the left sidebar to reorder

5. **Delete Components**
   - Hover over component in sidebar → click trash icon

---

### 5. Using Shopify Data

#### Display Products
Currently, the Product Grid shows sample data. To connect to real Shopify products:

1. **For now:** Edit component to show placeholder
2. **Coming soon:** Full Shopify integration with live product data

#### Metafields
To use Shopify Metafields:

1. Go to **Shopify Admin → Settings → Custom Data → Products**
2. Add a metafield definition (e.g., `custom.subtitle`)
3. In your Hydrogen code, query the metafield:

```graphql
query {
  product(handle: "your-product") {
    metafield(namespace: "custom", key: "subtitle") {
      value
    }
  }
}
```

---

### 6. Publishing Your Changes

**Current System:**
- Changes save to browser localStorage automatically
- To apply to production, the page component needs server-side rendering

**To Deploy:**
1. Changes pushed to GitHub auto-deploy to Netlify
2. Each push triggers a new deployment

---

### 7. Managing Products in Shopify

1. Go to: https://admin.shopify.com/store/headless-netlify/products
2. Add/Edit products there
3. Products automatically appear on your Hydrogen storefront

---

## 🔧 Advanced: Creating Custom Components

### Add a New Component

Edit `app/routes/admin.tsx`, add to `config.components`:

```tsx
MyComponent: {
  fields: {
    title: { type: "text" },
    count: { type: "number" },
  },
  render: ({ title, count }: any) => (
    <div style={{ padding: "20px" }}>
      <h2>{title}</h2>
      <p>Count: {count}</p>
    </div>
  ),
},
```

Then add to a category:

```tsx
categories: {
  custom: { title: "Custom", components: ["MyComponent", ...] },
},
```

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| 500 error on /account | Customer Account API not configured - this is expected |
| Editor not loading | Check the secret parameter is correct |
| Changes not saving | Refresh page - data saves to localStorage |
| Products not showing | Currently shows sample data - integration coming |

---

## 📞 Next Steps

To fully connect Shopify data:
1. Enable Customer Account API in Shopify Admin
2. Add more Shopify GraphQL queries
3. Connect metafields for custom data

---

**Secret Key:** `m0d3rn@i2026` (Keep this private!)