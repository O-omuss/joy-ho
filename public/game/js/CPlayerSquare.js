function CPlayerSquare(iRow, iColumn, iColour, oMatrixContainer){
    var _oMatrixContainer;
    var _oPlayerSquareContainer;
    var _oSquareSprite;
    var _oValueText;
    
    var _iValue;
    var _iColumn;
    var _iRow;
    var _iX;
    var _iY;
    var _iColour;

    var _bChangingColour;
    var _bMoveHorizontally;
    var _bMoveVertically;
    var _bFallingDown;

    // THESE VARIABLES WILL BE USED FOR THE MOVEMENT
    var _iCntTimeX;
    var _iCurStartX;
    var _iFinishX;
    var _iMaxTimeX;    
    var _iCntTimeY;
    var _iCurStartY;
    var _iFinishY;    
    var _iMaxTimeY;
    
    this._init = function(){
        _oMatrixContainer = oMatrixContainer;
        _oPlayerSquareContainer = new createjs.Container();
        _oMatrixContainer.addChild(_oPlayerSquareContainer);
        
        _bChangingColour = false;
        _bFallingDown = true;
        
        // SETTINGS FOR THE MOVEMENT
        _bMoveHorizontally = false;
        _bMoveVertically = false;        
        _iMaxTimeX = PLAYER_SQUARE_HORIZONTAL_SPEED;
        _iMaxTimeY = PLAYER_SQUARE_VERTICAL_SPEED;        
        this._resetHorizontalTweenSettings(0);
        this._resetVerticalTweenSettings();
        
        _iValue = START_PLAYER_VALUE;
        _iColour = iColour;
        _iColumn = iColumn;
        _iRow = iRow;
        _iX = MATRIX_OFFSET_X + (SQUARE_SIZE + SQUARE_OFFSET) * _iColumn;
        _iY = MATRIX_OFFSET_Y - (SQUARE_SIZE + SQUARE_OFFSET);

        var oData = {
            images: [s_oSpriteLibrary.getSprite('box')],
            frames: {width: SQUARE_SIZE, height: SQUARE_SIZE, regX: 0, regY: 0},
            animations: {idle: [0,4]}
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oSquareSprite = createSprite(oSpriteSheet, 'idle', 0, 0, SQUARE_SIZE, SQUARE_SIZE);
        _oSquareSprite.gotoAndStop(_iColour);
        _oSquareSprite.regX = _oSquareSprite.regY = SQUARE_SIZE * 0.5;
        
        _oValueText = new createjs.Text(_iValue, "40px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        _oValueText.textAlign = "center";
        _oValueText.textBaseline = "alphabetic";
        _oValueText.y = 15;
        
        _oPlayerSquareContainer.addChild(_oSquareSprite, _oValueText);
        
        _oPlayerSquareContainer.x = _iX;
        _oPlayerSquareContainer.y = -SQUARE_SIZE;
        _oPlayerSquareContainer.scaleX = _oPlayerSquareContainer.scaleY = SQUARE_SCALE_VAR;
    };
    
    this.startTween = function(){
        createjs.Tween.get(_oPlayerSquareContainer)
            .to({y: _iY}, 1500, createjs.Ease.bounceOut).
            call(function(){
                createjs.Tween.removeTweens(_oPlayerSquareContainer);
                s_oGame.startMatrixMovement();
                _bFallingDown = false;
            });
    };

    this.getColumn = function(){
        return _iColumn;
    };
    
    this.getColour = function(){
        return _iColour;
    };
    
    this.changeColour = function(iNewColour){
        var oParent = this;
        var iAlphaVar = 0.8;
        var iScaleVar = 1.2;
        var iSpeed = 50;
        _bChangingColour = true;
        
        createjs.Tween.get(_oPlayerSquareContainer)
            .to({alpha: iAlphaVar, scaleX: iScaleVar, scaleY: iScaleVar}, iSpeed, createjs.Ease.quadIn)
            .to({alpha: 1, scaleX: SQUARE_SCALE_VAR, scaleY: SQUARE_SCALE_VAR}, iSpeed, createjs.Ease.quadOut)
            .to({alpha: iAlphaVar, scaleX: iScaleVar, scaleY: iScaleVar}, iSpeed, createjs.Ease.quadIn)
            .to({alpha: 1, scaleX: SQUARE_SCALE_VAR, scaleY: SQUARE_SCALE_VAR}, iSpeed, createjs.Ease.quadOut)
            .to({alpha: iAlphaVar, scaleX: iScaleVar, scaleY: iScaleVar}, iSpeed, createjs.Ease.quadIn)
            .to({alpha: 1, scaleX: SQUARE_SCALE_VAR, scaleY: SQUARE_SCALE_VAR}, iSpeed, createjs.Ease.quadOut)
            .to({alpha: iAlphaVar, scaleX: iScaleVar, scaleY: iScaleVar}, iSpeed, createjs.Ease.quadIn)
            .to({alpha: 1, scaleX: SQUARE_SCALE_VAR, scaleY: SQUARE_SCALE_VAR}, iSpeed, createjs.Ease.quadOut)
            .to({alpha: iAlphaVar, scaleX: iScaleVar, scaleY: iScaleVar}, iSpeed, createjs.Ease.quadIn)
            .to({alpha: 1, scaleX: SQUARE_SCALE_VAR, scaleY: SQUARE_SCALE_VAR}, iSpeed, createjs.Ease.quadOut)
            .call(function(){
                createjs.Tween.removeTweens(_oPlayerSquareContainer);
                oParent._onChangeColourAnimationFinished(iNewColour);                        
            });
    };
    
    this._onChangeColourAnimationFinished = function(iNewColour){
        _bChangingColour = false;
        _oPlayerSquareContainer.alpha = 1;
        _oPlayerSquareContainer.scaleX = _oPlayerSquareContainer.scaleY = SQUARE_SCALE_VAR;
        _iColour = iNewColour;
        _oSquareSprite.gotoAndStop(iNewColour);
        s_oGame.onPlayerSquareMoved();
    };

    this.moveSquareDown = function(){
        if (_bMoveVertically){
            return;
        };
        
        this._resetVerticalTweenSettings();
        _bMoveVertically = true;
    };

    this.moveSquareToNewColumn = function(iNewColumn){
        if (_bMoveHorizontally){
            return;
        };
       
        this._resetHorizontalTweenSettings(iNewColumn);                
        _iColumn = iNewColumn;
        _bMoveHorizontally = true;
    };
    
    this.updateValueTest = function(iValue) {
        _oValueText.text = iValue;
    };
    
    this.getGlobalY = function(){
        var oPosition = _oSquareSprite.globalToLocal(_oSquareSprite.x, _oSquareSprite.y);
        return oPosition.y + s_iOffsetY;
    };
    
    this.isLockedMovement = function(){
        // IF THE PLAYER SQUARE IS MOVING OR CHANGING COLOUR, CAN'T RECEIVE INPUTS
        var bLockedMovement = false;
        
        if (_bFallingDown || _bMoveHorizontally || _bMoveVertically || _bChangingColour ) {
            bLockedMovement = true;
        };
        
        return bLockedMovement;
    };
    
    this._resetHorizontalTweenSettings = function(iNewColumn){
        var iNewX = MATRIX_OFFSET_X + (SQUARE_SIZE + SQUARE_OFFSET) * iNewColumn;
        
        _iCntTimeX = 0;
        _iCurStartX = _oPlayerSquareContainer.x;
        _iFinishX = iNewX;
    };

    this._resetVerticalTweenSettings = function(){
        var iNextRowY = _oPlayerSquareContainer.y + SQUARE_SIZE + SQUARE_OFFSET;
        
        _iCntTimeY = 0;
        _iCurStartY = _oPlayerSquareContainer.y;
        _iFinishY = iNextRowY;
    };
    
    this.destroySquare = function(){
        createjs.Tween.get(_oPlayerSquareContainer)
            .to({alpha: 0}, 1000, createjs.Ease.backOut)
            .call(this.unload);
    };
    
    this.unload = function(){        
        _oMatrixContainer.removeChild(_oPlayerSquareContainer);
        createjs.Tween.removeTweens(_oSquareSprite);
    };

    this.update =  function(){
        if (!_bMoveHorizontally && !_bMoveVertically) {
            return;
        }
        
        // MOVE TO ANOTHER COLUMN
        if (_bMoveHorizontally) {
            _iCntTimeX += s_iTimeElaps;
        
            if ( _iCntTimeX >= _iMaxTimeX) {
                _bMoveHorizontally = false;
                s_oGame.onPlayerSquareMoved();
            } else {
                var fLerpX = s_oTweenController.easeOutCubic( _iCntTimeX, 0 ,1, _iMaxTimeX);
                var iValueX = s_oTweenController.tweenValue( _iCurStartX, _iFinishX, fLerpX);
                _oPlayerSquareContainer.x = iValueX;
            }
        }

        // MOVE DOWN TO NEXT ROW
        if (_bMoveVertically) {
            _iCntTimeY += s_iTimeElaps;
        
            if ( _iCntTimeY >= _iMaxTimeY) {
                _bMoveVertically = false;
                s_oGame.onPlayerSquareMoved();
            } else {
                var fLerpY = s_oTweenController.easeOutCubic( _iCntTimeY, 0 ,1, _iMaxTimeY);
                var iValueY = s_oTweenController.tweenValue( _iCurStartY, _iFinishY, fLerpY);
                _oPlayerSquareContainer.y = iValueY;
            }
        }
    };

    this._init();
};