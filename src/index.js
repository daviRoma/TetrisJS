import $ from 'jquery';
import Playground from './playground.js';
import BlockPreview from './preview_block.js';
import Modal from './modal';
import Button from './button';
import { Options, OptionItem } from './options';
import { setStyle, bgcolors } from './utils.js'

{
    var clock = null;
    var start = false;

    let tetris = function() {

        // Build page
        let context = document.getElementById("root");
        let playground = new Playground('playground');
        let blockPreview = new BlockPreview('block_preview');
        let newGameButton = new Button("newGame", "New Game", ["button", "button-new"], null);
        let pauseButton = new Button("pause", null, ["button", "button-pause", "btn-disable"], "pause");
        let playButton = new Button("play", null, ["button", "button-play", "btn-disable"], "play_arrow");
        let modal;
        let bgOptions = new Options('bgOptions', 'Background', null);
        let optionItem_1 = new OptionItem('radio', 'background', 'default', true, null);
        let optionItem_2 = new OptionItem('radio', 'background', 'darkblue', false, null);
        let optionItem_3 = new OptionItem('radio', 'background', 'darkgreen', false, null);
        let optionItem_4 = new OptionItem('radio', 'background', 'darkred', false, null);
        let optionItem_5 = new OptionItem('radio', 'background', 'violet', false, null);
        let optionItem_6 = new OptionItem('radio', 'background', 'black', false, null);
        bgOptions.attach($("#item-left-2"));
        bgOptions.setItems([optionItem_1, optionItem_2, optionItem_3, optionItem_4, optionItem_5, optionItem_6]);
        // optionItem_1.attach($("bgOptions"));
        // optionItem_2.attach($("bgOptions"));
        // optionItem_3.attach($("bgOptions"));

        // Set page style
        setStyle(context, {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        });

        let begin = () => {
            blockPreview.generateNextBlock();
            playground.placeBlockToDefaultPosition(blockPreview.getBlock());
            blockPreview.generateNextBlock();
        };

        let play = () => {
            if (playground.checkGroundLimit() && !playground.attachBlock(10)) {
                playground.scrollBlock(10);
            } else {
                playground.setFixedBlock();
                playground.checkRowWin();

                $('#score').text(playground.getScore());

                if (playground.placeBlockToDefaultPosition(blockPreview.getBlock())) {
                    blockPreview.generateNextBlock();
                } else {
                    // Loser case
                    clearInterval(clock);
                    clock = null;
                    start = false;
                    modal = new Modal('modal_1', 'Game Over', 'Score: ' + $("#score").text() );
                    modal.attach($("#root"));
                }

            }
        };

        let arrowevent = (keyCode) => {
            if (!start) return;

            switch (keyCode) {
                case 37: // LEFT
                    if (playground.checkWallLimit(0) && playground.checkBlockSideLimit(-1)) {
                        playground.scrollBlock(-1);
                    }
                    break;

                case 38:
                    playground.roundBlock();
                    break;

                case 39: // RIGHT
                    if (playground.checkWallLimit(9) && playground.checkBlockSideLimit(1)) {
                        playground.scrollBlock(1);
                    }
                    break;

                case 40: // DOWN
                    play();
                    break;

                default:
                    break;
            }
        }

        // Attach Playground and BlockPreview on the main page
        playground.attach($('#item-center'));
        blockPreview.attach($('#item-right'));
        newGameButton.attach($("#item-left-1"));
        playButton.attach($("#item-left-1"));

        // Register new game event
        newGameButton.handleEvent("click", () => {
            if (clock != null || !start) {
                playground.cleanGrid();
                clearInterval(clock);
            }
            
            // TO DO: Set default background
            
            // Begin
            begin();
            clock = setInterval(() => play(), 1000);
            start = true;
            
            if (playButton.active) {
                playButton.detach($("#item-left-1"));
            }

            pauseButton.unsetDisable("btn-disable");
            pauseButton.attach($("#item-left-1"));
        });

        pauseButton.handleEvent("click", () => {
            clearInterval(clock);
            start = false;

            if (pauseButton.active) {
                pauseButton.detach($("#item-left-1"));
            }
            
            playButton.unsetDisable("btn-disable");
            playButton.attach($("#item-left-1"));
        });

        playButton.handleEvent("click", () => {
            clock = setInterval(() => play(), 1000);
            start = true;
            playButton.detach($("#item-left-1"));
            pauseButton.attach($("#item-left-1"));
        });

        // Register options event
        $(':radio[name="background"]').change(function() {
            let value = $(this).filter(':checked').val();
            playground.setBackground(bgcolors[value]);
            $(':radio[name="background"]').blur();
            // TO DO: Set preview background
        });

        $(window).keydown((e) => arrowevent(e.keyCode));

    };

    $(tetris);
}