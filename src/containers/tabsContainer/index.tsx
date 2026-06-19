import Tabs from '../../components/Tabs';

// pages
import Auth from './Auth';
import Style from './Style';
import Other from './Other';
// import Features from "./Features";
import {
  ActiveAuth,
  ActivePalette,
  ActivePuzzle,
  InActiveAuth,
  InActivePalette,
  InActivePuzzle,
} from '../../assets/TabsIcon';
import { useConfigContext } from '../../hooks/useConfigContext';

const TabsContainer = () => {
  const { theme, resetKey } = useConfigContext();

  const tabsContent = [
    {
      label: 'Auth',
      inActiveImg: (
        <InActiveAuth fill={theme === 'dark' ? 'white' : '#0C1083'} />
      ),
      activeImg: <ActiveAuth fill={theme === 'dark' ? 'white' : '#0C1083'} />,
      content: <Auth key={resetKey} />,
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
    {
      label: 'Other',
      inActiveImg: (
        <InActivePuzzle fill={theme === 'dark' ? 'white' : '#0C1083'} />
      ),
      activeImg: (
        <ActivePuzzle fill={theme === 'dark' ? 'white' : '#0C1083'} />
      ),
      content: <Other />,
    },
  ];

  return <Tabs tabs={tabsContent} />;
};

export default TabsContainer;
