import Tabs from "../../components/Tabs";

// inActive assets
import auth from "/images/tabs/inActive/auth.svg";
import browse from "/images/tabs/inActive/browse.svg";
import palette from "/images/tabs/inActive/palette.svg";
import puzzle from "/images/tabs/inActive/puzzle.svg";
import language from "/images/tabs/inActive/language.svg";

// active assets
import activeAuth from "/images/tabs/active/auth.svg";
// import activeBrowse from "/images/tabs/active/browse.svg";
import activePuzzle from "/images/tabs/active/puzzle.svg";
// import activeLanguage from "/images/tabs/active/language.svg";
import activePalette from "/images/tabs/active/palette.svg";

const TabsContainer = () => {
  const tabsContent = [
    {
      label: "Auth",
      inActiveImg: auth,
      activeImg: activeAuth,
      content: <div>Content for Tab 1</div>,
    },
    {
      label: "Feature",
      inActiveImg: puzzle,
      activeImg: activePuzzle,
      content: <div>Content for Tab 2</div>,
    },
    {
      label: "Layout",
      inActiveImg: browse,
      activeImg: browse,
      content: <div>Content for Tab 3</div>,
    },
    {
      label: "Style",
      inActiveImg: palette,
      activeImg: activePalette,
      content: <div>Content for Tab 3</div>,
    },
    {
      label: "Social",
      inActiveImg: language,
      activeImg: language,
      content: <div>Content for Tab 3</div>,
    },
  ];

  return <Tabs tabs={tabsContent} />;
};

export default TabsContainer;
