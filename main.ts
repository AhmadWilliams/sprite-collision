controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (rightdrct == true) {
        bullet = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . b b b b . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 100, 0)
    } else if (rightdrct == false) {
        bullet = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . b b b b . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, -100, 0)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(img`
        ..........ffff......
        ........fff22fff....
        .......fff2222fff...
        ......fffeeeeeefff..
        ......fee222222eff..
        ......fe2ffffff2ef..
        ......ffffeeeeffff..
        .....ffefbf44fbfeff.
        .....fee41fddf14eef.
        .bbbb.feeddddddeef..
        .bbbb..fee4444eef...
        ....bbe4f222222f4e..
        ....bb4df222222fd4..
        ....bb44f445544f44..
        .........ffffff.....
        .........ff..ff.....
        `)
    rightdrct = false
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(img`
        ......ffff..........
        ....fff22fff........
        ...fff2222fff.......
        ..fffeeeeeefff......
        ..ffe222222eef......
        ..fe2ffffff2ef......
        ..ffffeeeeffff......
        .ffefbf44fbfeff.....
        .fee41fddf14eef.....
        ..feeddddddeef.bbbb.
        ...fee4444eef..bbbb.
        ..e4f222222f4ebb....
        ..4df222222fd4bb....
        ..44f445544f44bb....
        .....ffffff.........
        .....ff..ff.........
        `)
    rightdrct = true
})
info.onLifeZero(function () {
    game.gameOver(false)
    game.setGameOverScoringType(game.ScoringType.HighScore)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    burger.setPosition(randint(0, 120), randint(0, 160))
    burger.setStayInScreen(true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.none, 100)
    sprites.destroy(otherSprite, effects.disintegrate, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    mySprite.startEffect(effects.disintegrate)
    sprites.destroy(myEnemy)
})
let myEnemy: Sprite = null
let bullet: Sprite = null
let rightdrct = false
let burger: Sprite = null
let mySprite: Sprite = null
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
info.setLife(3)
mySprite.setStayInScreen(true)
burger = sprites.create(img`
    . . . . c c c b b b b b . . . . 
    . . c c b 4 4 4 4 4 4 b b b . . 
    . c c 4 4 4 4 4 5 4 4 4 4 b c . 
    . e 4 4 4 4 4 4 4 4 4 5 4 4 e . 
    e b 4 5 4 4 5 4 4 4 4 4 4 4 b c 
    e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e 
    e b b 4 4 4 4 4 4 4 4 4 4 4 b e 
    . e b 4 4 4 4 4 5 4 4 4 4 b e . 
    8 7 e e b 4 4 4 4 4 4 b e e 6 8 
    8 7 2 e e e e e e e e e e 2 7 8 
    e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e 
    e c 6 7 6 6 7 7 7 6 6 7 6 c c e 
    e b e 8 8 c c 8 8 c c c 8 e b e 
    e e b e c c e e e e e c e b e e 
    . e e b b 4 4 4 4 4 4 4 4 e e . 
    . . . c c c c c e e e e e . . . 
    `, SpriteKind.Food)
burger.setPosition(randint(0, 120), randint(0, 160))
burger.setStayInScreen(true)
tiles.setCurrentTilemap(tilemap`level1`)
game.showLongText("Press b to fire", DialogLayout.Bottom)
info.startCountdown(150)
game.onUpdateInterval(5000, function () {
    myEnemy = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Enemy)
    myEnemy.follow(mySprite, 10)
    tiles.placeOnRandomTile(myEnemy, sprites.dungeon.darkGroundNorthWest0)
    myEnemy.setStayInScreen(true)
})
