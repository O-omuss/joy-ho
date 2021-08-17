function CEndPanel(iScore){
    var _oContainer;
    var _oEndPanelContainer;
    var _oFade;
    var _oBg;
    var _oButExit;
    var _oButRestart;
    var _oMsgTextGameOver;
    var _oMsgTextFinalScore;
    var _oMsgTextFinalLines;
    
    var _iScore;
    
    var _pStartPosYContainer;
        
    this._init = function(){
        _iScore = iScore;
        
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        var oSpriteMsgBox = s_oSpriteLibrary.getSprite('msg_box_big');
        _oBg = createBitmap(oSpriteMsgBox);
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF;
        _oBg.regX = oSpriteMsgBox.width * 0.5;
        _oBg.regY = oSpriteMsgBox.height * 0.5;

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oFade.on("mousedown", function () {
        });
        s_oStage.addChild(_oFade);
        
        _oEndPanelContainer = new createjs.Container();        
        _oEndPanelContainer.addChild(_oBg);
        _oEndPanelContainer.y = CANVAS_HEIGHT;
        _oEndPanelContainer.on
        s_oStage.addChild(_oEndPanelContainer);
        
        _pStartPosYContainer = CANVAS_HEIGHT + oSpriteMsgBox.height/2; 
        
        _oMsgTextGameOver =  new CTLText(_oEndPanelContainer, 
                    CANVAS_WIDTH/2-250, CANVAS_HEIGHT_HALF-160, 500, 42, 
                    42, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_GAMEOVER,
                    true, true, false,
                    false );

        
        _oMsgTextFinalScore =  new CTLText(_oEndPanelContainer, 
                    CANVAS_WIDTH/2-250, CANVAS_HEIGHT_HALF-60, 500, 36, 
                    36, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_SCORE + ": " + _iScore,
                    true, true, false,
                    false );
 
        
        _oMsgTextFinalLines = new CTLText(_oEndPanelContainer, 
                    CANVAS_WIDTH/2-250, CANVAS_HEIGHT_HALF, 500, 36, 
                    36, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_BEST_SCORE + ": " + s_iBestScore,
                    true, true, false,
                    false );

        
        _oButExit = new CGfxButton(CANVAS_WIDTH_HALF - 200, 840, s_oSpriteLibrary.getSprite('but_home'), _oEndPanelContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);        
        
        _oButRestart = new CGfxButton(CANVAS_WIDTH_HALF + 200, 840, s_oSpriteLibrary.getSprite('but_restart'), _oEndPanelContainer);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        
        createjs.Tween.get(_oFade)
            .to({alpha: 0.7}, 1000, createjs.Ease.quadOut);
        createjs.Tween.get(_oEndPanelContainer)
            .to({y:0},1000, createjs.Ease.backOut)
            .call(function(){$(s_oMain).trigger("show_interlevel_ad");});            
    };
    
    this.unload = function(){
        _oButExit.unload(); 
        _oButRestart.unload();
        s_oStage.removeChild(_oFade);
        s_oStage.removeChild(_oContainer);
        s_oStage.removeChild(_oEndPanelContainer);
        s_oEndPanel = null;
    };
    
    this._onExit = function(){
        this.unload();
        s_oGame.onExit();
    };
    
    this._onRestart = function(){
        this.unload();
        s_oGame.restart();
    };
    
    s_oEndPanel = this;
    
    this._init();
}

var s_oEndPanel = null;