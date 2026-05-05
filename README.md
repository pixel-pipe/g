# Plumber Rush

`mario.html` is a self-contained side-scrolling platform game with original platformer mechanics and art.

The current visual mode is an original early-console 8-bit look: flat colors, blocky tile art, pixelated characters, pixelated enemies, simple pipes, and no generated bitmap sprites. It does not copy or download official game assets.

User-provided local images in `assets/` override the procedural drawings for key characters and collectibles:

- `assets/mario-trimmed.png` is used for the player.
- `assets/mario-jump-trimmed.png` is used for the player while jumping.
- `assets/yosshi-trimmed.png` is used for the helper companion.
- `assets/coin-trimmed.png` is used for coins.
- `assets/kuppa-trimmed.png` is used for the stage `1-3` boss.
- `assets/dossunn-trimmed.png` is used for repeated stage `1-3` castle background decorations.

The trimmed PNG files are generated from the supplied JPG/PNG sources with the flat background color removed and the sprite cropped to the visible character/object.

The game now has four data-defined stages. Each stage is built from the same standardized gimmick lists: ground segments, blocks, pipes, piranha plants, coins, enemies, hazards, springs, moving platforms, seesaw platforms, and a goal flag.

Development entry points:

- `mario.html` runs the full game from stage `1-1` through `1-4`.
- `orchestrator.html` opens a small stage launcher that can switch between the full run and individual stages.
- `stage-1.html` starts only stage `1-1`.
- `stage-2.html` starts only stage `1-2`.
- `stage-3.html` starts only stage `1-3`.
- `stage-4.html` starts only stage `1-4`.
- `mario.html?stage=2&single=1` is the direct single-stage URL format used by the stage files.

Stage visual themes:

- `1-1`: overworld background, standard enemies, red power-up items, green pipes, and warm ground tiles.
- `1-2`: underground background, cave blocks, blue-green pipes, crystal-like coins/items, and underground enemies.
- `1-3`: castle background, stone/brick structures, lava/fire hazards, armored castle enemies, and fire-colored items.
- `1-4`: sky background, floating clouds, distant mountain marks, sparse start/end ground, standable mushroom relay perches, rideable airplanes, and paired seesaw platforms used as the main route.

Controls:

- Move: `A` / `D` or arrow keys
- Jump: `W`, `ArrowUp`, or `Space`
- Enter secret pipe: `S` or `ArrowDown` while standing on the pipe
- Double jump: press jump again in the air
- Firebolt while Super Mario: PlayStation Circle (`〇`), `X` key, or `F` key
- Main menu selection: `W` / `ArrowUp` and `S` / `ArrowDown`
- Confirm main menu: `Enter`, `Space`, click, or PlayStation Cross/Circle
- Return to main menu / restart flow: `R`
- After TRY AGAIN: press any key, click, or press a PlayStation controller button to restart the current stage from its beginning
- After GAME OVER / final clear: press any key, click, or press a PlayStation controller button to return to the main menu
- TRY AGAIN and GAME OVER show a floating game-over character sprite so the failure state is visually distinct from normal overlays.

Stage gimmicks:

- Question blocks release varied randomized power-up items: mostly 1UP, with rare grow, shrink, flight, and helper companion items.
- Highlighted rare question blocks are placed in harder-to-reach positions and always contain a rare item.
- Some ordinary floating brown bricks hide rare items. These secret bricks are chosen randomly each time the stage is built, so the hiding spots change between plays.
- Stage 1-2 and 1-3 place the Super Mario hidden block at the far-left start edge, one tile higher than a normal jump can reach, so it requires a deliberate double jump from the left wall.
- Ordinary brown bricks crack on the first hit from below and break if hit from below again before the crack timer expires. Long brick rows include darker reinforced brown bricks that do not break from jump hits.
- Grow items make the player larger until damage, death, or restart.
- Shrink items make the player 1/2 size or 1/4 size, including the collision box, until damage, death, another size item, or restart.
- Flight items allow extra jumps and upward flight while jump is held for a limited time.
- Helper companion items summon a rideable dinosaur-like companion that boosts movement and absorbs one hit.
- Spikes and lava restart the current stage if touched.
- Piranha plants periodically rise out of selected pipes while closed, open only after fully emerging, then close again before retracting. Touching an exposed plant causes damage, while fireballs can clear it.
- Stage 1-3 uses fire-spitting piranha plants. They face the player while exposed and launch one fireball during each emergence cycle.
- Springs launch the player higher than a normal double jump.
- Moving platforms carry the player across wider gaps.
- Stage 1-4 uses paired seesaw platforms: standing on one side makes that side sink while the other side rises, creating a timing-based aerial route. Mushroom perches between seesaws act as safe relay points, and the seesaws sink and return slowly enough for deliberate jumps.
- Stage 1-4 also has rideable Zero-inspired side-view airplanes flying high above the route from left to right at short regular intervals. Jump onto an airplane to stand on it and ride it across the aerial gaps; after Mario rides one for a short time, it disappears and quickly re-enters from the left. Their propeller, low engine rumble, and wind sound is generated in Web Audio, fades down with distance, stays below the BGM even while riding, and is not pulled from an external video.
- Stage 1-3 has a castle boss near the goal. The boss blocks the goal while alive, spits fireballs from its mouth, and takes damage when stomped from above or diagonally above. Its remaining HP is shown numerically above it.
- During the stage 1-3 boss fight, the player also has a separate `MARIO HP 4/4` boss-fight life counter. Boss contact and boss fireballs reduce this counter; when it reaches zero, the normal TRY AGAIN restart flow begins.
- Stage 1-3 shows a random boss-fight hint when the player approaches the boss. The hint is re-rolled on each stage build or retry.
- Stage 1-3 also has a high hidden route near the top of the stage. Entering the upper secret pipe plays a pipe-entry sequence, moves through a short hidden-route transition, and drops the player from an upper exit pipe near the final boss approach.
- Stage 1-1 has a hidden sky route near the final flag approach. Hint coins sit directly above the hidden block positions; jumping under those coins reveals spaced hidden stepping blocks, then a visible stone walkway continues from the highest block to an up-facing secret pipe that sends the player directly to the Stage 1-4 sky stage.
- Reaching the goal advances to the next stage; clearing stage 1-4 ends the game.
- Clearing the final stage transitions to a result screen showing coin points earned, elapsed clear time, and total deaths/retries for the run.

PlayStation 5 controller over USB:

- Main menu: left stick or D-pad up/down to move the cursor, Cross/Circle to confirm
- Menu detail pages: left stick or D-pad up/down to focus links, Cross/Circle to open, Options/R1/R2 to return to the main menu
- Move: left stick or D-pad
- Jump: Cross button
- Double jump: press Cross again in the air
- Firebolt while Super Mario: Circle button
- Enter secret pipe: press down on the left stick or D-pad while standing on the pipe
- Restart: Options, R1, or R2 button
- Restart flow after TRY AGAIN: any controller button restarts the current stage from its beginning
- Restart flow after GAME OVER / All Clear: any controller button returns to the main menu

Most browsers require one controller button press after the page opens before the controller appears to the Gamepad API.

Main menu:

- The game opens on a retro main-menu screen modeled after the supplied reference.
- Starting a new run, restarting from GAME OVER, pressing restart during play, and starting again after final clear all route through this menu screen first. TRY AGAIN restarts the current stage directly.
- The menu has five selectable entries: Start Game, Explanation, Settings, Source Code, and Quit.
- The cursor can be moved up and down. Start Game launches the game; the other entries open `explanation.html`, `settings.html`, `source-code.html`, and `quit.html`.
- The menu detail pages load `menu-controller.js`, so the same PlayStation controller can navigate their links and return to the main menu.

Audio:

- Sound effects are generated in the browser and play on jumps, blocks, coins, items, enemy stomps, springs, damage, and stage clears.
- An original 8-bit opening fanfare plays when a new game starts.
- Background music is continuous. The game uses the licensed MP3 files copied into `assets/bgm/`, then falls back to a procedural music loop if a file is unavailable.
- The first key, click, or PlayStation controller button starts the game and starts the stage BGM immediately. This keeps the browser's audio policy satisfied.
- Stage BGM is forcibly stopped and unloaded when Mario reaches a flag, during TRY AGAIN, GAME OVER, STAGE CLEAR, and ALL CLEAR cues so music tracks do not overlap.
- Flag clear music is stage-specific: non-final stages use `world-clear.mp3`; the final stage uses `course-clear.mp3`.
- Final game clear first plays the `1-4` course-clear cue at the flag, then moves to the result screen and plays `ending.mp3`.
- TRY AGAIN and GAME OVER wait for `PRESS ANY BUTTON`; TRY AGAIN restarts the current stage directly, while GAME OVER returns to the main menu.
- Stage mapping: `1-1` uses `stage-1-overworld.mp3`, `1-2` uses `stage-2-underground.mp3`, `1-3` uses `stage-3-castle.mp3`, and `1-4` reuses `stage-1-overworld.mp3`.
- Audio cues use `world-clear.mp3`, `course-clear.mp3`, `ending.mp3`, and `player-down-game-over.mp3`.
- `?bgm=<audio-url>` can still override the stage BGM for quick testing.
- Browser audio starts after the first key, click, or controller button input.

## Playing on PS5 via GitHub Pages

This project ships as plain HTML, CSS, JavaScript, and static assets. It can be hosted on GitHub Pages and opened from the PS5 hidden browser.

### Deployment

1. Initialize a git repository in this folder and push it to a new public GitHub repository. A short repository name is recommended because the PS5 browser does not have a real address bar and shorter URLs are easier to enter.
2. In the repository settings, open `Pages`, choose `Deploy from a branch`, select `main`, set the folder to `/ (root)`, and save.
3. Wait for the GitHub Pages URL (`https://<username>.github.io/<repo>/`) to be issued, then open it on a PC and confirm that the landing page, the full run, and each stage all run.

The repository ships with `.nojekyll` so GitHub Pages serves files exactly as they are, without Jekyll processing.

### Opening the hidden browser on PS5

The PS5 does not ship with a standalone browser. To reach a usable browser:

1. `Settings` -> `Users and Accounts` -> `Link with Other Services` -> `YouTube` -> `Link`.
2. When the YouTube terms screen opens, follow the link out to the Google terms page.
3. From the Google terms page, open the Google front page or search.
4. Search for the GitHub Pages URL or the site title `Plumber Rush PS5 8-Bit Sky Seesaw 2026` and open the result.

If your PS5 already has YouTube linked, unlink it first to surface the terms screen again.

### What to expect on the PS5 browser

- The hidden browser is not officially supported and behavior is not guaranteed.
- The DualSense controller may need a single button press once before the Gamepad API recognizes it.
- If iframes or Web Audio fail, open `mario.html` directly. The whole game runs from `mario.html` alone, without `orchestrator.html` or `stage-N.html`.
- The game does not rely on `localStorage`, so a refresh simply restarts the current run.

### Landing page

`index.html` is a PS5-friendly entry page with a large `PLAY` button, per-stage links, a `STAGE LAUNCHER` shortcut, and a controls cheat sheet. Its `<title>` is set to a unique string so the page can be located via Google search from the PS5 browser. PC users can also use it as the regular entry point. The landing page reuses `menu-controller.js`, so the PS5 controller can drive selection without a keyboard.

## GPT Image 2 assets

The current 8-bit mode does not load generated assets. The older generated-asset path is kept in the codebase, but `RETRO_8BIT_MODE` disables it so every character and prop is drawn as pixel-style Canvas art.

The prompts intentionally request original characters and props. They do not download or copy official game assets.

To generate those assets with OpenAI's `gpt-image-2` model:

1. Set `OPENAI_API_KEY` in your local environment.
2. Run `npm install`.
3. Run `npm run generate:assets`.
4. Open `mario.html`.

`gpt-image-2` currently does not support native transparent backgrounds, so the generation prompts use a flat `#00ff00` background and the game removes that color in Canvas.
