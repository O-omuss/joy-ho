function CSquare(iRow, iColumn, iColour, oMatrixContainer){
    var _oMatrixContainer;
    var _oSquareContainer;
    var _oSquareSprite;
    
    var _iColumn;
    var _iRow;
    var _iX;
    var _iY;
    var _iColour;

    this._init = function(){
        _oMatrixContainer = oMatrixContainer;
        _oSquareContainer = new createjs.Container();
        _oMatrixContainer.addChild(_oSquareContainer);
        
        _iColour = iColour;
        _iColumn = iColumn;
        _iRow = iRow;
        _iX = MATRIX_OFFSET_X+(SQUARE_SIZE+SQUARE_OFFSET)*_iColumn;
        _iY = MATRIX_OFFSET_Y+(SQUARE_SIZE+SQUARE_OFFSET)*_iRow;

        var oData = {
            images: [s_oSpriteLibrary.getSprite('box')],
            frames: {width: SQUARE_SIZE, height: SQUARE_SIZE, regX: 0, regY: 0},
            animations: {idle: [0,4]}
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oSquareSprite = createSprite(oSpriteSheet, 'idle', 0, 0, SQUARE_SIZE, SQUARE_SIZE);
        _oSquareSprite.gotoAndStop(_iColour);
        _oSquareSprite.regX = _oSquareSprite.regY = SQUARE_SIZE * 0.5;
        _oSquareContainer.addChild(_oSquareSprite);
        
        _oSquareContainer.x = _iX;
        _oSquareContainer.y = _iY;
        _oSquareContainer.scaleX = _oSquareContainer.scaleY = SQUARE_SCALE_VAR;
        _oSquareContainer.on("mousedown", function(){
            s_oGame.onClickedSquare(_iColumn);
        });
        
        if (!s_bMobile) {
            _oSquareContainer.cursor = "pointer";
        };
    };

    this.destroySquare = function(){
        createjs.Tween.get(_oSquareSprite)
            .to({alpha: 0}, 500, createjs.Ease.backOut)
            .call(this.unload);
    };
    
    this.getColour = function(){
        return _iColour;
    };
    
    this.unload = function(){        
        _oMatrixContainer.removeChild(_oSquareContainer);
        createjs.Tween.removeTweens(_oSquareSprite);
    };
    
    this._init();
};