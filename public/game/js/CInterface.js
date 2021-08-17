function CInterface() {
    var _oContainer;
    var _oAudioToggle;
    var _iBottomLinePos;
    
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosFullscreen;
    
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oButExit;   
    var _oBestScoreContainer;
    var _oBestScoreText;
    var _oBestScoreFrame;
    var _oAreYouSurePanel;

    this._init = function () {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        var oSpriteExit = s_oSpriteLibrary.getSprite('but_exit');        
        _pStartPosExit = {x: CANVAS_WIDTH - oSpriteExit.width/2 - 20, y: (oSpriteExit.height / 2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSpriteExit,_oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            
            _pStartPosAudio = {x: _pStartPosExit.x - oSpriteExit.width/2 - oSprite.width/4, y: _pStartPosExit.y};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive,_oContainer);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            _pStartPosFullscreen = {x:20 + oSprite.width/4,y:(oSprite.height / 2) + 10};
        }else{
            _pStartPosFullscreen = {x: _pStartPosExit.x - oSpriteExit.width - 10, y: _pStartPosExit.y};
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

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,_oContainer);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }

        this.refreshButtonPos();
    };
    
    this.initBestScoreText = function(){
        var iFrameWidth = 350;
        var iFrameHeight = 50;
        
        _oBestScoreContainer = new createjs.Container();
        _oContainer.addChild(_oBestScoreContainer);
        
        _oBestScoreFrame = new createjs.Shape();
        _oBestScoreFrame.graphics.beginFill("#222222").drawRoundRect(0, 0, iFrameWidth, iFrameHeight, 10);
        _oBestScoreFrame.regX = iFrameWidth * 0.5 - 6;
        _oBestScoreFrame.regY = iFrameHeight * 0.5 + 12;
        _oBestScoreFrame.alpha = 0.9;
        _oBestScoreContainer.addChild(_oBestScoreFrame);
        
        _oBestScoreText = new CTLText(_oBestScoreContainer, 
                    4,  -26, _oBestScoreFrame.regX, 32, 
                    32, "left", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_BEST_SCORE + " " + s_iBestScore,
                    true, true, false,
                    false );

        
        this.refreshButtonPos();
    };
    
    this.updateBestScoreText = function(){
        _oBestScoreText.refreshText(TEXT_BEST_SCORE + " " + s_iBestScore);
        this.refreshButtonPos();
    };
    
    this.refreshButtonPos = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - s_iOffsetX, _pStartPosAudio.y + s_iOffsetY);
        };
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + s_iOffsetX,_pStartPosFullscreen.y + s_iOffsetY);
        };
        
        _oButExit.setPosition(_pStartPosExit.x - s_iOffsetX, _pStartPosExit.y + s_iOffsetY);
        
        // REFRESH BOTTOM TEXTS POSITION
        _iBottomLinePos = CANVAS_HEIGHT - s_iOffsetY - 50;        
        
        if (_oBestScoreText !== undefined) { 
            _oBestScoreContainer.y = _iBottomLinePos;
        };        
    };    
    
    this.unload = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        
        _oButExit.unload();
        s_oInterface = null;
        s_oGame.setDisableEvents(false);
        s_oGame.setStartGame(true);
    };
    
    this._onExit = function () {
        if (s_oGame.isDisableEvents()) {
            return;
        };
        
        _oAreYouSurePanel = new CAreYouSurePanel(_oContainer);
        s_oGame.setDisableEvents(true);
        s_oGame.setStartGame(false);
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
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
    
    s_oInterface = this;

    this._init();

    return this;
}

var s_oInterface = null;