function CAreYouSurePanel() {
    var _oContainer;
    var _oButYes;
    var _oButNo;
    var _oFade;
    var _oPanelContainer;
    var _oParent;
    
    var _pStartPanelPos;

    this._init = function () {
        _oContainer = new createjs.Container();        
        s_oStage.addChild(_oContainer);

        _oPanelContainer = new createjs.Container();        
        s_oStage.addChild(_oPanelContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oFade.on("mousedown",function(){});
        _oContainer.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0.7},500);
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        var oPanel = createBitmap(oSprite);  
        oPanel.regX = oSprite.width/2;
        oPanel.regY = oSprite.height/2;
        oPanel.x = CANVAS_WIDTH_HALF;
        oPanel.y = CANVAS_HEIGHT_HALF;
        _oPanelContainer.addChild(oPanel);

        _oPanelContainer.y = CANVAS_HEIGHT + oSprite.height/2;  
        _pStartPanelPos = {x: _oPanelContainer.x, y: _oPanelContainer.y};
        createjs.Tween.get(_oPanelContainer).to({y:0},1000, createjs.Ease.backOut);

        var oTitle = new CTLText(_oPanelContainer, 
                    CANVAS_WIDTH/2-250, CANVAS_HEIGHT_HALF-160, 500, 150, 
                    36, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1,
                    0, 0,
                    TEXT_ARE_SURE,
                    true, true, true,
                    false );
  

        _oButYes = new CGfxButton(CANVAS_WIDTH_HALF + 195, 790, s_oSpriteLibrary.getSprite('but_yes'), _oPanelContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);

        _oButNo = new CGfxButton(CANVAS_WIDTH_HALF - 195, 790, s_oSpriteLibrary.getSprite('but_no'), _oPanelContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
    };

    this._onButYes = function () {
        _oButNo.disable();
        _oButYes.disable();
        
        createjs.Tween.get(_oFade).to({alpha:0},500);
        createjs.Tween.get(_oPanelContainer).to({y:_pStartPanelPos.y},400, createjs.Ease.backIn).call(function(){

            _oParent.unload();
            s_oGame.onExit();            
        }); 
    };

    this._onButNo = function () {
        _oButNo.disable();
        _oButYes.disable();
        
        createjs.Tween.get(_oFade).to({alpha:0},500);
        createjs.Tween.get(_oPanelContainer).to({y:_pStartPanelPos.y},400, createjs.Ease.backIn).call(function(){
            _oParent.unload();
        });         
    };

    this.unload = function () {
        _oButNo.unload();
        _oButYes.unload();
        s_oGame.setDisableEvents(false);
        s_oGame.setStartGame(true);
        
        _oContainer.removeChild(_oFade);
        s_oStage.removeChild(_oPanelContainer);
        _oFade.off("mousedown",function(){});
    };

    _oParent = this;
    this._init();
}

