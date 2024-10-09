// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req: any, res: any) {

  if (req.method === "POST") {
    try {
      const { cpf, cnpj, username, email, price, quantity, isAllowed, order } = req.body;
      console.log(order);
      const paymentMethods = isAllowed ? ["credit_card", "pix", "bank_slip"] : ["credit_card", "pix"];
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ensure_workday_due_date: true,
          payer: { cpf_cnpj: cpf || cnpj, name: username },
          items: [
            { description: "Order ID: " + order?.data?.order_id, quantity, price_cents: Number(`${price * 100}`.split('.')[0]) },
          ],
          email: email,
          due_date: `${new Date().toDateString()}`,
          payable_with: paymentMethods
        }),
      };

      const data = await fetch(`https://api.iugu.com/v1/invoices?api_token=${process.env.IUGU_PIX_KEY}`, options)
        .then(response => response.json())

      res.status(200).json(data)

    } catch (error: any) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
