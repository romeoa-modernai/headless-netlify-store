import type { ActionFunctionArgs } from "@shopify/hydrogen";

export function handle() {
  return {
    env: {
      SHOPIFY_ADMIN_TOKEN: process.env.SHOPIFY_ADMIN_TOKEN,
    },
  };
}

export async function action({ context, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const actionType = formData.get("action");

  const { env } = context;
  const ADMIN_TOKEN = env.SHOPIFY_ADMIN_TOKEN;
  const STORE = env.PUBLIC_STORE_DOMAIN;
  
  if (actionType === "create_product") {
    const response = await fetch(`https://${STORE}/admin/api/2024-01/products.json`, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": ADMIN_TOKEN!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: {
          title: formData.get("title"),
          body_html: formData.get("description"),
          variants: [{ price: formData.get("price") }]
        }
      })
    });
    
    const data = await response.json();
    return Response.json(data);
  }
  
  return Response.json({ error: "Unknown action" }, { status: 400 });
}