/**
 * Configuration file.
 * 
 */


// blue, red, green, orange, yellow, purple, pink, grey, brown
const COLORS = [
    '#0044cc',
    '#cc0000',
    '#009933',
    '#e65c00',
    '#e6e600',
    '#9933ff',
    '#ff4dff',
    '#808080',
    '#996633'
];

const BACKGROUND_COLORS = {
    default: 'white',
    darkblue: 'darkblue',
    darkgreen: '#004d00',
    darkred: '#800000',
    black: '#0d0d0d',
    violet: '#660066'
};

const MATERIAL_ICON = 'material-icons';

// Block
const POSITIONS = ['UP', 'RIGHT', 'BOTTOM', 'LEFT'];
const BLOCKS_TYPE = ['L', 'J', 'I', 'T', 'Q', 'Z', 'S'];
const BLOCK_SCHEMA = { center: 0, head: 0, body: 0, footer: 0 };

// Grid
const GRID_STYLE = { margin: '5px', border: '2px solid black', background: 'white' };
const DEFAULT_CENTER = 14;
const PLAYGROUND_SIZE = 200; // 20x10
const PREVIEW_SIZE = 25; // 5x5

// Game
const DEFAULT_INTERVAL = 1000;
const INTERVALS = [900, 700, 500, 300, 200];
const TRESHOLDS = [150, 300, 500, 700, 1000];

export {
    COLORS,
    BACKGROUND_COLORS,
    MATERIAL_ICON,
    POSITIONS,
    BLOCKS_TYPE,
    BLOCK_SCHEMA,
    GRID_STYLE,
    DEFAULT_CENTER,
    PLAYGROUND_SIZE,
    PREVIEW_SIZE,
    DEFAULT_INTERVAL,
    INTERVALS,
    TRESHOLDS
}