function CSquareMatrix(oGameContainer){
    var _oMatrixContainer;

    var _iCurStartY;
    var _iCntTime;
    var _iMaxTime;
    var _bUpdate;
    var _iFinishY;
    var _iMovementSpeed;
    
    var _aSquareMatrix;
    
    var _bAccellerate;

    this._init = function(){
        _oMatrixContainer = new createjs.Container();
        oGameContainer.addChild(_oMatrixContainer);
        _bAccellerate = false;
        
        _aSquareMatrix = new Array;
        
        _iMaxTime = MATRIX_VERTICAL_SPEED;
        _iMovementSpeed = _iMaxTime;
        this.resetTweenSettings();
    };
    
    this.resetTweenSettings = function(){
        _iCntTime = 0;
        _iCurStartY = _oMatrixContainer.y;
        _iFinishY = _oMatrixContainer.y - 100;
    };
    
    this.setSquareMatrixUpdate = function(bValue) {
        _bUpdate = bValue;
    };
    
    this.createSquareLine = function(iLines){
        // SHUFFLE THE SQUARES LINE, AND ADD IT TO THE MATRIX
        var aColours = [0,1,2,3,4];
        shuffle(aColours);
        
        var aSquareRow = [];
        
        // CREATE A LINE OF SQUARES, EACH OF ONE COLOUR
        for (var i = 0; i < SQUARE_LINE_NUMBER; i++) {
            var iColumn = i;
            var oSquare = new CSquare(iLines, iColumn, aColours[i], _oMatrixContainer);
            aSquareRow.push(oSquare);
        }

        _aSquareMatrix.push(aSquareRow);
    };
    
    this.getSquareMatrix = function(){
        return _aSquareMatrix;
    };
    
    this.getContainer = function(){
        return _oMatrixContainer;
    };
    
    this.returnColumnColour = function(iColumn) {        
        var iColour = _aSquareMatrix[0][iColumn].getColour();
        return iColour;        
    };
    
    this.destroyTopRow = function(){
        for (var i = 0; i < SQUARE_LINE_NUMBER; i++) {
            _aSquareMatrix[0][i].destroySquare();
        };
        
        // REMOVE FROM THE ARRAY
        _aSquareMatrix.splice(0, 1);
        
        if (_aSquareMatrix.length < SQUARE_LINES_MINIMUM) {
            s_oGame.createNewSquareLine();
        }
    };
    
    this.unload = function(){
        // UNLOAD ALL LINES
        for (var i = 0; i < _aSquareMatrix.length; i++) {            
            for (var j = 0; j < _aSquareMatrix[i].length; j++) {
                _aSquareMatrix[i][j].unload();
            };
            _aSquareMatrix.splice(i, 1);
        };
        
        _oMatrixContainer.removeAllChildren();
    };
    
    this.getY = function(){
        return _oMatrixContainer.y;
    };
    
    this.resetMovement = function(){
        this.resetTweenSettings();
        
        // ACCELLERATE
        _iMaxTime -= MATRIX_SPEED_VARIABLE;        
        if (_iMaxTime < MAX_MATRIX_SPEED_LIMIT) {
            _iMaxTime = MAX_MATRIX_SPEED_LIMIT;
        }
        
        if (_bAccellerate) {
            _iMovementSpeed = MAX_MATRIX_SPEED_LIMIT/4;
        } else {
            _iMovementSpeed = _iMaxTime;
        }

        _bUpdate = true;        
    };
    
    this.setAccellerate = function(bValue){
        _bAccellerate = bValue;
    };
    
    this.setUpdate = function(bValue){
        _bUpdate = bValue;
    };
    
    this.isUpdate = function(){
        return _bUpdate;
    };
   
    this.update = function(){
        if (!_bUpdate) {
            return;
        };
        
        _iCntTime += s_iTimeElaps;

        if (_iCntTime >= _iMovementSpeed){
            _bUpdate = false;
            this.resetMovement();
        } else {
            var fLerpY = s_oTweenController.easeLinear(_iCntTime, 0, 1, _iMovementSpeed);
            var iValue = s_oTweenController.tweenValue(_iCurStartY, _iFinishY, fLerpY);
            _oMatrixContainer.y = iValue;
        }
    };
    
    this._init();
};