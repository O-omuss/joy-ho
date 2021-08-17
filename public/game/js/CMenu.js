function CMenu() {
    var _oMenuContainer;
    var _oSquaresContainer;
    var _oBg;
    var _oGameLogo;
    var _oButPlay;
    var _oFade;
    var _oAudioToggle;
    var _oButCredits;
    var _oCreditsPanel = null;
    var _oButFullscreen;
    var _oBestScoreText;
    
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _pStartPosAudio;
    var _pStartPosCredits;
    var _pStartPosFullscreen;
    
    var _iCntTime;
    
    this._init = function () {
        //localStorage.clear();            // TO DELETE EVERYTHING SAVED IN LOCALSTORAGE
        _iCntTime = 0;
        
        _oMenuContainer = new createjs.Container();
        s_oStage.addChild(_oMenuContainer);
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        _oMenuContainer.addChild(_oBg);
        
        _oSquaresContainer = new createjs.Container();
        _oMenuContainer.addChild(_oSquaresContainer);

        var oGameLogo = s_oSpriteLibrary.getSprite('logo_menu');
        _oGameLogo = createBitmap(oGameLogo);
        _oGameLogo.regX = oGameLogo.width/2;
        _oGameLogo.regY = oGameLogo.height/2;
        _oGameLogo.x = CANVAS_WIDTH_HALF;
        _oGameLogo.y = -150;
        createjs.Tween.get(_oGameLogo, {loop: false}).to({y: CANVAS_HEIGHT_HALF - 100}, 1000, createjs.Ease.cubicOut);
        _oMenuContainer.addChild(_oGameLogo);

        _oBestScoreText = new CTLText(_oMenuContainer, 
                    CANVAS_WIDTH_HALF-250,  CANVAS_HEIGHT_HALF + 150, 500, 36, 
                    36, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false );


        var oSpritePlay = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CGfxButton((CANVAS_WIDTH_HALF), CANVAS_HEIGHT + 150, oSpritePlay, _oMenuContainer);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        createjs.Tween.get(_oButPlay.getSprite(), {loop: false}).to({y: CANVAS_HEIGHT_HALF + 350}, 1000, createjs.Ease.cubicOut);

        var oSprite = s_oSpriteLibrary.getSprite('but_credits');
        _pStartPosCredits = {x:20 + oSprite.width * 0.5,y:(oSprite.height * 0.5) + 10};
        _oButCredits = new CGfxButton(_pStartPosCredits.x, _pStartPosCredits.y, oSprite, _oMenuContainer);
        _oButCredits.addEventListener(ON_MOUSE_UP, this._onCredits, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - oSprite.width * 0.25 -20, y: (oSprite.height * 0.5) + 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive,_oMenuContainer);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x:_pStartPosCredits.x + oSprite.width/2 + 10,y:_pStartPosCredits.y};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,_oMenuContainer);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oMenuContainer.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            _oMenuContainer.removeChild(_oFade);
        });
        
        
        if(!s_bStorageAvailable){
            new CMsgBox(TEXT_ERR_LS,_oMenuContainer);
        }else{
            var iTotalScore = getItem("slidingbricks_total_score");
            if (iTotalScore !== null && iTotalScore !== undefined) {
                s_iTotalScore = Number(iTotalScore);
            } else {
                s_iTotalScore = 0;
            };
            
            var iBestScore = getItem("slidingbricks_best_score");
            if (iBestScore !== null && iBestScore !== undefined) {
                s_iBestScore = iBestScore;
                
            } else {
                s_iBestScore = 0;
                _oBestScoreText.refreshText(" ");
            };
            
            _oBestScoreText.refreshText(TEXT_BEST_SCORE + ": " + s_iBestScore);
        }
        
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };
    
    this._initBricks = function(){        
        var oData = {
            images: [s_oSpriteLibrary.getSprite('box')],
            frames: {width: SQUARE_SIZE, height: SQUARE_SIZE, regX: SQUARE_SIZE * 0.5, regY: SQUARE_SIZE * 0.5},
            animations: {idle: [0,4]}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        var oSquare = createSprite(oSpriteSheet, 'idle', SQUARE_SIZE * 0.5, SQUARE_SIZE * 0.5, SQUARE_SIZE, SQUARE_SIZE);
        oSquare.scaleX = oSquare.scaleY = Math.random()*(1.1-0.9)+0.9;  // RANDOM SCALE
        oSquare.x = 150 + (100 * Math.random()*SQUARE_LINE_NUMBER);     // RANDOM X START
        oSquare.y = -200;
        _oSquaresContainer.addChild(oSquare);
        
        // SET A RANDOM COLOUR
        var iColour = Math.floor(Math.random()*SQUARE_LINE_NUMBER);
        oSquare.gotoAndStop(iColour);
        
        // ADD A FALLING MOVEMENT
        var iRandomSpeed = Math.random()*(2500-1500)+1500;
        createjs.Tween.get(oSquare)
            .to({y: CANVAS_HEIGHT + 100}, iRandomSpeed, createjs.Ease.linear)
            .call(function(){
                createjs.Tween.removeTweens(oSquare);
                _oSquaresContainer.removeChild(oSquare);
            });
    };

    this.unload = function () {
        _oButPlay.unload();
        _oButPlay = null;

        _oButCredits.unload();
        
        _oMenuContainer.removeChild(_oBg);
        _oMenuContainer.removeChild(_oSquaresContainer);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        s_oMenu = null;
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, _pStartPosAudio.y + iNewY);
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }

        _oButCredits.setPosition(_pStartPosCredits.x + iNewX,_pStartPosCredits.y + iNewY);
    };
    
    this._onFullscreenRelease = function(){
	if(s_bFullscreen) { 
            _fCancelFullScreen.call(window.document);
	}else{
            _fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };

    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setActive(s_bFullscreen);
	}
    };
    
    this.exitFromCredits = function(){
        _oCreditsPanel = null;
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onCredits = function(){
        _oCreditsPanel = new CCreditsPanel();
    };

    this._onButPlayRelease = function () {
        this.unload();
        s_oMain.gotoGame();
    };
    
    this.update = function () {
        _iCntTime += s_iTimeElaps;
        
        // EVERY X MILLISECONDS, CREATE RANDOMLY FALLING BRICK SQUARES
        if (_iCntTime >= 700) {
            _iCntTime = 0;
            this._initBricks();
        }
    };
    
    s_oMenu = this;

    this._init();
}

var s_oMenu = null;