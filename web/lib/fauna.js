import fauna from "faunadb";

const getClient = () => {
    const client = new fauna.Client({
      secret: "fnAE5jdXvoACWt-9gZd7ctdH1GiTBT4fdNO5sHgw",
      domain: "db.us.fauna.com",
    });
    return client;
  };

export const client = getClient();