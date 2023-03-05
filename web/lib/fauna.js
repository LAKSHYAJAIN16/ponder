import fauna from "faunadb";

const getClient = () => {
    const client = new fauna.Client({
      secret: process.env.NEXT_PUBLIC_FAUNA_SECRET,
      domain: process.env.NEXT_PUBLIC_FAUNA_DOMAIN,
    });
    return client;
  };

export const client = getClient();