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
            this._popper = null;
            this.element = element;
            this.config = this._getConfig(config);
            this.tip = null;

            this._setListeners();

            if (this.config.placement == 'cursor') {
                if (/hover/.exec(this.config.trigger)) {
                    $(this.element).on('mousemove.tooltip', this.config.selector, $.proxy(this.mousemove, this));
                }
            }

            if (this.config.zIndex) {
                $(this.getTipElement()).css('z-index', this.config.zIndex);
            }

            var me = this;
            Common.NotificationCenter.on({'layout:changed': function(e){
                if (!me.config.hideonclick && $(me.getTipElement()).is(':visible'))
                    me.hide();
            }});
        },

        mousemove: function (e) {
            this.mouse = {clientX: e.clientX*Common.Utils.zoom(), clientY: e.clientY*Common.Utils.zoom()};
        },

        _leave: function(event) {
            _superclass.prototype._leave.apply(this, arguments);
            this.dontShow = undefined;
            this.mouse = undefined;
        },

        show: function (at) {
            var me = this;

            if (this.isWithContent() && this._isEnabled && !this.dontShow) {

                if (!$(this.element).is(":visible") && $(this.element).closest('[role=menu]').length > 0) return;

                var tip = this.getTipElement();
                if (this.config.cls) $(tip).addClass(this.config.cls);

                var placementEx = (typeof this.config.placement !== 'function') ? /^([a-zA-Z]+)-?([a-zA-Z]*)$/.exec(this.config.placement) : null;
                if ((!at && placementEx && this.config.placement !== 'cursor') || (typeof this.config.placement === 'function')) {
                    _superclass.prototype.show.apply(this, arguments);
                } else {
                    var showEvent = $.Event(this.constructor.Event.SHOW);
                    $(this.element).trigger(showEvent);
                    if (showEvent.isDefaultPrevented()) {
                        return;
                    }
                    this.setContent();
                    if (this.config.animation) {
                        $(tip).addClass('fade');
                    }
                    var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;
                    if (placement !== 'cursor') {
                        var attachment = this._getAttachment(placement);
                        this.addAttachmentClass(attachment);
                    }
                    var container = this._getContainer();
                    $(tip).data(this.constructor.DATA_KEY, this);
                    if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
                        $(tip).appendTo(container);
                    }
                    $(this.element).trigger(this.constructor.Event.INSERTED);
                    if (placement === 'cursor') {
                        if (typeof at == "object") {
                            var innerWidth = Common.Utils.innerWidth(),
                                innerHeight = Common.Utils.innerHeight();
                            var tp = {left: at[0], top: at[1]};
                            if (tp.left + $(tip).width() > innerWidth) {
                                tp.left = at[0] - $(tip).width()/2 - 10;
                            } else {
                                tp.left = at[0] + $(tip).width()/2 + 18;
                            }
                            if (tp.top + $(tip).height() > innerHeight) {
                                tp.top = innerHeight - $(tip).height() - 30;
                            } else {
                                tp.top = at[1] + 15;
                            }
                        }
                        function generateGetBoundingClientRect (x, y) {
                            return function () {
                                return {
                                    top: y,
                                    right: x,
                                    bottom: y,
                                    left: x,
                                    width: 0,
                                    height: 0
                                }
                            };
                        }
                        var virtualElement = {
                            getBoundingClientRect: generateGetBoundingClientRect(),
                        };
                        this._popper = new Popper(virtualElement, tip, {
                            modifiers: {
                                offset: this._getOffset(),
                                arrow: {
                                    enabled: false
                                },
                                preventOverflow: {
                                    boundariesElement: this.config.boundary
                                }
                            },
                            onCreate: function onCreate() {
                                var x = tp.left;
                                var y = tp.top;
                                virtualElement.getBoundingClientRect = generateGetBoundingClientRect(x, y);
                                me.update();
                            }
                        });
                    }

                    $(tip).addClass('show');

                    if ('ontouchstart' in document.documentElement) {
                        $(document.body).children().on('mouseover', null, $.noop);
                    }

                    var prevHoverState = me._hoverState;
                    me._hoverState = null;
                    $(me.element).trigger(me.constructor.Event.SHOWN);

                    if (prevHoverState === 'out') {
                        me._leave(null, me);
                    }

                }
            }

            clearTimeout(me.timeout);
            me.timeout = setTimeout(function () {
                if (prevHoverState == 'show') me.hide();
                me.dontShow = false;
            }, 5000);
        },

        moveArrow: function () {
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
        },

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
