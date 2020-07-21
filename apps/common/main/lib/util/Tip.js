/*
 *
 * (c) Copyright Ascensio System SIA 2010-2019
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-12 Ernesta Birznieka-Upisha
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
*/
/* ===========================================================
 *
 * Extends bootstrap-tooltip.js
 *
 * =========================================================== */
/*
*   Configuration
*   =============
*
*   @cfg {String} trigger
*   Default value is 'hover focus'.
*   Describes how tooltip is triggered - click | hover | focus | manual. 
*   You may pass multiple triggers; separate them with a space
*
*   @cfg {String} title
*
*   @cfg {Boolean} arrow
*   Default value is 'false'.
*   If 'true', shows an arrow that point to the parent component.    
*
*   @cfg {String} placement
*   Default value is 'top'.
*   Describes tooltips position relatively of the parent component
*   acceptable values: 'top', 'bottom', 'right', 'left', 
*                        'top-right/left', 'bottom-right/left', 'cursor'
*   If placement = 'cursor', tooltip doesn't arrange position relatively 
*   of the parent and shows relatively of the cursor position.    
*
*   @cfg {String} cls
*   An extra CSS class that will be added to tooltip dom-element.
*
*   @cfg {Boolean} html
*   Default value is 'false'.
*   Insert HTML into the tooltip. If false, jQuery's text method will be used 
*   to insert content into the DOM
*
*
*   Events
*   ======
*    
*   @event show.bs.tooltip
*   @event shown.bs.tooltip
*   @event hide.bs.tooltip
*   @event hidden.bs.tooltip
*
*/

define([
    'jquery',
    'popper'
], function ($, Popper) {
    var _superclass = $.fn.tooltip;
    _superclass.prototype = $.fn.tooltip.Constructor.prototype;

    var Tip = function (element, options) {
        this.init(element, options);
    };

    Tip['VERSION'] = $.fn.tooltip.Constructor['VERSION'];
    Tip['Default'] = $.extend($.fn.tooltip.Constructor['Default'], {container: 'body', delay: {show:500}, arrow: false});
    Tip['NAME'] = $.fn.tooltip.Constructor['NAME'];
    Tip['DATA_KEY'] = $.fn.tooltip.Constructor['DATA_KEY'];
    Tip['Event'] = $.fn.tooltip.Constructor['Event'];
    Tip['EVENT_KEY'] = $.fn.tooltip.Constructor['EVENT_KEY'];
    Tip['DefaultType'] = $.fn.tooltip.Constructor['DefaultType'];

    Tip.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype,  {
        constructor: Tip,
        
        init: function(element, config) {
            this._isEnabled = true;
            this._timeout = 0;
            this._hoverState = '';
            this._activeTrigger = {};
            this._popper = null; // Protected
            this.element = element;
            this.config = this._getConfig(config);
            this.tip = null;

            this._setListeners();

            /*if (this.config.placement == 'cursor') {
                if (/hover/.exec(this.config.trigger)) {
                    $(this.element).on('mousemove.tooltip', this.config.selector, $.proxy(this.mousemove, this))
                }
            }*/

            if (this.config.zIndex) {
                $(this.getTipElement()).css('z-index', this.config.zIndex);
            }

            var me = this;
            Common.NotificationCenter.on({'layout:changed': function(e){
                if (!me.config.hideonclick && $(me.getTipElement()).is(':visible'))
                    me.hide();
            }});
        },

        /*mousemove: function (e) {
            this.mouse = {clientX: e.clientX*Common.Utils.zoom(), clientY: e.clientY*Common.Utils.zoom()};
        },*/

        _leave: function(obj) {
            _superclass.prototype._leave.apply(this, arguments);
            this.dontShow = undefined;
            this.mouse = undefined;
        },

        show: function (at) {
            var _this = this;

            if (this.isWithContent() && this._isEnabled && !this.dontShow) {

                if (!$(this.element).is(":visible") && $(this.element).closest('[role=menu]').length > 0) return;

                var placementEx = (typeof this.config.placement !== 'function') ? /^([a-zA-Z]+)-?([a-zA-Z]*)$/.exec(this.config.placement) : null;
                if (!at && placementEx && !placementEx[2].length && this.config.placement !== 'cursor' || typeof this.config.placement === 'function') {
                    _superclass.prototype.show.apply(this, arguments);
                } else {
                    var showEvent = $.Event(this.constructor.Event.SHOW);
                    $(this.element).trigger(showEvent);
                    if (showEvent.isDefaultPrevented()) {
                        return;
                    }
                    var tip = this.getTipElement();
                    this.setContent();
                    var placement = this.config.placement;
                    var container = this._getContainer();
                    $(tip).data(this.constructor.DATA_KEY, this);
                    if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
                        $(tip).appendTo(container);
                    }
                    $(this.element).trigger(this.constructor.Event.INSERTED);
                    if (placement === 'cursor') {
                        if (at) {
                            this.mouse = {clientX: at[0], clientY: at[1]};
                        } else if (!this.mouse) {
                            this.mouse = {clientX: 0, clientY: 0};
                        }
                        var ref = {
                            getBoundingClientRect: function getBoundingClientRect() {
                                return {
                                    top: _this.mouse.clientY,
                                    right: _this.mouse.clientX,
                                    bottom: _this.mouse.clientY,
                                    left: _this.mouse.clientX,
                                    width: 0,
                                    height: 0
                                };
                            }
                        };
                        this._popper = new Popper(ref, tip, {
                            onCreate: function onCreate(_ref) {
                                var instance = _ref.instance;
                                document.onmousemove = function (e) {
                                    var x = e.clientX * Common.Utils.zoom();
                                    var y = e.clientY * Common.Utils.zoom();

                                    _this.mouse = {clientX: x, clientY: y};
                                    instance.scheduleUpdate();
                                };
                            }
                        });
                    }

                    $(tip).addClass('show');

                    if ('ontouchstart' in document.documentElement) {
                        $(document.body).children().on('mouseover', null, $.noop);
                    }

                    var prevHoverState = _this._hoverState;
                    _this._hoverState = null;
                    $(_this.element).trigger(_this.constructor.Event.SHOWN);

                    if (prevHoverState === 'out') {
                        _this._leave(null, _this);
                    }

                }
            }


            clearTimeout(_this.timeout);
            _this.timeout = setTimeout(function () {
                if (_this.hoverState == 'in') _this.hide();
                _this.dontShow = false;
            }, 5000);

        },

        /*moveArrow: function () {
            var $arrow = this.tip().find(".tooltip-arrow, .arrow");
            var new_arrow_position = 10;
            switch (this.options.placement) {
            case 'top-left':
            case 'bottom-left':
                $arrow.css("left", new_arrow_position);
                break;
            case 'top-right':
            case 'bottom-right':
                $arrow.css("right", new_arrow_position);
                break;
          }
        },*/

        _enter: function(event, context) {
            if (event.type !== 'mouseenter') return;
            var $target = $(event.target);
            if ($target.is('[role=menu]') || $target.parentsUntil(event.currentTarget,'[role=menu]').length && event.target !== event.currentTarget || $(this.getTipElement()).is(':visible') ) {return;}

            var dataKey = this.constructor.DATA_KEY;
            context = context || $(event.currentTarget).data(dataKey);

            if (!context) {
                context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                $(event.currentTarget).data(dataKey, context);
            }

            if (event) {
                context._activeTrigger[event.type === 'focusin' ? 'focus' : 'hover'] = true;
            }

            if ($(context.getTipElement()).hasClass('show') || context._hoverState === 'show') {
                context._hoverState = 'show';
                return;
            }

            clearTimeout(context._timeout);
            context._hoverState = 'show';

            if (!context.config.delay || !context.config.delay.show) {
                context.show();
                return;
            }

            context._timeout = setTimeout(function () {
                if (context._hoverState === 'show') {
                    context.show(context.config.placement == 'cursor' && context.mouse ? [context.mouse.clientX, context.mouse.clientY] : undefined);
                }
            }, context.config.delay.show);
        }

        /*_getOffset: function (placement, pos, actualWidth, actualHeight) {
            var out = _superclass.prototype.getCalculatedOffset.apply(this, arguments);

            if (this.options.offset > 0 || this.options.offset < 0) {
                switch (/(bottom|top)/.exec(placement)[1]) {
                case 'bottom': out.top += this.options.offset; break;
                case 'top': out.top -= this.options.offset; break;
                }
            }

            return out;
        }*/
    });



 /* TOOLTIP EXTRA PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip;

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('bs.tooltip')
        , options = typeof option === 'object' && option;
      if (!data) { $this.data('bs.tooltip', (data = new Tip(this, options))); }
      if (typeof option === 'string') { data[option](); }
    });
  };

  $.fn.tooltip.Constructor = Tip;

  
 /* TOOLTIP EXTRA NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old;
    return this;
  };

});
