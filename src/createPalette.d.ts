import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface NeutralPaletteColoOptions {
    main?: string;
  }
  interface NeutralColorPalette {
    main: string;
  }
  interface PaletteOptions {
    success?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    neutral?: NeutralPaletteColoOptions;
  }
  interface Palette {
    success: PaletteColor;
    warning: PaletteColor;
    neutral: NeutralColorPalette;
  }
}
