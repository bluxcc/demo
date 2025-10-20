import Tabs from "../../components/Tabs";

// inActive assets
import auth from "/images/tabs/inActive/auth.svg";
import palette from "/images/tabs/inActive/palette.svg";
// import puzzle from "/images/tabs/inActive/puzzle.svg";

// active assets
import activeAuth from "/images/tabs/active/auth.svg";
// import activePuzzle from "/images/tabs/active/puzzle.svg";
import activePalette from "/images/tabs/active/palette.svg";

// pages
import Auth from "./Auth";
// import Features from "./Features";
import Style from "./Style";

const TabsContainer = () => {
  const tabsContent = [
    {
      label: "Auth",
      inActiveImg: auth,
      activeImg: activeAuth,
      content: <Auth />,
    },
    // {
    //   label: "Features",
    //   inActiveImg: puzzle,
    //   activeImg: activePuzzle,
    //   content: <Features />,
    // },

    {
      label: "Style",
      inActiveImg: palette,
      activeImg: activePalette,
      content: <Style />,
    },
  ];

  return <Tabs tabs={tabsContent} />;
};

export default TabsContainer;
