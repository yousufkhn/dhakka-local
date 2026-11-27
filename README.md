# Dhakka Local (3D)

Wobbly-ragdoll party game in a packed Mumbai local. Push, dropkick and throw everyone out of the doors; the last one inside wins.

- `index.html`: the 3D game (Three.js 0.160 + cannon-es 0.20 loaded from jsDelivr; all models, textures and sounds are generated in code). Plays vs bots.
- `dhakka-local-2d.html`: the earlier 2D version (Matter.js), which also has room-code multiplayer if hosted on a normal website.

Moves: joystick/WASD to walk, KOODO/Space jump, DHAKKA/J (tap = shove, hold and release = super shove, in the air = dropkick, while holding someone = throw), PAKDO/K hold to grab straps, the door pole or people (grip runs out).
Events: curves and brakes, khamba past the doors, vendor, TC ticket check, monsoon, a fast local passing on the next track (wind gust), station crowds with the platform on either side, Dadar/Andheri/Borivali rush, vada pav and cutting chai power-ups.

Phase 1 upgrade (2026-11-27, see the Upgrade Plan doc):
- Game feel: hit-stop on big hits, comic word bursts (DHISHOOM!, KHATAAK!), dust puffs, camera kick, phone vibration, landing thuds.
- Things fly off on big hits (chappals, glasses, caps, phones, tiffins, newspapers) and stay on the floor; the character really loses them.
- Clutch save: pressing PAKDO near the door pole while flying out catches it ("BACH GAYA!").
- Characters: bigger heads, faces that react (angry, scared, smug, KO), 8 player outfits (tie, dupatta that flaps in the wind, headphones, cap, glasses...), yellow ring under you.
- Look: each round is a different time of day (morning, noon, golden hour, dusk, night with warm tube lights and lit windows); scenery changes along the route (city walls with ads, blue-tarp rooftops, sea with boats, green suburbs); monsoon puddles and splashes; chai stall and waving crowd on platforms.
- Readability pass (same day): 4 players by default (3/4/6), max 4 crowd NPCs, action camera that frames the players still in (52° elevation), see-through near wall, fans moved to the back wall, coloured ring under every player, aim arrow while charging, shockwave on shove, PAKDA! on grabs, slow-mo + dust trail the moment someone flies out of a door. Bots keep personal space and spread their targets.
- UI: ticket-style menu, Bangers + Baloo 2 fonts (Google Fonts), route strip and player chips in the HUD, letterbox during slow-mo falls, confetti for the winner.
- Debug hooks: `__look(todIndex, theme, rain)` and `__lamp(intensity)` for screenshots.

Phase 2 (2026-11-27): matches and modes
- A match is 5 rounds (MATCH_N). Points: last one inside +5, 2nd +3, 3rd +1, each push-out +2 (+1 style for throw, dropkick or platform revenge), clutch save +1. Scoreboard after each round lists who earned what.
- End of match: podium inside the coach (gold/silver/bronze), awards (Asli Mumbaikar, Dhakka Master, Khamba Magnet, Chappal Chor, Clutch King, Paidal Yatri, Platform ka Badla), Play again / Menu.
- Platform revenge: once out, you aim a reticle with the joystick; DHAKKA throws a vada pav (shoves people near the impact), KOODO drops a banana peel (slip). Out bots do it too.
- Modes (menu): Classic, Seat Wars (stand on the glowing seat 10 s; contested seats don't count; time-up at 75 s), Virar Fast (no stops, rougher curves, uncles keep coming from the next coach), Monsoon (wet floor all round).

Phase 3 (2026-11-27): online with friends
- Menu button "Dosto ke saath": create a room (4-letter code) or join by code / `?room=CODE` link; WhatsApp invite and link copy; up to 6 people, empty seats get bots; host picks players, mode and bot level on the ticket and presses "Train chalao!".
- Host-authoritative over PeerJS 1.5.4 (loaded on demand, peer id `dhakkalocal-CODE`, PeerJS cloud server + its TURN). Host sends 20 snapshots/s (Int16 body transforms + JSON state + effect events); phones draw 100 ms behind and send joystick/buttons ~30/s with tap latching.
- Personal effects (BACH GAYA, +points, pickup banner, revenge hint, vibration) go only to that player.
- Drop-outs: a player whose phone disconnects (or goes silent 9 s) becomes a bot. Late joiners watch and take a bot's seat when the next match starts. If the host leaves, everyone goes back to the lobby with a message.
- Hosted at https://yousufkhn.github.io/dhakka-local/ (repo yousufkhn/dhakka-local, deployed from main). Online does not work on the Claude artifact link; it says so.
- Debug: `__NET`, `__podium()`, `__newMatch()`. Test harness with a fake PeerJS: scratchpad `test/fakepeer.js`, `test/net.js`, `test/net2.js`.

## Polish pass (2026-11-27)
- **Feel:** aim assist, charge-based shove (missing makes you stumble), tiredness when you spam push, holding GRAB braces you, fewer random events.
- **Progress:** Monthly Pass (16 stamps, 100 km each), wardrobe with live preview, titles, 3 daily tasks, lifetime record. Saved on the phone (`dl_prof`, `dl_set`, `dl_match`).
- **Sound:** synthesized, phone-speaker friendly. Mixer = sfx/music/ambience buses -> compressor -> master, small reverb, music ducks under announcements and big moments. Dhol + brass band music in four moods (menu, match, final two, podium). iPhone plays through the silent switch.
- **Menu:** your character in a showcase scene, big PLAY, mode picker cards, profile/pass chip, quick links (wardrobe, pass, tasks, tutorial).
- **Tutorial + tips:** 6-step tutorial on an empty morning train; fading tips for the first 3 matches; easier bots for new players and after losing streaks.
- **Less clutter:** at most two speech bubbles, banners only for events you must react to, big headlines only when you are involved.
- **Friends lobby:** player cards with ping, host picks mode and seat fill, kick, 3-2-1 countdown, version check (`PROTO`), screen kept awake. Guests who drop reconnect automatically and get their seat back.
- **Install + sharing:** manifest, icons, service worker (hosted site only), WhatsApp/OG preview (`og.jpg`), share-a-moment snapshot on the podium.
- Tests (scratchpad): `test/netreal3.js` (real PeerJS + local server, includes a drop/reconnect check), `test/aud.js` (per-sound loudness in the phone band).
