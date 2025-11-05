import Tabs from '../../components/Tabs';

// pages
import Auth from './Auth';
import Style from './Style';
// import Features from "./Features";
import {
  ActiveAuth,
  ActivePalette,
  InActiveAuth,
  InActivePalette,
} from '../../assets/TabsIcon';
import { useConfigContext } from '../../hooks/useConfigContext';

const TabsContainer = () => {
  const { theme } = useConfigContext();

  const tabsContent = [
    {
      label: 'Auth',
      inActiveImg: (
        <InActiveAuth fill={theme === 'dark' ? 'white' : '#0C1083'} />
      ),
      activeImg: <ActiveAuth fill={theme === 'dark' ? 'white' : '#0C1083'} />,
      content: <Auth />,
    },
    // {
    //   label: "Features",
    //   inActiveImg: <InActivePuzzle/>,
    //   activeImg: <ActivePuzzle/>,
    //   content: <Features />,
    // },

    {
      label: 'Style',
      inActiveImg: (
        <InActivePalette fill={theme === 'dark' ? 'white' : '#0C1083'} />
      ),
      activeImg: (
        <ActivePalette fill={theme === 'dark' ? 'white' : '#0C1083'} />
      ),
      content: <Style />,
    },
  ];

  return <Tabs tabs={tabsContent} />;
};

export default TabsContainer;
