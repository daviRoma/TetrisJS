import $ from 'jquery';
import Playground from './controllers/playground';
import Preview from './controllers/preview';
import Modal from './layout/modal';
import Button from './layout/button';
import Options from './layout/options';
import OptionItem from './layout/optionItem';
import Score from './layout/score';
import { setStyle } from './resources/utils';
import { DEFAULT_INTERVAL, INTERVALS, TRESHOLDS, BACKGROUND_COLORS } from './resources/configuration';

{
    var clock = null;
    var interval = null;
    var start = false;

    // Tetris app
    let tetris = function() {

        // Build page
        let context = document.getElementById("root");
        setStyle(context, { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 });

        // Create page elements
        let playground = new Playground('playground');
        let blockPreview = new Preview('block_preview');
        let score = new Score('score');
        let newGameButton = new Button("newGame", "New Game", ["button", "button-new"], null);
        let pauseButton = new Button("pause", null, ["button", "button-pause", "btn-disable"], "pause");
        let playButton = new Button("play", null, ["button", "button-play", "btn-disable"], "play_arrow");
        let modal;
        let backgrounOptions = new Options('backgroundOptions', 'Grid Background', null);
        let optionItem_1 = new OptionItem('radio', 'background', 'default', true, null);
        let optionItem_2 = new OptionItem('radio', 'background', 'darkblue', false, null);
        let optionItem_3 = new OptionItem('radio', 'background', 'darkgreen', false, null);
        let optionItem_4 = new OptionItem('radio', 'background', 'darkred', false, null);
        let optionItem_5 = new OptionItem('radio', 'background', 'violet', false, null);
        let optionItem_6 = new OptionItem('radio', 'background', 'black', false, null);

        // Attach Playground and BlockPreview on the main page
        playground.attach($('#item-center'));
        blockPreview.attach($('#item-right-1'));
        newGameButton.attach($("#item-left-1"));
        playButton.attach($("#item-left-1"));
        backgrounOptions.attach($("#item-left-2"));
        score.attach($("#item-right-2"));

        // Set items for grid background
        backgrounOptions.setItems([
            optionItem_1, 
            optionItem_2, 
            optionItem_3, 
            optionItem_4, 
            optionItem_5, 
            optionItem_6
        ]);

        // begin function
        let begin = () => {
            blockPreview.generateNextBlock();
            playground.placeBlockToDefaultPosition(blockPreview.getBlock());
            blockPreview.generateNextBlock();
        };

        // play function
        let play = () => {
            if (playground.checkGroundLimit() && !playground.attachBlock(10)) {
                playground.scrollBlock(10);
            } else {
                playground.setFixedBlock();

                // Check match rows and set new score
                let update_interval = false;

                if (playground.checkRowWin()) {
                    let old_score = score.getScore();
                    let new_score = score.calculateNewScore(old_score, playground.getWinningRows());
                    score.setScore(new_score);

                    if (new_score >= TRESHOLDS[4] && old_score < TRESHOLDS[4]) {
                        interval = INTERVALS[4];
                        update_interval = true;
                    } else if (new_score >= TRESHOLDS[3] && old_score < TRESHOLDS[3]) {
                        interval = INTERVALS[3];
                        update_interval = true;
                    } else if (new_score >= TRESHOLDS[2] && old_score < TRESHOLDS[2]) {
                        interval = INTERVALS[2];
                        update_interval = true;
                    } else if (new_score >= TRESHOLDS[1] && old_score < TRESHOLDS[1]) {
                        interval = INTERVALS[1];
                        update_interval = true;
                    } else if (new_score >= TRESHOLDS[0] && old_score < TRESHOLDS[0]) {
                        interval = INTERVALS[0];
                        update_interval = true;
                    }

                }

                // Keep playing
                if (playground.placeBlockToDefaultPosition(blockPreview.getBlock())) {
                    blockPreview.generateNextBlock();

                    if (update_interval) {
                        clearInterval(clock);
                        clock = setInterval(() => play(), interval);
                    }

                } else {
                    // you lose
                    clearInterval(clock);
                    clock = null;
                    start = false;
                    modal = new Modal('modal_1', 'Game Over', 'Score: ' + score.getScore() );
                    modal.attach(context);
                }

            }
        };

        // Arrow event click function
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

                default: break;
            }
        }

        // Register new game event
        newGameButton.handleEvent("click", () => {
            if (clock != null || !start) {
                playground.cleanGrid();
                clearInterval(clock);
            }
            
            // Set variables
            interval = DEFAULT_INTERVAL;
            score.setScore(0);

            // Set background on new game
            let optionValue = $(':radio[name="background"]').filter(':checked').val();
            playground.setBackground(BACKGROUND_COLORS[optionValue]);
            
            // Begin
            begin();
            clock = setInterval(() => play(), interval);
            start = true;
            
            if (playButton.active) {
                playButton.detach($("#item-left-1"));
            }

            pauseButton.unsetDisable("btn-disable");
            pauseButton.attach($("#item-left-1"));
        });

        // handle event of pause button
        pauseButton.handleEvent("click", () => {
            clearInterval(clock);
            start = false;

            if (pauseButton.active) {
                pauseButton.detach($("#item-left-1"));
            }
            
            playButton.unsetDisable("btn-disable");
            playButton.attach($("#item-left-1"));
        });

        // handle event of play button
        playButton.handleEvent("click", () => {
            clock = setInterval(() => play(), interval);
            start = true;
            playButton.detach($("#item-left-1"));
            pauseButton.attach($("#item-left-1"));
        });

        // Register options event
        $(':radio[name="background"]').change(function() {
            let value = $(this).filter(':checked').val();
            // Set background
            playground.setBackground(BACKGROUND_COLORS[value]);
            blockPreview.setBackground(BACKGROUND_COLORS[value]);
            $(':radio[name="background"]').blur();
        });

        // Handle arrows click event
        $(window).keydown((e) => arrowevent(e.keyCode));

    };

    $(tetris);
}