import { Theme } from '@material-ui/core';

interface Option {
  label: string;
  value: string;
}

export const options: Option[] = [
  {
    label: 'last 1 days',
    value: '1',
  },
  {
    label: 'last 7 days',
    value: '7',
  },
  {
    label: 'last 14 days',
    value: '14',
  },
  {
    label: 'last 30 days',
    value: '30',
  },
  {
    label: 'last 60 days',
    value: '60',
  },
];

interface Column {
  name: string;
  selector: string;
}

export const columns: Column[] = [
  {
    name: 'CPU Cost',
    selector: 'cpu',
  },
  {
    name: 'Memory Cost',
    selector: 'memory',
  },
  {
    name: 'Network Cost',
    selector: 'network',
  },
  {
    name: 'Storage Cost',
    selector: 'storage',
  },
  {
    name: 'GPU Cost',
    selector: 'gpu',
  },
  {
    name: 'Total Cost',
    selector: 'total',
  },
];

export function getTheme() {
  const localTheme = window.localStorage.getItem('theme');
  let theme: string = 'light';
  if (localTheme === 'dark') {
    theme = localTheme;
  }

  return theme;
}

export const getSelectTheme = (theme: Theme) => {
  return {
    /*
     * multiValue(remove)/color:hover
     */
    danger: 'purple',

    /*
     * multiValue(remove)/backgroundColor(focused)
     * multiValue(remove)/backgroundColor:hover
     */
    dangerLight: theme.palette.grey[200],

    /*
     * control/backgroundColor
     * menu/backgroundColor
     * option/color(selected)
     */
    neutral0: theme.palette.background.default,

    /*
     * control/backgroundColor(disabled)
     */
    neutral5: 'orange',

    /*
     * control/borderColor(disabled)
     * multiValue/backgroundColor
     * indicators(separator)/backgroundColor(disabled)
     */
    neutral10: 'pink',

    /*
     * control/borderColor
     * option/color(disabled)
     * indicators/color
     * indicators(separator)/backgroundColor
     * indicators(loading)/color
     */
    neutral20: theme.palette.grey['A200'],

    /*
     * control/borderColor(focused)
     * control/borderColor:hover
     */
    // this should be the white, that's normally selected
    neutral30: theme.palette.text.primary,

    /*
     * menu(notice)/color
     * singleValue/color(disabled)
     * indicators/color:hover
     */
    neutral40: 'green',

    /*
     * placeholder/color
     */
    // seen in placeholder text
    neutral50: theme.palette.grey['A200'],

    /*
     * indicators/color(focused)
     * indicators(loading)/color(focused)
     */
    neutral60: 'purple',
    neutral70: 'purple',

    /*
     * input/color
     * multiValue(label)/color
     * singleValue/color
     * indicators/color(focused)
     * indicators/color:hover(focused)
     */
    neutral80: theme.palette.text.primary,

    // no idea
    neutral90: 'pink',

    /*
     * control/boxShadow(focused)
     * control/borderColor(focused)
     * control/borderColor:hover(focused)
     * option/backgroundColor(selected)
     * option/backgroundColor:active(selected)
     */
    primary: theme.palette.text.primary,

    /*
     * option/backgroundColor(focused)
     */
    primary25: theme.palette.background.paper,

    /*
     * option/backgroundColor:active
     */
    primary50: theme.palette.background.paper,
    primary75: theme.palette.background.paper,
  };
};
