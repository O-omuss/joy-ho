function CMotivationalText(oGameContainer){
    var _oGameContainer;
    var _oTextContainer;
    var _oText;
    
    var _aTexts;
    
    this._init = function(){
        _oGameContainer = oGameContainer;
        _oTextContainer = new createjs.Container();
        _oGameContainer.addChild(_oTextContainer);
        
        var iStartX = -250;
        var iStartY = CANVAS_HEIGHT_HALF - 200;
        
        // SELECT A RANDOM TEXT
        _aTexts = [TEXT_MOTIVATIONAL_1,TEXT_MOTIVATIONAL_2,TEXT_MOTIVATIONAL_3,
                   TEXT_MOTIVATIONAL_4,TEXT_MOTIVATIONAL_5,TEXT_MOTIVATIONAL_6,
                   TEXT_MOTIVATIONAL_7,TEXT_MOTIVATIONAL_8,TEXT_MOTIVATIONAL_9];
        var szText = _aTexts[Math.floor(Math.random()*_aTexts.length)]; 
        
        _oText = new CTLText(_oTextContainer, 
                    iStartX-250,  iStartY, 500, 70, 
                    70, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1,
                    0, 0,
                    szText,
                    true, true, false,
                    false );
                    
        
        this._initMovementTween();
    };
    
    this._initMovementTween = function(){
        var oParent = this;        
        
        createjs.Tween.get(_oTextContainer)
            .to({x: 650}, MOTIVATIONAL_TEXT_SPEED * 0.5, createjs.Ease.quintIn)
            .call(function(){
                oParent._initPulseTween();                
            });
    };
    
    this._initPulseTween = function(){
        var oParent = this;
        var iScaleVar = 1.2;
        
        createjs.Tween.get(_oText)
            .to({scaleX: iScaleVar, scaleY: iScaleVar}, MOTIVATIONAL_TEXT_PULSE_TIME, createjs.Ease.cubicIn)
            .to({scaleX: 1, scaleY: 1}, MOTIVATIONAL_TEXT_PULSE_TIME, createjs.Ease.cubicIn)
            .to({scaleX: iScaleVar, scaleY: iScaleVar}, MOTIVATIONAL_TEXT_PULSE_TIME, createjs.Ease.cubicIn)
            .to({scaleX: 1, scaleY: 1}, MOTIVATIONAL_TEXT_PULSE_TIME, createjs.Ease.cubicIn)
            .call(function(){
                oParent._initExitTween();                
            });
    };

    this._initExitTween = function(){
        var oParent = this;        
        
        createjs.Tween.get(_oTextContainer)
            .to({x: 1300}, MOTIVATIONAL_TEXT_SPEED, createjs.Ease.quintOut)
            .call(function(){
                oParent.unload();
            });
    };
    
    this.unload = function(){
        s_oGame.removeMotivationalText();
        createjs.Tween.removeTweens(_oTextContainer);
        _oGameContainer.removeChild(_oTextContainer);
    };
    
    this._init();
};