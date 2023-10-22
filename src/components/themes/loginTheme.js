const lightGreen = '#86c232';
const green = '#61892f';
const gray = '#474b4f';
const darkgray = '#222629';

const loginTheme = {
    default: {
        colors: {
            brand: lightGreen,
            defaultButtonBackground: lightGreen,
            defaultButtonBackgroundHover: gray,
            defaultButtonBorder: 'white',
            dividerBackground: green,
            inputBackground: 'white',
            inputLabelText: 'white',
            messageText: 'white',
            messageTextDanger: 'red',
            anchorTextColor: lightGreen,
            anchorTextHoverColor: 'white',
        },
        space: {
            labelBottomMargin: '8px',
            anchorBottomMargin: '4px',
            emailInputSpacing: '4px',
            buttonPadding: '10px 15px',
            inputPadding: '10px 15px',
          },
          fontSizes: {
            baseBodySize: '14px',
            baseInputSize: '14px',
            baseLabelSize: '14px',
            baseButtonSize: '24px',
          },
          fonts: {
            bodyFontFamily: `ui-sans-serif, sans-serif`,
            buttonFontFamily: `ui-sans-serif, sans-serif`,
            inputFontFamily: `ui-sans-serif, sans-serif`,
            labelFontFamily: `ui-sans-serif, sans-serif`,
          },
          borderWidths: {
            buttonBorderWidth: '5px',
            inputBorderWidth: '1px',
          },
          radii: {
            borderRadiusButton: '10px',
            buttonBorderRadius: '10px',
            inputBorderRadius: '10px',
          },
    },
}   

export default loginTheme;