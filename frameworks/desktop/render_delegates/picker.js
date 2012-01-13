// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('render_delegates/panel');

SC.BaseTheme.pickerRenderDelegate = SC.RenderDelegate.create({
  className: 'picker',

  render: function(dataSource, context) {
    var panelRenderDelegate,
        preferType,
        pointerType,
        pointerOffsetX,
        pointerOffsetY;

    panelRenderDelegate = dataSource.get('theme').panelRenderDelegate;
    panelRenderDelegate.render(dataSource, context);

    preferType = dataSource.get('preferType');
    if (preferType == SC.PICKER_POINTER || preferType == SC.PICKER_MENU_POINTER) {
      pointerType = dataSource.get('pointerPos');
      pointerOffsetX = dataSource.get('pointerPosX');
      pointerOffsetY = dataSource.get('pointerPosY');

      context.push('<div class="sc-pointer ' + pointerType +
          '" style="margin-top: ' + pointerOffsetY + 'px; margin-left: ' +
          pointerOffsetX + 'px;"></div>');

      context.addClass(pointerType);
    }
  },

  update: function(dataSource, $) {
    var el,
        panelRenderDelegate,
        preferType,
        pointerType,
        pointerOffsetX,
        pointerOffsetY;

    panelRenderDelegate = dataSource.get('theme').panelRenderDelegate;
    panelRenderDelegate.update(dataSource, $);

    preferType = dataSource.get('preferType');
    if (preferType == SC.PICKER_POINTER || preferType == SC.PICKER_MENU_POINTER) {
      pointerType = dataSource.get('pointerPos');
      pointerOffsetX = dataSource.get('pointerPosX');
      pointerOffsetY = dataSource.get('pointerPosY');

      el = $.find('.sc-pointer');
      el.attr('class', "sc-pointer " + pointerType);
      el.attr('style', "margin-left: " + pointerOffsetX + "px");
      el.attr('style', "margin-top: " + pointerOffsetY + "px");
      $.addClass(pointerType);
    }

  }
});
