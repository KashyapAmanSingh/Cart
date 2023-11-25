
export const SUCCESSUrl = process.env.NODE_ENV === 'development'  ? `${process.env. DEVELOPMENT_URL}/StripeSuccess?session_id={CHECKOUT_SESSION_ID}`
  : `${process.env. PRODUCTION_URL}/StripeSuccess?session_id={CHECKOUT_SESSION_ID}`;
  

  export const  CANCELUrl =   process.env.NODE_ENV === 'development'  ? `${process.env. DEVELOPMENT_URL}/StripeFail`
  : `${process.env. PRODUCTION_URL}`;

  
export const WebhooksUrl = process.env.NODE_ENV === 'development'  ? process.env. DEVELOPMENT_URL
: process.env.PRODUCTION_URL;


 