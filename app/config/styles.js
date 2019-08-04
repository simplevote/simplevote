import { Platform } from 'react-native';
// Colors
const ghostWhite        = '#F5FCFF';
const lightSteelBlue    = '#A6C7DB';
const lightBlueAccent   = "#445f70";
const queenBlue         = '#457B9D';
const darkImperialBlue  = '#00496D';
const spaceCadet        = '#1D3557';
const desire            = '#E63946';

const DARK_BLUE         = '#234C73';
const VERY_LIGHT_GRAY   = '#ADACAD';
const VERY_LIGHT_GRAY2  = '#DBDB9DB';
const LIGHT_GRAY        = '#F6F4F6';
const DARKISH_GRAY      = '#979797';
const DARKER_GRAY       = '#737273';
const DARK_GRAY         = '#36382E';
const GRAYISH           = '#DADAD9';
const LIGHT_BLUE        = '#4FC5DC';

const RED               = '#E63946';

// Font Family
const FONT_FAMILY       = Platform.OS === 'ios' ? 'Avenir' : 'Roboto'

// Font Sizes
const SMALL_FONT        = 14;
const MED_FONT          = 20;
const LARGE_FONT        = 30;


export const Style = {
  colors: {
    ghostWhite,
    lightSteelBlue,
    lightBlueAccent,
    queenBlue: queenBlue,
    darkImperialBlue,
    spaceCadet,
    desire,
    RED,
    LIGHT_BLUE,
    DARK_BLUE,
    LIGHT_GRAY,
    DARKISH_GRAY,
    GRAYISH
  },
  fonts: {
   size: {
     SMALL: SMALL_FONT,
     SMALL_MEDIUM: 16,
     MEDIUM: MED_FONT,
     LARGE: LARGE_FONT
   },
   family: {
     FONT_FAMILY
   }
  },
  margins: {
    SMALL: 10,
    MEDIUM: 20,
    LARGE: 30
  },
  forms: {
    container: {
      height: 50,
      borderBottomColor: VERY_LIGHT_GRAY
    },
    inputContainer: {
      borderBottomColor: VERY_LIGHT_GRAY,
    },
    input: {
      fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
      fontWeight: 'bold',
      borderRadius: 0,
      borderWidth: 0,
      borderBottomWidth: 1.5,
      paddingLeft: 0,
    }
  },
  buttons: {
    bigRed: {
      backgroundColor: RED,
      borderRadius: 35,
      marginVertical: 40,
    },
    redText: {
      fontFamily: FONT_FAMILY,
      fontWeight: 'bold'
    },
    unsure: {
      backgroundColor: LIGHT_GRAY,
    }
  },
  presets: {
    padding: 15,
    border: '#CCC',
    background: 'white',
    navigation: 'white',
    heading: 'black',
    subHeading: '#333',
    underlay: '#f0f8ff',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
    fontSize: {
      large: 30,
      medium: 18
    },
    partialHeader: {
      fontSize: 18,
      fontWeight: "bold"
    }
  }
}

