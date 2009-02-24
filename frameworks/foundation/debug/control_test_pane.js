// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: �2006-2009 Sprout Systems, Inc. and contributors.
//            portions copyright @2009 Apple, Inc.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

sc_require('views/pane');

SC.ControlTestPane = SC.Pane.extend({
  classNames: ['sc-control-test-pane'],
  layout: { right: 50, width: 480, top: 50, bottom: 50 },

  top:       0,
  height:    20,
  padding:   4,
  defaultLayout: { },  
  
  init: function() {
    sc_super();
    this.append(); // auto-add to screen
  }
});

SC.ControlTestPane.add = function(label, view, attrs) {
  if (attrs === undefined) attrs = {};
  if (!view.isDesign) view = view.design(attrs);

  // compute layout.
  var padding = this.prototype.padding, height = this.prototype.height;
  var top = this.prototype.top + padding, layout;
  
  this.prototype.top = top + height; // make room
  
  // calculate labelView and add it
  layout = { left: padding, width: 150, top: top, height: height };
  label = SC.LabelView.design({
    value: label + ':', layout: layout, textAlign: SC.ALIGN_RIGHT, fontWeight: SC.BOLD_WEIGHT 
  });
  this.childView(label);
  
  // now layout view itself...
  layout = view.prototype.hasOwnProperty('layout') ? view.prototype.layout : this.prototype.layout;
  layout = SC.clone(layout);
  layout.left = 150 + padding*2;
  layout.top = top ;
  layout.height = height;
  layout.right = padding ;
  view.layout(layout);
  this.childView(view);
  
  return this;
};
