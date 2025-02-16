import { useEffect } from "react";
import { useBlux } from "blux";

const OpenModal = () => {
  const { isReady, connect, isAuthenticated, user, signTransaction } =
    useBlux();

  useEffect(() => {
    connect();
  }, [user.wallet?.address]);
  const testXDR =
    "AAAAAgAAAACvHdEb2ysDUZgEF5ubGsYG6W90u9ATDlRwGQbnpAS4PgExLQAACrlQAAQYigAAAAAAAAAAAAAABAAAAAAAAAADAAAAAVVTRFoAAAAAp/Q3brtI8PfLSsRX14/5KPHcQhj9kjVc9WzbvwDP8BUAAAABWkFSWgAAAAApozLF7XY2V/DCWNrgdjhKvyE3wYRaSrGfFPuyKyUWZwAAAAJUC+QAAAQXRwBMS0AAAAAAAAA9xQAAAAAAAAADAAAAAVpBUloAAAAAKaMyxe12Nlfwwlja4HY4Sr8hN8GEWkqxnxT7sislFmcAAAABVVNEWgAAAACn9Dduu0jw98tKxFfXj/ko8dxCGP2SNVz1bNu/AM/wFQAAAAJUC+QABZTqlQBMS0AAAAAAAAA9xgAAAAAAAAADAAAAAVVTRFoAAAAAp/Q3brtI8PfLSsRX14/5KPHcQhj9kjVc9WzbvwDP8BUAAAABWkFSWgAAAAApozLF7XY2V/DCWNrgdjhKvyE3wYRaSrGfFPuyKyUWZwAAAAJUC+QAAABUdQAGGoAAAAAAAAA9xwAAAAAAAAADAAAAAVpBUloAAAAAKaMyxe12Nlfwwlja4HY4Sr8hN8GEWkqxnxT7sislFmcAAAABVVNEWgAAAACn9Dduu0jw98tKxFfXj/ko8dxCGP2SNVz1bNu/AM/wFQAAAAJUC+QAAj5sqQAehIAAAAAAAAA9yAAAAAAAAAABpAS4PgAAAEAlPQOSpg84eWurg3dbfP6z0rasrx973wf0CLKjmnLZbDN5bGVI38A7/x32uJhQEZ+9Sy3i/w9Whqohmzk1JAsH";

  useEffect(() => {
    if (isAuthenticated) {
      signTransaction(testXDR).then((result) => {
        console.log(result);
      });
    }
  }, [isAuthenticated]);

  if (!isReady) return <div>Loading...</div>;

  return null;
};

export default OpenModal;
