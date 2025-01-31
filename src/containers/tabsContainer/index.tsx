import Tabs from "../../components/Tabs";

// inActive assets
import auth from "/images/tabs/inActive/auth.svg";
import layout from "/images/tabs/inActive/layout.svg";
import palette from "/images/tabs/inActive/palette.svg";
import puzzle from "/images/tabs/inActive/puzzle.svg";
import globe from "/images/tabs/inActive/globe.svg";

// active assets
import activeAuth from "/images/tabs/active/auth.svg";
import activeLayout from "/images/tabs/active/layout.svg";
import activePuzzle from "/images/tabs/active/puzzle.svg";
import activeGlobe from "/images/tabs/active/globe.svg";
import activePalette from "/images/tabs/active/palette.svg";

// pages
import Auth from "./Auth";
import Features from "./Features";
import Layout from "./Layout";
import Style from "./Style";
import Social from "./Social";

const TabsContainer = () => {
  const tabsContent = [
    {
      label: "Auth",
      inActiveImg: auth,
      activeImg: activeAuth,
      content: <Auth />,
    },
    {
      label: "Features",
      inActiveImg: puzzle,
      activeImg: activePuzzle,
      content: <Features />,
    },
    {
      label: "Layout",
      inActiveImg: layout,
      activeImg: activeLayout,
      content: <Layout />,
    },
    {
      label: "Style",
      inActiveImg: palette,
      activeImg: activePalette,
      content: <Style />,
    },
    {
      label: "Social",
      inActiveImg: globe,
      activeImg: activeGlobe,
      content: <Social />,
    },
  ];

  return <Tabs tabs={tabsContent} />;
};

export default TabsContainer;
