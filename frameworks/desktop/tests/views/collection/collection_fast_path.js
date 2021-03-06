// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            portions copyright @2011 Apple Inc.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var view, exampleView;

module("SC.CollectionFastPath", {
  setup: function() {

    SC.run(function () {
      view = SC.CollectionView.create({
        content: "a b c d e f".w().map(function(x) {
          return SC.Object.create({ title: x });
        }),
        // STUB: reloadIfNeeded
        reloadIfNeeded: CoreTest.stub('reloadIfNeeded', SC.CollectionView.prototype.reloadIfNeeded)
      });
    });

    exampleView = SC.View.extend({});

  },

  teardown: function() {
    view.destroy();
    view = exampleView = null;
  }
});


/**
  There was a bug that if you called itemViewForContentIndex() on a Collection
  with SC.CollectionFastPath mixed in BEFORE it was visible, it would throw an
  exception (because this._mapView wasn't initialized properly in
  CollectionFastPath).
*/
test("Calling itemViewForContentIndex() before the Collection is visible.", function() {
  try {
    var itemView = view.itemViewForContentIndex(0);
    ok(true, 'Requesting itemViewForContentIndex() should not throw an exception prior to reloadIfNeeded being called.');

    view.reloadIfNeeded.expect(0);
  } catch (ex) {
    ok(false, 'Requesting itemViewForContentIndex() should not throw an exception prior to reloadIfNeeded being called.');
  }

  // The next test just shows how that when isVisibleInWindow changes, causing
  // reloadIfNeeded to be called, then the request would succeed.
  try {
    SC.run(function () {
      view.createLayer();
      view._doAttach(document.body);
    });

    view.reloadIfNeeded.expect(1);
    itemView = view.itemViewForContentIndex(0);
    ok(true, 'Requesting itemViewForContentIndex() should not throw an exception after reloadIfNeeded being called.');
  } catch (ex) {
    ok(false, 'Requesting itemViewForContentIndex() should not throw an exception after reloadIfNeeded being called.');
  }
});
