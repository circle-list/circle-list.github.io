var mapAssets = {
    "s1": {
        "x": [1120, 1060, 1000, 940, 880, 820, 760, 700, 640, 580, 520, 460, 400, 340, 280, 220, 160, 100, 40],
        "y": [420, 240, 60],
        "s": [7, 7, 7, 5, 5, 5, 6, 6, 7, 7, 7, 7, 7, 6, 5, 5, 6, 6, 6],
        "mark": ['イ', 'ウ', 'エ', 'オ', 'カ', 'キ' , 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト'],
        "mark-coord": [{x: 1200, y: 595, c: 'ア'}, {x: 1200, y: 0, c: 'ア'}, {x: 30, y: 595, c: 'ア'}, {x: 10, y: 25, c: 'ア'}],
        "wall": [{x: 520,y:620}, {x:500,y:620}, {x:480,y:620}, {x:0,y:600}, {x:0,y:580}, {x:0,y:540}, {x:0,y:520}, {x: 0, y: 480} ,{x: 0, y: 460}, {x: 20, y: 20}, {x: 40, y:20}, {x: 60, y:20}, {x: 100, y:20}, {x: 240, y:40}, {x: 260, y:40}, {x: 280, y:40}, {x: 340, y: 20}, {x: 360, y: 20}, {x: 380, y: 20}, {x: 420, y: 20}, {x: 440, y: 20}, {x: 480, y: 20}, {x: 500, y: 20}, {x: 700, y: 20}, {x: 720, y: 20}, {x: 760, y: 20}, {x: 860, y: 40}, {x: 880, y: 40}, {x: 900, y: 40}, {x: 960, y: 20}, {x: 980, y: 20}, {x: 1000, y: 20}, {x: 1040, y: 20}, {x: 1060, y: 20}, {x: 1100, y: 20}, {x: 1120, y: 20}, {x: 1200, y: 80}, {x: 1200, y: 100}, {x: 1200, y: 140}, {x: 1200, y: 160}, {x: 1200, y: 200}, {x: 1200, y: 220}, {x: 1200, y: 240}, {x: 1200, y: 260}, {x: 1200, y: 380}, {x: 1200, y: 400}, {x: 1200, y: 420}, {x: 1200, y: 440}, {x: 1200, y: 460}, {x: 1200, y: 500}, {x: 1200, y: 520}, {x: 1200, y: 560}, {x: 1200, y: 580}, {x: 1170, y: 620}, {x: 1150, y: 620}, {x: 1120, y: 620}, {x: 1100, y: 620}, ]
    },
    "s2": {
        "x": [1120, 1060, 1000, 940, 880, 820, 760, 700, 640, 580, 520, 460, 400, 340, 280, 220, 160, 100, 40],
        "y": [420, 240, 60],
        "s": [7, 7, 7, 7, 5, 5, 7, 7, 7, 7, 7, 7, 7, 5, 5, 5, 7, 7, 7],
        "mark": ['ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ'],
        "mark-coord": [{x: 900, y: 595, c: 'ナ'}, {x: 1200, y: 0, c: 'ナ'}, {x: 300, y: 595, c: 'ナ'}, {x: 90, y: 0, c: 'ナ'}],
        "wall": [{x: 940, y: 620}, {x: 960, y: 620}, {x: 990, y: 620}, {x: 1010, y: 620}, {x: 1040, y: 620}, {x: 1060, y: 620}, {x: 1100, y: 620}, {x: 1120, y: 620}, {x: 1150, y: 620}, {x: 1170, y: 620}, {x: 1200, y: 620}, {x: 1200, y: 600}, {x: 1200, y: 580}, {x: 1200, y: 560}, {x: 1200, y: 520}, {x: 1200, y: 500}, {x: 1200, y: 460}, {x: 1200, y: 440}, {x: 1200, y: 260}, {x: 1200, y: 240}, {x: 1200, y: 220}, {x: 1200, y: 200}, {x: 1200, y: 160}, {x: 1200, y: 140}, {x: 1200, y: 100}, {x: 1200, y: 80}, {x: 1200, y: 60}, {x: 900, y: 40}, {x: 880, y: 40}, {x: 860, y: 40}, {x: 740, y: 20}, {x: 700, y: 20}, {x: 680, y: 20}, {x: 500, y: 20}, {x: 480, y: 20}, {x: 440, y: 20}, {x: 420, y: 20}, {x: 280, y: 40}, {x: 260, y: 40}, {x: 240, y: 40}, {x: 60, y: 20}, {x: 40, y: 20}, {x: 20, y: 20}, {x: 340, y: 620}, {x: 360, y: 620}, {x: 380, y: 620}, {x: 400, y: 620}, {x: 420, y: 620}, {x: 440, y: 620}, {x: 480, y: 620}, {x: 500, y: 620}, {x: 530, y: 620}, {x: 550, y: 620}]
    },
    // x: x軸, y: y軸, s: 縦方向サイズ
    "w1": {
        "wall-1": [{x: 360, y: 1220}, {x: 340, y: 1220}, {x: 320, y: 1220}, {x: 300, y: 1220}, {x: 280, y: 1220}, {x: 260, y: 1220}, {x: 240, y: 1220}, {x: 220, y: 1220}, {x: 200, y: 1220}, {x: 180, y: 1220}, {x: 160, y: 1220}, {x: 140, y: 1220}, {x: 120, y: 1220}, {x: 100, y: 1220}, {x: 80, y: 1220}, {x: 0, y: 1120}, {x: 0, y: 1100}, {x: 0, y: 1080}, {x: 0, y: 1040}, {x: 0, y: 1000}, {x: 0, y: 960}, {x: 0, y: 940}, {x: 0, y: 920}, {x: 0, y: 700}, {x: 0, y: 680}, {x: 0, y: 660}, {x: 0, y: 500}, {x: 0, y: 480}, {x: 0, y: 460}, {x: 0, y: 320}, {x: 0, y: 300}, {x: 0, y: 280}, {x: 0, y: 260}, {x: 0, y: 200}, {x: 0, y: 160}, {x: 0, y: 100}, {x: 0, y: 80}, {x: 0, y: 60}, {x: 0, y: 40}, {x: 110, y: 0}, {x: 130, y: 0}, {x: 150, y: 0}, {x: 200, y: 0}, {x: 240, y: 0}, {x: 310, y: 0}, {x: 330, y: 0}, {x: 350, y: 0}, {x: 570, y: 0}, {x: 590, y: 0}, {x: 610, y: 0}, {x: 680, y: 0}, {x: 720, y: 0}, {x: 790, y: 0}, {x: 810, y: 0}, {x: 830, y: 0}, {x: 600, y: 380}, {x: 580, y: 380}, {x: 560, y: 380}, {x: 540, y: 380}, {x: 420, y: 460}, {x: 420, y: 480}, {x: 420, y: 500}, {x: 420, y: 520}, {x: 420, y: 880}, {x: 420, y: 900}, {x: 420, y: 920}, {x: 420, y: 940}, {x: 420, y: 1080}, {x: 420, y: 1100}, {x: 420, y: 1120}, {x: 420, y: 1140}, {x: 420, y: 1160}],
        "wall-2": [{x: 1420, y: 1220}, {x: 1440, y: 1220}, {x: 1460, y: 1220}, {x: 1480, y: 1220}, {x: 1500, y: 1220}, {x: 1520, y: 1220}, {x: 1540, y: 1220}, {x: 1560, y: 1220}, {x: 1580, y: 1220}, {x: 1600, y: 1220}, {x: 1620, y: 1220}, {x: 1640, y: 1220}, {x: 1660, y: 1220}, {x: 1680, y: 1220}, {x: 1700, y: 1220}, {x: -20, y: -20}, {x: -20, y: -20}, {x: -20, y: -20}, {x: -20, y: -20}, {x: -20, y: -20}, {x: 1780, y: 960}, {x: 1780, y: 940}, {x: 1780, y: 920}, {x: 1780, y: 700}, {x: 1780, y: 680}, {x: 1780, y: 660}, {x: 1780, y: 500}, {x: 1780, y: 480}, {x: 1780, y: 460}, {x: 1780, y: 320}, {x: 1780, y: 300}, {x: 1780, y: 280}, {x: 1780, y: 260}, {x: -20, y: -20}, {x: -20, y: -20}, {x: 1780, y: 100}, {x: 1780, y: 80}, {x: 1780, y: 60}, {x: 1780, y: 40}, {x: 1670, y: 0}, {x: 1650, y: 0}, {x: 1630, y: 0}, {x: 1580, y: 0}, {x: 1540, y: 0}, {x: 1470, y: 0}, {x: 1450, y: 0}, {x: 1430, y: 0}, {x: 1210, y: 0}, {x: 1190, y: 0}, {x: 1170, y: 0}, {x: 1100, y: 0}, {x: 1060, y: 0}, {x: 990, y: 0}, {x: 970, y: 0}, {x: 950, y: 0}, {x: 1180, y: 380}, {x: 1200, y: 380}, {x: 1220, y: 380}, {x: 1240, y: 380}, {x: 1360, y: 460}, {x: 1360, y: 480}, {x: 1360, y: 500}, {x: 1360, y: 520}, {x: 1360, y: 860}, {x: 1360, y: 880}, {x: 1360, y: 900}, {x: 1360, y: 920}, {x: 1360, y: 1080}, {x: 1360, y: 1100}, {x: 1360, y: 1120}, {x: 1360, y: 1140}, {x: 1360, y: 1160}],
        "mark-coord": [{x: 1755, y: 1195, c: 'あ'}, {x: 1755, y: -15, c: 'あ'}, {x: 1315, y: 355, c: 'あ'}, {x: 15, y: -15, c: 'れ'}, {x: 455, y: 355, c: 'れ'}, {x: 20, y: 1195, c: 'れ'}],
        "mark-list": {
            "い": [
                {x: 1700, y: 1060, s: 5},
                {x: 1700, y: 860, s: 7},
                {x: 1700, y: 640, s: 7}
            ],
            "う": [
                {x: 1640, y: 1060, s: 6},
                {x: 1640, y: 860, s: 7},
                {x: 1640, y: 640, s: 7}
            ],
            "え": [
                {x: 1580, y: 1060, s: 6},
                {x: 1580, y: 860, s: 7},
                {x: 1580, y: 640, s: 7}
            ],
            "お": [
                {x: 1520, y: 1060, s: 6},
                {x: 1520, y: 860, s: 7},
                {x: 1520, y: 640, s: 7}
            ],
            "か": [
                {x: 1460, y: 1060, s: 6},
                {x: 1460, y: 860, s: 7},
                {x: 1460, y: 640, s: 7}
            ],
            "き": [
                {x: 1400, y: 1060, s: 5},
                {x: 1400, y: 860, s: 7},
                {x: 1400, y: 640, s: 7}
            ],
            "く": [
                {x: 1700, y: 420, s:7},
                {x: 1700, y: 220, s:7},
                {x: 1700, y: 60, s:4}
            ],
            "け": [
                {x: 1640, y: 420, s:7},
                {x: 1640, y: 220, s:7},
                {x: 1640, y: 60, s:4}
            ],
            "こ": [
                {x: 1580, y: 420, s:7},
                {x: 1580, y: 220, s:7},
                {x: 1580, y: 60, s:4}
            ],
            "さ": [
                {x: 1520, y: 420, s:7},
                {x: 1520, y: 220, s:7},
                {x: 1520, y: 60, s:4}
            ],
            "し": [
                {x: 1460, y: 420, s:7},
                {x: 1460, y: 220, s:7},
                {x: 1460, y: 60, s:4}
            ],
            "す": [
                {x: 1400, y: 420, s:7},
                {x: 1400, y: 220, s:7},
                {x: 1400, y: 60, s:4}
            ],
            "せ": [
                {x: 1340, y: 220, s:4},
                {x: 1340, y: 80, s:3}
            ],
            "そ": [
                {x: 1280, y: 220, s:4},
                {x: 1280, y: 80, s:3}
            ],
            "た": [
                {x: 1220, y: 220, s:5},
                {x: 1220, y: 60, s:4}
            ],
            "ち": [
                {x: 1160, y: 220, s:5},
                {x: 1160, y: 60, s:4}
            ],
            "つ": [
                {x: 1100, y: 220, s:5},
                {x: 1100, y: 60, s:4}
            ],
            "て": [
                {x: 1040, y: 220, s:5},
                {x: 1040, y: 60, s:4}
            ],
            "と": [
                {x: 980, y: 220, s:5},
                {x: 980, y: 60, s:4}
            ],
            "ぬ": [
                {x: 780, y: 220, s:5},
                {x: 780, y: 60, s:4}
            ],
            "ね": [
                {x: 720, y: 220, s:5},
                {x: 720, y: 60, s:4}
            ],
            "の": [
                {x: 660, y: 220, s:5},
                {x: 660, y: 60, s:4}
            ],
            "は": [
                {x: 600, y: 220, s:5},
                {x: 600, y: 60, s:4}
            ],
            "ひ": [
                {x: 540, y: 220, s:5},
                {x: 540, y: 60, s:4}
            ],
            "ふ": [
                {x: 480, y: 220, s:4},
                {x: 480, y: 80, s:3}
            ],
            "へ": [
                {x: 420, y: 220, s:4},
                {x: 420, y: 80, s:3}
            ],
            "ほ": [
                {x: 360, y: 420, s:7},
                {x: 360, y: 220, s:7},
                {x: 360, y: 60, s:4}
            ],
            "ま": [
                {x: 300, y: 420, s:7},
                {x: 300, y: 220, s:7},
                {x: 300, y: 60, s:4}
            ],
            "み": [
                {x: 240, y: 420, s:7},
                {x: 240, y: 220, s:7},
                {x: 240, y: 60, s:4}
            ],
            "む": [
                {x: 180, y: 420, s:7},
                {x: 180, y: 220, s:7},
                {x: 180, y: 60, s:4}
            ],
            "め": [
                {x: 120, y: 420, s:7},
                {x: 120, y: 220, s:7},
                {x: 120, y: 60, s:4}
            ],
            "も": [
                {x: 60, y: 420, s:7},
                {x: 60, y: 220, s:7},
                {x: 60, y: 60, s:4}
            ],
            "や": [
                {x: 360, y: 1060, s:6},
                {x: 360, y: 860, s:7},
                {x: 360, y: 640, s:7}
            ],
            "ゆ": [
                {x: 300, y: 1060, s:6},
                {x: 300, y: 860, s:7},
                {x: 300, y: 640, s:7}
            ],
            "よ": [
                {x: 240, y: 1060, s:6},
                {x: 240, y: 860, s:7},
                {x: 240, y: 640, s:7}
            ],
            "ら": [
                {x: 180, y: 1060, s:6},
                {x: 180, y: 860, s:7},
                {x: 180, y: 640, s:7}
            ],
            "り": [
                {x: 120, y: 1060, s:6},
                {x: 120, y: 860, s:7},
                {x: 120, y: 640, s:7}
            ],
            "る": [
                {x: 60, y: 1060, s:6},
                {x: 60, y: 860, s:7},
                {x: 60, y: 640, s:7}
            ]
        }
    },
    "w2": {
        "wall": [{x: 1000, y: 380}, {x: 1020, y: 380}, {x: 1040, y: 380}, {x: 1060, y: 380}, {x: 1080, y: 380}, {x: 1220, y: 380}, {x: 1240, y: 380}, {x: 1260, y: 380}, {x: 1280, y: 380}, {x: 1320, y: 340}, {x: 1320, y: 300}, {x: 1320, y: 280}, {x: 1320, y: 260}, {x: 1320, y: 220}, {x: 1320, y: 200}, {x: 1320, y: 140}, {x: 1320, y: 120}, {x: 1320, y: 80}, {x: 1320, y: 60}, {x: 1320, y: 40}, {x: 1260, y: 0}, {x: 1240, y: 0}, {x: 1220, y: 0}, {x: 1180, y: 0}, {x: 1140, y: 0}, {x: 1100, y: 0}, {x: 1080, y: 0}, {x: 1060, y: 0}, {x: 840, y: 0}, {x: 820, y: 0}, {x: 800, y: 0}, {x: 600, y: 0}, {x: 580, y: 0}, {x: 560, y: 0}, {x: 360, y: 0}, {x: 340, y: 0}, {x: 320, y: 0}, {x: 240, y: 0}, {x: 180, y: 0}, {x: 140, y: 0}, {x: 120, y: 0}, {x: 100, y: 0}, {x: 0, y: 40}, {x: 0, y: 60}, {x: 0, y: 80}, {x: 0, y: 240}, {x: 0, y: 260}, {x: 0, y: 280}, {x: 0, y: 460}, {x: 0, y: 480}, {x: 0, y: 500}, {x: 0, y: 660}, {x: 0, y: 680}, {x: 0, y: 700}, {x: 0, y: 920}, {x: 0, y: 940}, {x: 0, y: 960}, {x: 0, y: 1000}, {x: 0, y: 1040}, {x: 0, y: 1080}, {x: 0, y: 1100}, {x: 0, y: 1120}, {x: 60, y: 1220}, {x: 100, y: 1220}, {x: 120, y: 1220}, {x: 140, y: 1220}, {x: 180, y: 1220}, {x: 200, y: 1220}, {x: 240, y: 1220}, {x: 260, y: 1220}, {x: 300, y: 1220}, {x: 320, y: 1220}, {x: 340, y: 1220}, {x: 380, y: 1220}],
        "mark-coord": [{x: 1315, y: 355, c: 'A'}, {x: 1315, y: -15, c: 'A'}, {x: 20, y: 1200, c: 'A'}, {x: 10, y: -15, c: 'A'}, ],
        "mark-list": {
            B: [
                { x: 1260, y: 220, s: 5 },
                { x: 1260, y: 60, s: 4 },
                { x: 1200, y: 220, s: 5 },
                { x: 1200, y: 60, s: 4 },
                { x: 1140, y: 220, s: 5 },
                { x: 1140, y: 60, s: 4 }
            ],
            C: [
                { x: 1080, y: 220, s: 5 },
                { x: 1080, y: 60, s: 4 },
                { x: 1020, y: 220, s: 5 },
                { x: 1020, y: 60, s: 4 },
                { x: 960, y: 220, s: 4 },
                { x: 960, y: 80, s: 3 }
            ],
            D: [
                { x: 900, y: 220, s: 4 },
                { x: 900, y: 80, s: 3 },
                { x: 840, y: 220, s: 4 },
                { x: 840, y: 80, s: 3 },
                { x: 780, y: 220, s: 5 },
                { x: 780, y: 60, s: 4 },
                { x: 720, y: 220, s: 5 },
                { x: 720, y: 60, s: 4 }
            ],
            E: [
                { x: 660, y: 220, s: 5 },
                { x: 660, y: 60, s: 4 },
                { x: 600, y: 220, s: 5 },
                { x: 600, y: 60, s: 4 }
            ],
            F: [
                { x: 540, y: 220, s: 4 },
                { x: 540, y: 80, s: 3 },
                { x: 480, y: 220, s: 4 },
                { x: 480, y: 80, s: 3 },
                { x: 420, y: 220, s: 4 },
                { x: 420, y: 80, s: 3 }
            ],
            G: [
                { x: 360, y: 440, s: 6 },
                { x: 360, y: 220, s: 6 },
                { x: 360, y: 60, s: 4 }
            ],
            H: [
                { x: 300, y: 420, s: 7 },
                { x: 300, y: 220, s: 7 },
                { x: 300, y: 60, s: 4 }
            ],
            I: [
                { x: 240, y: 420, s: 7 },
                { x: 240, y: 220, s: 7 },
                { x: 240, y: 60, s: 4 }
            ],
            J: [
                { x: 180, y: 420, s: 7 },
                { x: 180, y: 220, s: 7 },
                { x: 180, y: 60, s: 4 }
            ],
            K: [
                { x: 120, y: 420, s: 7 },
                { x: 120, y: 220, s: 7 },
                { x: 120, y: 60, s: 4 }
            ],
            L: [
                { x: 60, y: 420, s: 7 },
                { x: 60, y: 220, s: 7 },
                { x: 60, y: 60, s: 4 }
            ],
            M: [
                { x: 360, y: 1060, s: 5 },
                { x: 360, y: 860, s: 7 },
                { x: 360, y: 640, s: 7 }
            ],
            N: [
                { x: 300, y: 1060, s: 6 },
                { x: 300, y: 860, s: 7 },
                { x: 300, y: 640, s: 7 }
            ],
            O: [
                { x: 240, y: 1060, s: 6 },
                { x: 240, y: 860, s: 7 },
                { x: 240, y: 640, s: 7 }
            ],
            P: [
                { x: 180, y: 1060, s: 6 },
                { x: 180, y: 860, s: 7 },
                { x: 180, y: 640, s: 7 }
            ],
            Q: [
                { x: 120, y: 1060, s: 6 },
                { x: 120, y: 860, s: 7 },
                { x: 120, y: 640, s: 7 }
            ],
            R: [
                { x: 60, y: 1060, s: 6 },
                { x: 60, y: 860, s: 7 },
                { x: 60, y: 640, s: 7 }
            ]
        }
    }
}

// サークルデータの読み込み
var circle_temp = JSON.parse(localStorage.getItem('circles'))
var circles_data = []

if(circle_temp === null || circle_temp === undefined) {
    console.log('データがないよ')
} else {
    for(var i = 0; Object.keys(circle_temp).length > i; i++) {
        circles_data.push(circle_temp[Object.keys(circle_temp)[i]])
    }
}

// pixelRatio_mapの設定 =>上げれば上げるほど解像度は上がるが重くなる
var pixelRatio_map = 2

var circle_box = []

var mapAssets_key = Object.keys(mapAssets)

for(i = 0; mapAssets_key.length > i; i++) {
    switch(mapAssets_key[i]) {
        case 'w1':
            draw_map_w(mapAssets.w1, 'w1')
            break
        case 'w2':
            draw_map_w(mapAssets.w2, 'w2')
            break
        case 's1':
            draw_map_s(mapAssets.s1, 's1')
            break
        case 's2':
            draw_map_s(mapAssets.s2, 's2')
            break
    }
}

function draw_map_w(map_data, jquery) {
    // 初期化
    var map = $('#map-hall-' + jquery)[0]
    ctx = map.getContext('2d')
    ctx.font = '12px Noto Sans JP'
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, map.width, map.height)
    ctx.fillStyle = '#000000'
    map.width = map.width * pixelRatio_map
    map.height = map.height * pixelRatio_map
    map.style.width = (map.width / pixelRatio_map) + 'px'
    map.style.height = (map.height / pixelRatio_map) + 'px'
    ctx.scale(pixelRatio_map, pixelRatio_map)

    if(jquery === 'w1') {
        var item = map_data['wall-1']
        cl_num = 1
        for(var i = 0; item.length > i; i++) {
            var coord = item[i]
            nums = returnNum(cl_num++)
            ctx.strokeRect(coord.x, coord.y, 20, 20)
            ctx.font = '12px Noto Sans JP'
            ctx.fillText(nums, coord.x + 3, coord.y + 15)
            createTooltip(jquery, coord.y, coord.x, 'れ', nums)
        }
    
        var item = map_data['wall-2']
        cl_num = 1
        for(var i = 0; item.length > i; i++) {
            var coord = item[i]
            nums = returnNum(cl_num++)
            ctx.strokeRect(coord.x, coord.y, 20, 20)
            ctx.font = '12px Noto Sans JP'
            ctx.fillText(nums, coord.x + 3, coord.y + 15)
            createTooltip(jquery, coord.y, coord.x, 'あ', nums)
        }
        // 壁サークル番号
        var item = map_data['mark-coord']
        for(var i = 0; item.length > i; i++) {
            ctx.font = '20px Noto Sans JP'
            ctx.fillText(item[i].c, item[i].x, item[i].y + 30)
        }
        // 四角
        ctx.strokeRect(500, 450, 800, 750)
    } else {
        var item = map_data['wall']
        cl_num = 1
        for(var i = 0; item.length > i; i++) {
            var coord = item[i]
            nums = returnNum(cl_num++)
            ctx.strokeRect(coord.x, coord.y, 20, 20)
            ctx.font = '12px Noto Sans JP'
            ctx.fillText(nums, coord.x + 3, coord.y + 15)
            createTooltip(jquery, coord.y, coord.x, 'A', nums)
        }
        // 壁サークル番号
        var item = map_data['mark-coord']
        for(var i = 0; item.length > i; i++) {
            ctx.font = '20px Noto Sans JP'
            ctx.fillText(item[i].c, item[i].x, item[i].y + 30)
        }
        // 四角
        ctx.strokeRect(500, 400, 800, 800)
    }
    
    var obj_keys = Object.keys(map_data['mark-list'])
    var obj = map_data['mark-list']
    
    for(var i = 0; obj_keys.length > i; i++) {
        var island = obj[obj_keys[i]]
        var circle_num = calcCircle(island)
        // 3つに分離している島を処理する
        cl_num = 1
        cl_num2 = 0
        for(var j = 0; island.length > j; j++) {
            // 分離しているうちの1つを処理
            var single_island = island[j]

            // 文字入れ
            if(obj_keys[i].match(/[せそたちつてとぬねのはひふへBCDEF]/) && j === 0) {
                ctx.font = '20px Noto Sans JP'
                ctx.fillText(obj_keys[i], single_island.x + 10, single_island.y - 30)
            } else {
                if(j === 1 && !obj_keys[i].match(/[せそたちつてとぬねのはひふへBCDEF]/)) {
                    ctx.font = '20px Noto Sans JP'
                    ctx.fillText(obj_keys[i], single_island.x + 10, single_island.y - 30)
                }
            }
    
            ctx.font = '12px Noto Sans JP'

            // =========================================右側処理===========================================
            // サークル@下部

            nums = returnNum(cl_num++)
            
            ctx.strokeRect(single_island.x + 10, single_island.y + (20 * single_island.s), 20, 20)
            ctx.fillText(nums, single_island.x + 13, single_island.y + (20 * single_island.s) + 16)

            createTooltip(jquery, single_island.y + (20 * single_island.s), single_island.x + 10, obj_keys[i], nums)
    
            for(var k = 0; single_island.s > k; k++) {
                nums = returnNum(cl_num++)
                ctx.strokeRect(single_island.x + 20, single_island.y + (k * 20), 20, 20)
                ctx.fillText(nums, single_island.x + 23, single_island.y + ( single_island.s * 20 - (k * 20) ) - 6 )

                createTooltip(jquery, single_island.y + (k * 20), single_island.x + 20, obj_keys[i], nums)
            }
    
            // =========================================左側処理===========================================
            for(var k = 0; single_island.s > k; k++) {
                nums = circle_num - cl_num2++
                ctx.strokeRect(single_island.x, single_island.y + (k * 20), 20, 20)
                ctx.fillText(nums, single_island.x + 3, single_island.y + (single_island.s * 20 - (k * 20) ) - 6)

                createTooltip(jquery, single_island.y + (k * 20), single_island.x, obj_keys[i], nums)
            }
    
            // サークル@上部
            nums = circle_num - cl_num2++
            ctx.strokeRect(single_island.x + 10, single_island.y - 20, 20, 20)
            ctx.fillText(nums, single_island.x + 13, single_island.y - 5)

            createTooltip(jquery, single_island.y - 20, single_island.x + 10, obj_keys[i], nums)
        }
    }

}

function draw_map_s(map_data, jquery) {
    // 初期化
    var map = $('#map-hall-' + jquery)[0]
    ctx = map.getContext('2d')
    ctx.font = '12px Noto Sans JP'
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, map.width, map.height)
    ctx.fillStyle = '#000000'
    map.width = map.width * pixelRatio_map
    map.height = map.height * pixelRatio_map
    map.style.width = (map.width / pixelRatio_map) + 'px'
    map.style.height = (map.height / pixelRatio_map) + 'px'
    ctx.scale(pixelRatio_map, pixelRatio_map)

    // 壁サークル
    var item = map_data['wall']
    if(jquery === 's1') {
        var island_n = 'ア'
        cl_num = 0
        for(var i = 0; item.length > i; i++) {
            nums = returnNum(57 - cl_num++)
            var coord = item[i]
            ctx.strokeRect(coord.x, coord.y, 20, 20)
            ctx.font = '12px Noto Sans JP'
            ctx.fillText(nums, coord.x + 3, coord.y + 15)
            createTooltip(jquery, coord.y, coord.x, island_n, nums)
        }

        // 壁サークル番号
        var item = map_data['mark-coord']
        for(var i = 0; item.length > i; i++) {
            ctx.font = '20px Noto Sans JP'
            ctx.fillText(item[i].c, item[i].x, item[i].y + 40)
        }

    } else {
        var island_n = 'ナ'
        cl_num = 1
        for(var i = 0; item.length > i; i++) {
            nums = returnNum(cl_num++)
            var coord = item[i]
            ctx.strokeRect(coord.x, coord.y, 20, 20)
            ctx.font = '12px Noto Sans JP'
            ctx.fillText(nums, coord.x + 3, coord.y + 15)
            createTooltip(jquery, coord.y, coord.x, island_n, nums)
        }

        // 壁サークル番号
        var item = map_data['mark-coord']
        for(var i = 0; item.length > i; i++) {
            ctx.font = '20px Noto Sans JP'
            ctx.fillText(item[i].c, item[i].x, item[i].y + 40)
        }
    }

    // メイン処理
    for(var i = 0; map_data.x.length > i; i++) {
        var circle_num = 32 + (map_data.s[i] * 2)
        cl_num = 1
        cl_num2 = 0
        for(var j = 0; map_data.y.length > j; j++) {
            switch(j) {
                case 0:
                    var s = 9
                    break
                case 1:
                    var s = 7
                    break
                case 2:
                    var s = map_data.s[i]
            }

            if(j === 2) {
                var space = (7 - s) * 20
            } else {
                var space = 0
            }

            if(j === 0 || j === 1) {
                ctx.font = '20px Noto Sans JP'
                ctx.fillText(map_data.mark[i], map_data.x[i] + 10, map_data.y[j] - 12)
            }


            ctx.font = '12px Noto Sans JP'
            for(var k = 0; s > k; k++) {
                // ================右側処理================
                nums = returnNum(cl_num++)
                ctx.strokeRect(map_data.x[i] + 20, map_data.y[j] + (20 * k) + space, 20, 20)
                ctx.fillText(nums, map_data.x[i] + 23, map_data.y[j] + (s * 20 - (k * 20) ) - 6 + space)
                createTooltip(jquery, map_data.y[j] + (s * 20 - (k * 20) ) + space - 20, map_data.x[i] + 20, map_data.mark[i], nums)

                // ================左側処理================
                nums2 = circle_num - cl_num2++
                ctx.strokeRect(map_data.x[i], map_data.y[j] + (20 * k) + space, 20, 20)
                ctx.fillText(nums2, map_data.x[i] + 3, map_data.y[j] + (s * 20 - (k * 20) ) - 6 + space)
                createTooltip(jquery, map_data.y[j] + (s * 20 - (k * 20) ) + space - 20, map_data.x[i], map_data.mark[i], nums2)

            }
        }
    }
}

function createTooltip(hall, x, y, island, number) {
    if(circle_box[island] === undefined) {
        circle_box[island] = {}
    }
    if(circle_box[island][number] === undefined) {
        circle_box[island][number] = {}
    }
    circle_box[island][number] = {x: x, y: y, hall: hall}
    /*
    circles_data.find(data => {
        if(data.place.island === island && data.place.number === number) {
            $('#map-hall-' + hall + '-cover').append('<div class="tip-circle tooltiped" style="top: ' + x + 'px; left: ' + y + 'px;"></div>')
        }
    })
    */
}

function returnNum(num) {
    return ('0' + num).slice(-2)
}

function calcCircle(obj) {
    // サークル数計算
    var n = 0
    for(var i = 0; obj.length > i; i++) {
        n += obj[i].s * 2 + 2
    }
    return n
}

// 着色
var map_n = 0
var map_array = {}
var days_color = {"1": '#039be5', "2": '#d81b60', "3": '#ffb300', "4": '#43a047'}
function finalize() {
    for(var i = 0; circles_data.length > i; i++) {
        var data = circles_data[i]
        if(map_array[data.place.island + data.place.number] === undefined) {
            map_array[data.place.island + data.place.number] = []
        }
        map_array[data.place.island + data.place.number].push(data)
    }

    for(var i = 0; Object.keys(map_array).length > i; i++) {

        var data = map_array[Object.keys(map_array)[i]][0]
        
        var num = Object.keys(circle_box[data.place.island]).find(d => {
            return (d === data.place.number)
        })
        var coord = circle_box[data.place.island][num]
        try {
            $('#map-hall-' + coord.hall + '-cover').append('<div class="tip-circle" id="map_temp-' + map_n + '" style="top: ' + coord.x + 'px; left: ' + coord.y + 'px;" onclick="openDetails(\'' + data.place.island + data.place.number + '\')"></div>')
        } catch(err) {
            //M.toast({html: '<b class="red-text text-accent-1" style="font-weight: bold;">エラーが発生しました。マップの描画に失敗している可能性があります</b>'})
            if(getConfig('errorReport') !== false) {
        
                var errorReport = {
                    report: {
                        time: new Date(),
                        info: {
                            vendor: window.navigator.vendor,
                            userAgent: window.navigator.userAgent,
                            language: window.navigator.language
                        },
                        connection: {
                            type: window.navigator.connection.type,
                            effectiveType: window.navigator.connection.effectiveType,
                            downlink: window.navigator.connection.downlink
                        }
                    },
                    error: {
                        data: JSON.stringify(circle_box),
                        err: err
                    }
                }
        
                if(window.navigator.onLine) {
                    $.ajax({
                        url:'https://sp-wtr-api.gq/api/v1/circlelist/error',
                        type:'POST',
                        data: errorReport
                    })
                    .done(data => {
                        console.log(data)
                    })
                    .fail(data => {
                        console.log(data)
                        console.log(errorReport)
                        M.toast({html: '<b class="red-text text-accent-1" style="font-weight: bold;">エラー情報の送信に失敗しました</b>'})
                    })
        
                }
            }
        }

        var ctx = $('#map-hall-' + coord.hall)[0].getContext('2d')
        ctx.fillStyle = days_color[data.place.date]
        ctx.fillRect(coord.y + 1, coord.x + 1, 18, 18)
        ctx.font = '12px Noto Sans JP'
        ctx.fillStyle = '#FFF'
        ctx.fillText(num, coord.y + 3, coord.x + 14)

        var array = map_array[data.place.island + data.place.number]
        var circle_list = []
        for(var j = 0; array.length > j; j++) {
            circle_list.push(array[j].name + ' (' + array[j].place.date + '日目/' + array[j].place.ab + ')')
        }

        var text = circle_list.join('<br>')
        tippy('#map_temp-' + map_n, {
            content: text
        })

        map_n++
    }
}

finalize()

function openDetails(place) {
    $('.modal').modal() // DEBUG
    $('#map_circle_info_place').text(place)
    $('#map_circle_info_list').html('')
    var ma_array = map_array[place]
    for(var i = 0; ma_array.length > i; i++) {
        var dat = ma_array[i]
        $('#map_circle_info_list').append('<h6>・' + dat.name + '</h6><span style="color: ' + days_color[dat.place.date] + '">' + dat.place.date + '日目 - ' + dat.place.ab + '</span><br><span>' + dat.memo + '</span>')
    }
    var instance = M.Modal.getInstance($('#map_circle_info'))
    instance.open()
}
