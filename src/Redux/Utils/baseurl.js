export const apiurl = "https://elancier.xyz/shipping_erp/admin/";

export const REQUEST_HEADERS = () => {
    return {
      HEADER: {
        Authorization: 'Bearer'+ JSON.parse(localStorage.getItem("Token")),
      },
    };
  };