import { useEffect } from "react";
import { useBlux } from "@bluxcc/react";

const OpenModal = () => {
  const { isReady, login, isAuthenticated, user, profile } = useBlux();
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (isReady && !isMobile) {
      setInterval(() => {
        try {
          login();
        } catch (e) {}
      }, 1000);
    }
  }, [isReady, user]);

  // const testXDR =
  //   "AAAAAgAAAACvHdEb2ysDUZgEF5ubGsYG6W90u9ATDlRwGQbnpAS4PgExLQAACrlQAAQYigAAAAAAAAAAAAAABAAAAAAAAAADAAAAAVVTRFoAAAAAp/Q3brtI8PfLSsRX14/5KPHcQhj9kjVc9WzbvwDP8BUAAAABWkFSWgAAAAApozLF7XY2V/DCWNrgdjhKvyE3wYRaSrGfFPuyKyUWZwAAAAJUC+QAAAQXRwBMS0AAAAAAAAA9xQAAAAAAAAADAAAAAVpBUloAAAAAKaMyxe12Nlfwwlja4HY4Sr8hN8GEWkqxnxT7sislFmcAAAABVVNEWgAAAACn9Dduu0jw98tKxFfXj/ko8dxCGP2SNVz1bNu/AM/wFQAAAAJUC+QABZTqlQBMS0AAAAAAAAA9xgAAAAAAAAADAAAAAVVTRFoAAAAAp/Q3brtI8PfLSsRX14/5KPHcQhj9kjVc9WzbvwDP8BUAAAABWkFSWgAAAAApozLF7XY2V/DCWNrgdjhKvyE3wYRaSrGfFPuyKyUWZwAAAAJUC+QAAABUdQAGGoAAAAAAAAA9xwAAAAAAAAADAAAAAVpBUloAAAAAKaMyxe12Nlfwwlja4HY4Sr8hN8GEWkqxnxT7sislFmcAAAABVVNEWgAAAACn9Dduu0jw98tKxFfXj/ko8dxCGP2SNVz1bNu/AM/wFQAAAAJUC+QAAj5sqQAehIAAAAAAAAA9yAAAAAAAAAABpAS4PgAAAEAlPQOSpg84eWurg3dbfP6z0rasrx973wf0CLKjmnLZbDN5bGVI38A7/x32uJhQEZ+9Sy3i/w9Whqohmzk1JAsH";

  useEffect(() => {
    if (isAuthenticated) {
      // signTransaction(testXDR);
      profile();
    }
  }, [isAuthenticated]);

  if (!isReady) return <div>Loading...</div>;

  return isMobile ? (
    <div
      className="absolute center bottom-0 h-16 w-full bg-primary text-white"
      onClick={login}
    >
      Launch Blux
    </div>
  ) : null;
};

export default OpenModal;
