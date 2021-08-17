function CGame(oData) {
    var _bStartGame;
    var _bDisableEvents;
    var _bMotivationalTimerStart;
        
    var _iTotalScore;
    var _iLines;
    var _iScore;
    var _iColourChangeCounter;
    var _iMotivationalTextCntTime;

    var _oData;
    var _oGameContainer;
    var _oGameOverLine;
    var _oInterface;
    var _oEndPanel;
    var _oHelpPanel;  
    var _oSquareMatrix;
    var _oPlayerSquare;
    var _oMotivationalText;
    
    var _aSquareToRemove;
    
    this._init = function(){
        s_oTweenController = new CTweenController();
        
        _oGameContainer = new createjs.Container();
        s_oStage.addChild(_oGameContainer);        

        var oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        oBg.cache(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oGameContainer.addChild(oBg);
        
        this._resetVariables();
        this._initSquareMatrix();        
        this._initPlayerSquare();
        this._initGameOverLine();
        
        _oInterface = new CInterface();
        _oInterface.initBestScoreText();
        
        _oHelpPanel = CHelpPanel();

    };
    
    this._resetVariables = function(){
        _oEndPanel = null;
        _oMotivationalText = null;
        _bStartGame = false;
        _bDisableEvents = false;
        _bMotivationalTimerStart = false;
        
        _iLines = 0;
        _iScore = 0;
        _iMotivationalTextCntTime = 0;
        _iColourChangeCounter = 0;
        _iTotalScore = s_iTotalScore;
        
        _aSquareToRemove = new Array();
        
        setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
    };
    
    this._initSquareMatrix = function(){
        _oSquareMatrix = new CSquareMatrix(_oGameContainer);
        
        for (var i = 0; i < SQUARE_LINES_MINIMUM; i++) {
            this.createNewSquareLine();            
        };
    };
    
    this._initGameOverLine = function(){
        var iGameOverWidth = 900;
        var iGameOverThickness = 5;
        var iGameOverRoundness = 1;
        var iWallAlpha = 0.8;
        
        _oGameOverLine = new createjs.Shape();
        _oGameOverLine.graphics.beginFill("red");
        _oGameOverLine.graphics.drawRoundRect(0, 250, iGameOverWidth, iGameOverThickness, iGameOverRoundness);
        _oGameOverLine.graphics.endFill();
        _oGameOverLine.alpha = iWallAlpha;
        _oGameContainer.addChild(_oGameOverLine);
    };

    this.createNewSquareLine = function(){
        _oSquareMatrix.createSquareLine(_iLines);
        _iLines++;
    };
    
    this._getRandomColour = function(){
        return Math.floor(Math.random()*SQUARE_LINE_NUMBER);
    };
    
    this._initPlayerSquare = function(){
        var iPlayerColour = this._getRandomColour();        
        // CHECK THAT THE PLAYER COLOR IS NOT THE SAME AS THE SQUARE BELOW IT
        while (_oSquareMatrix.returnColumnColour(PLAYER_START_COLUMN) === iPlayerColour) {            
            iPlayerColour = this._getRandomColour();
        };
        
        _oPlayerSquare = new CPlayerSquare(_iLines, PLAYER_START_COLUMN, iPlayerColour, _oSquareMatrix.getContainer());        
    };

    this._checkForGameOver = function(){
        if (_oPlayerSquare.getGlobalY() < GAMEOVER_LIMIT) {
            return;
        }
        
        _bStartGame = false;
        _oSquareMatrix.setUpdate(false);
        _oPlayerSquare.destroySquare();
        this._gameOver();
        // top.window.location.replace("https://tingtingting.in/projects/joyville_game/form.php?"+_iScore);
        top.window.location.replace("http://localhost:8000/play/form?"+_iScore);
    };
    
    this.onClickedSquare = function(iColumn) {
        if (_bStartGame === false ||
            _oSquareMatrix.isUpdate() === false ||
            _oPlayerSquare.isLockedMovement() === true) {
            return;
        }
        
        _oPlayerSquare.moveSquareToNewColumn(iColumn);
    };
    
    this.onPlayerSquareMoved = function(){
        if (this._checkForSameColour() === false) {
            return;            
        }
        
        this._onSameColourFound();
    };
    
    this._onSameColourFound = function(){
        if (soundPlaying("destroy_row") === false) {
            playSound("destroy_row",1,false);
        }
        
        _oSquareMatrix.destroyTopRow();
        _oPlayerSquare.moveSquareDown();
        
        this._addScore();
        this._checkForMotivationalText();
        
        if (this._checkForSameColour() === false) {
            _iColourChangeCounter++;            
        }
        if (_iColourChangeCounter === COLOUR_CHANGE_OCCURRANCE) {
            _iColourChangeCounter = 0;
            this._changePlayerColour();
        }        
    };
    
    this.isDisableEvents = function(){
        return _bDisableEvents;
    };
    
    this.setDisableEvents = function(bValue){
        _bDisableEvents = bValue;
    };

    this._initMotivationalText = function(){
        if (_oMotivationalText !== null) {
            return;
        }
        if (soundPlaying("bonus") === false) {
            playSound("bonus",1,false);
        }
        _oMotivationalText = new CMotivationalText(_oGameContainer);
    };

    this.removeMotivationalText = function(){
        _oMotivationalText = null;
    };
    
    this._changePlayerColour = function(){
        var iNewColour = this._getRandomColour();        
        // CHECK THAT THE PLAYER COLOR IS NOT THE SAME AS THE SQUARE BELOW IT, AND IT'S NOT THE SAME COLOUR
        while (this._checkForSameColour() === true || iNewColour === _oPlayerSquare.getColour()) {
            iNewColour = this._getRandomColour();
        };
        
        if (soundPlaying("change_colour") === false) {
            playSound("change_colour",1,false);
        }
        _oPlayerSquare.changeColour(iNewColour);                
    };
    
    this._checkForMotivationalText = function(){
        // IF THE PLAYER MOVES VERY FAST, THIS WILL START A MOTIVATIONAL TEXT
        if (_bMotivationalTimerStart === false) {            
            _bMotivationalTimerStart = true;
        } else {
            if (_iMotivationalTextCntTime < MOTIVATIONAL_TIMER_LIMIT) {
                _bMotivationalTimerStart = false;
                this._initMotivationalText();
            };
            _iMotivationalTextCntTime = 0;
        }
    };
    
    this._checkForSameColour = function(){
        var iPlayerColumn = _oPlayerSquare.getColumn();
        
        // IF THE PLAYER COLOUR IS THE SAME OF THE TOP ROW IN ITS COLUMN
        if ( _oSquareMatrix.returnColumnColour(iPlayerColumn) === _oPlayerSquare.getColour() ) {            
            return true;
        } else {
            return false;
        }
    };

    this._addScore = function(){
        _iScore++;
        _oPlayerSquare.updateValueTest(_iScore);
    };
    
    this.unload = function(){
        _oSquareMatrix.unload();
        _oInterface.unload();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
        s_oGame = null;
    };
    
    this.onExit = function(){
        setVolume("soundtrack", 1);
        s_oGame.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("show_interlevel_ad");
    };

    this.restart = function(){
        setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
        $(s_oMain).trigger("restart_level");
        _oSquareMatrix.unload();
        this._resetVariables();
        _oInterface.updateBestScoreText();
        this._initSquareMatrix();
        this._initPlayerSquare();
        this._onExitHelp();
    };

    this._onExitHelp = function(){
        _bStartGame = true;
        _bDisableEvents = false;
        _oPlayerSquare.startTween();
    };
    
    this.startMatrixMovement = function(){
        _oSquareMatrix.setSquareMatrixUpdate(true);
    };
    
    this._updateScore = function(){
        // UPDATE TOTAL SCORE
        _iTotalScore += _iScore;
        s_iTotalScore = _iTotalScore;
        saveItem("slidingbricks_total_score", _iScore);

        
    };

    this._gameOver = function(){
        _bStartGame = false;        

        if (_oEndPanel === null) {
            this._updateScore();
            
            playSound("game_over",1,false);
            stopSound("soundtrack");
            
            setTimeout(function(){ playSound("soundtrack",0.5,false); }, 3000);
            
            _oEndPanel = new CEndPanel(_iScore);
            _bDisableEvents = true;
            
            // UPDATE BEST SCORE
            if (_iScore > s_iBestScore) {
                s_iBestScore = _iScore;
                saveItem("slidingbricks_best_score", s_iBestScore);
                $(s_oMain).trigger("save_score", _iScore);
            }
            $(s_oMain).trigger("share_event", _iScore);
            
        }
    };
    
    this.setStartGame = function(bValue){
        _bStartGame = bValue;
    };
    
    this.update = function(){
        _oGameOverLine.y = s_iOffsetY + GAMEOVER_LINE_DIFFERENCE;

        if (!_bStartGame) {
            return;
        }

        // A TIMER TO CHECK IF A MOTIVATIONAL TEXT IS NEEDED
        if (_bMotivationalTimerStart) {
            _iMotivationalTextCntTime += s_iTimeElaps;
        }

        // IF THE PLAYER IS ON THE BOTTOM OF THE SCREEN, ACCELLERATE THE MATRIX MOVEMENT TO AVOID VISUALIZATION PROBLEMS
        _oSquareMatrix.setAccellerate(false);
        if (_oPlayerSquare.getGlobalY() < PLAYER_BOTTOM_LIMIT + s_iOffsetY) {
            _oSquareMatrix.setAccellerate(true);
        }
        
        // UPDATE MOVEMENTS FOR MATRIX AND PLAYER
        _oSquareMatrix.update();
        _oPlayerSquare.update();
        
        // IF THE PLAYER GOES ON THE TOP OF THE SCREEN, IT'S GAME OVER
        if (_oSquareMatrix.isUpdate() === true) {
            this._checkForGameOver();
        }
    };

    s_oGame = this;

    _oData = oData;
    MATRIX_VERTICAL_SPEED = oData.matrix_vertical_speed;
    MATRIX_SPEED_VARIABLE = oData.matrix_speed_variable;
    MAX_MATRIX_SPEED_LIMIT = oData.max_matrix_speed_limit;
    COLOUR_CHANGE_OCCURRANCE = oData.colour_change_occurance;
    
    this._init();
}

var s_oGame;
var s_oTweenController;