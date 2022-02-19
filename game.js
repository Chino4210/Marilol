kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [0, 0, 0, ],
})

//Speed identifiers
const MOVE_SPEED = 120
const JUMP_FORCE = 360
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 400
const ENEMY_SPEED = 40

// Game logic

let isJumping = true 

loadRoot('https://i.imgur.com/')
loadSprite('coin', 'QTEx9w5.png')
loadSprite('evil-shroom', 'WhDyRsb.png')
loadSprite('brick', 'SQElZhl.png')
loadSprite('block', 'mdLzNDx.png')
loadSprite('mario', '4Qebd71.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')
loadSprite('ppipe', 'DJBTTKc.png')
loadSprite('blue-block', 'fVscIbn.png')
loadSprite('black', 'htZx6TS.png')
loadSprite('blue-steel', 'gqVoI2b.png')
loadSprite('blue-evil-shroom', 'SvV4ueD.png')
loadSprite('blue-surprise', 'RMqCc1G.png')
loadSprite('text-white' ,'T68o7aV.png')

scene("menu", () => {
    add([
      text("MariLOL"),
      pos(400, 80),
      scale(3)
    ]);

    add([
        rect(160,20),
        pos(400, 180),
        "button",
        {
            clickAction: () => go('game',{ level: 0,score: 0}),
        },
    ]);

    add([
        text("Play game"),
        pos(445, 185),
        color(0, 0, 0)
    ]);

    add([
        rect(160,20),
        pos(400, 220),
        "button",
        {
            clickAction: () => window.open('https://youtu.be/W7x7Deq5oDA', '_blank'),
        },
    ]);

    add([
        text("Quit"),
        pos(465, 225),
        color(0, 0, 0)
    ]);

    add([
        rect(160,20),
        pos(400,250 ),
        "button",
        {
            clickAction: () => window.open('https://youtu.be/dQw4w9WgXcQ', '_blank'),
        },
    ]);

    add([
        text("Skip to end"),
        pos(445, 255),
        color(0, 0, 0)
    ]);

    

    action("button", b=> {
        if (b.isHovered())
            b.use(color(0.7, 0.7, 0.7));
        else
            b.use(color(1, 1, 1));
        if (b.isClicked())
            b.clickAction();    
    });
  });
  

  

  

scene("game", ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj')
//Game Map 
    const maps = [
        [
        'b      bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        'b                                     b',
        'b                                     b',
        'b                                     b',
        'b                                     b',
        'b     % =*=                           b',
        'b                                    %b',
        'b                            -+       b',
        'b                    ^  ^    ()      =b',
        '==============================   =====b',
        ],
        [
        '                                                             ',
        '                                                             ',   
        'b                                                          -+',    
        'b   $   $   $   $   $   $   $   $   $   $   $   $          ()',    
        'b   =   =   =   =   =   =   =   =   =   =   =   =      ===== ',
        'b  =/                                                        ',
        'b =//                                                        ',
        'b====                                                        ',
        ],
        [
        'b    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',        
        'b                                          b',    
        'b                                          b',
        'b         =%=   *                          b',
        'b                                        -+b',
        'b   $$$                    ^   ^         ()b',
        '============================================',
        ],
        [
        'b      bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        'b                            $$              b',    
        'b   $$^                      ==              b',
        'b   ==%=%=                                -+ b',    
        'b                            ^    ^       () b',
        'b                 ^===========================',    
        '===================///////////////////////////',
        '//////////////////////////////////////////////',
        ],
        [
        'b        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        'b                                              b',
        'b                                              b',    
        'b                                              b',    
        'b           $                                  b',    
        'b        ====         $$                       b',
        'b      =/////        %======%                  b',    
        'b     =//////                                -+b',    
        'b   =////////         ^^^^      ^^^^         ()b',
        '================================================',    
        '////////////////////////////////////////////////',

        ],
        [
        'b             bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb b',
        'b               nnnnnn        nnnnn       n    n     nnnnnn     nnnnnn      nnnnn      nnnnnnn      nnnnn         nnnnnnn   n     n     nnnnn     n    n   n    n        nnnnnnn     nnnnn     nnnnnn      nnnnnn    n         nnnnn     n     n   nnnnn   n    n     nnnnn              b',
        'b              n             n     n      nn   n    n           n     n    n     n        n          nnn             n      n     n    n     n    nn   n   n   n         n          n     n    n     n     n     n   n        n     n     n   n      n     nn   n    n                   b',
        'b              n             n     n      n n  n    n    nnn    nnnn       nnnnnnn        n           n              n      nnnnnnn    nnnnnnn    n n  n   nnn           nnnnn      n     n    nnnnn       nnnnnn    n        nnnnnnn      n n       n     n n  n    n    nnn            b',
        'b              n             n     n      n  n n    n      n    n    n     n     n        n                          n      n     n    n     n    n  n n   n   n         n          n     n    n    n      n         n        n     n       n        n     n  n n    n      n            b', 
        'b               nnnnnn        nnnnn       n   nn     nnnnn      n    n     n     n        n           n    n         n      n     n    n     n    n   nn   n    n        n           nnnnn     n    n      n         nnnnn    n     n       n      nnnnn   n   nn     nnnnn              b',
        'b                                                                                                                                                                                                                                                                                        b',
        'b                                                                                                                                                                                                                                                                                       pb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        ],
       
    ]
        
    

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid()],
        '$': [sprite('coin'),'coin'],
        '%': [sprite('surprise'), solid(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
        '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
        '-': [sprite('pipe-top-left'), solid(), scale(0.5),'pipe'],
        '+': [sprite('pipe-top-left'), solid(), scale(0.5),'pipe'],
        '}': [sprite('unboxed'), solid()],
        '^': [sprite('evil-shroom'), solid(),'dangerous'],
        '#': [sprite('mushroom'), solid(), 'mushroom', body()],
        'a': [sprite('blue-block'), solid(), scale(0.5)],
        'b': [sprite('black'), solid(), scale(0.5)],
        'c': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
        'd': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
        'e': [sprite('blue-steel'), solid(), scale(0.5)],
        '/': [sprite('brick'), solid()],
        'p': [sprite('ppipe'), solid(), scale(0.5),'ppipe'],
        'n': [sprite('text-white'), solid(), scale(0.5)],
    }

    const gameLevel = addLevel(maps[level], levelCfg)

    const scoreLabel = add([
        text(score),
        pos(30, 6),
        layer('ui'),
        {
            value: score,
        }
    ])

    add([text('level ' + parseInt(level + 1)), pos(40,6)])
//when eat mushroom logic
    function big() {
        let timer = 0
        let isBig = false
        return {
            update() {
                if (isBig) {
                    CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
                    timer -=dt()
                    if (timer <= 0){
                        this.smallify()
                    }
                }
            },
            isBig() {
                return isBig
            },
            smallify() {
                this.scale = vec2(1)
                CURRENT_JUMP_FORCE = JUMP_FORCE
                timer = 0
                isBig = false
            },
            biggify(time) {
                this.scale = vec2(2)
                CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
                timer = time 
                isBig = true
            }
        }
    }
//player logic
    const player = add([
        sprite('mario'), solid(),
        pos(30, 0),
        body(),
        big(),
        origin('bot')
    ])

    action('mushroom', (m) => {
        m.move(20, 0)
    })

    player.on("headbump", (obj) => {
        if (obj.is('coin-surprise')) {
            gameLevel.spawn('$', obj.gridPos.sub(0,1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0,0))
        }
        if (obj.is('mushroom-surprise')) {
            gameLevel.spawn('#', obj.gridPos.sub(0,1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0,0))
        }
    })

    player.collides('mushroom', (m) => {
        destroy(m)
        player.biggify(6)
    })

    player.collides('coin', (c) => {
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
    })

    action('dangerous', (d) => {
        d.move(-ENEMY_SPEED,0)
    })
    
    player.collides('dangerous', (d) => {
        if (isJumping) {
            destroy(d)
            scoreLabel.value++
            scoreLabel.text = scoreLabel.value
        } else {
        go('lose', { score: scoreLabel.value})
        }
    })

    player.action( () => {
        camPos(player.pos)
        if (player.pos.y >= FALL_DEATH) {
            go('lose', { score: scoreLabel.value})
        }
    })

    player.collides('pipe', () => {
        keyPress('down', () => {
            go('game', {
                level: (level + 1) % maps. length,
                score: scoreLabel.value
            })
        })
    })

    player.collides('ppipe', () => {
        keyPress('down', () => {
            go('Clear')
        })
    })

    //key bind

    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0)
    })

    keyDown('right', () => {
        player.move(MOVE_SPEED, 0)
    })

    player.action(()  => {
        if(player.grounded()) {
            isJumping = false
        }
    })

    keyPress('up', () => {
        if (player.grounded()) {
            isJumping = true
            player.jump(CURRENT_JUMP_FORCE)
        }
    })
})

scene('lose',({ score }) => {
    //add([text(score, 32), origin('center'), pos(width()/2,height()/2)])
    add([
        text("Game Over!"),
        origin('center'),
        pos(475, 80),
        scale(2)
      ]);

      add([
        text(score,22),
        origin('center'),
        pos(475, 120),
        scale(2)
      ]);
  
  
      add([
          rect(160,20),
          pos(400, 180),
          "button",
          {
              clickAction: () => go('game',{ level: 0,score: 0}),
          },
      ]);
  
      add([
          text("Retry"),
          pos(455, 185),
          color(0, 0, 0)
      ]);

      
    add([
        rect(160,20),
        pos(400, 220),
        "button",
        {
            clickAction: () => go('menu'),
        },
    ]);

    add([
        text("Return to menu"),
        pos(425, 225),
        color(0, 0, 0)
    ]);

    add([
        rect(160,20),
        pos(400, 255),
        "button",
        {
            clickAction: () => window.open('https://youtu.be/lJEARgRq6IE', '_blank'),
        },
    ]);

    add([
        text("Quit"),
        pos(465, 265),
        color(0, 0, 0)
    ]);




      action("button", b=> {
        if (b.isHovered())
            b.use(color(0.7, 0.7, 0.7));
        else
            b.use(color(1, 1, 1));
        if (b.isClicked())
            b.clickAction();    
    });
})

scene('Clear',() => {
    add([
        text("Game Clear!"),
        origin('center'),
        pos(475, 80),
        scale(2)
      ]);
  
      add([
          rect(160,20),
          pos(400, 180),
          "button",
          {
              clickAction: () => go('game',{ level: 0,score: 0}),
          },
      ]);
  
      add([
          text("Retry"),
          pos(455, 185),
          color(0, 0, 0)
      ]);

      
    add([
        rect(160,20),
        pos(400, 220),
        "button",
        {
            clickAction: () => go('menu'),
        },
    ]);

    add([
        text("Return to menu"),
        pos(425, 225),
        color(0, 0, 0)
    ]);

    add([
        rect(160,20),
        pos(400, 255),
        "button",
        {
            clickAction: () => window.open('https://github.com/Chino4210/Marilol/blob/main/game.js', '_blank'),
        },
    ]);

    add([
        text("Go Code"),
        pos(465, 265),
        color(0, 0, 0)
    ]);




      action("button", b=> {
        if (b.isHovered())
            b.use(color(0.7, 0.7, 0.7));
        else
            b.use(color(1, 1, 1));
        if (b.isClicked())
            b.clickAction();    
    });
})

start("menu")
