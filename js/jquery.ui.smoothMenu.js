/// <reference path="jquery-1.5.js" />
/*!
* smoothMenu addon for jQuery UI
* Copyright 2011, Masahiko Hirota
* license MIT-style License.
*
* Inspired by MenuMatic
* http://greengeckodesign.com/menumatic
*/
(function () {
	var isNumber = function (value) {
		return typeof value === "number" && isFinite(value);
	};

	$.widget("ui.smoothMenu", {

		widgetEventPrefix: "smoothMenu",

		_widgetDataPrefix: 'smoothMenu',

		options: {
			delay: 1000,
			duration: 300,
			easing: 'swing',
			//			direction: 'horizontal',
			defaultElement: 'ul',
			zIndex: 1
		},

		_create: function () {
			var self = this;
			var options = self.options;

			var $itemsContainer = self._getContainer();

			self.element.css({
				overflow: 'hidden',
				position: 'relative'
			});

			var $items = self.element.children('li');
			$items.each(function (index, item) {
				var $item = $(item);
				var $subMenu = $item.children(options.defaultElement + ':first');
				var height = $subMenu.outerHeight();
				var width = $subMenu.outerWidth();

				var $container = $('<div />').css({
					display: 'none',
					height: height + 'px',
					overflow: 'hidden',
					position: 'absolute',
					width: width + 'px',
					zIndex: options.zIndex
				}).bind('mouseenter.' + self.widgetEventPrefix, function () {
					$(this).data('isMouseOver.' + self._widgetDataPrefix, true);
				}).bind('mouseleave.' + self.widgetEventPrefix, function () {
					$(this).data('isMouseOver.' + self._widgetDataPrefix, false);
				}).appendTo($itemsContainer);
				$container.append($subMenu);

				$item.data('item.smoothMenu', $container);
				$subMenu.data('defaultCss.' + self._widgetDataPrefix, {
					'margin-top': $subMenu.css('margin-top'),
					opacity: $subMenu.css('opacity'),
					visibility: $subMenu.css('visibility')
				});
			}).bind('mouseenter.' + self.widgetEventPrefix, function () {
				var $elm = $(this);
				$elm.data('isMouseOver.' + self._widgetDataPrefix, true);
				self._show($elm);
			}).bind('mouseleave.' + self.widgetEventPrefix, function () {
				var $elm = $(this);
				$elm.data('isMouseOver.' + self._widgetDataPrefix, false);
				setTimeout(function () {
					var $container = $elm.data('item.' + self._widgetDataPrefix);
					var isMouseOnItem = $elm.data('isMouseOver.' + self._widgetDataPrefix);
					if (isMouseOnItem) {
						return;
					}

					var isMouseOnContainer = $container.data('isMouseOver.' + self._widgetDataPrefix);
					if (isMouseOnContainer) {
						$container.one('mouseleave', function () {
							self._hide($elm);
						});
					} else {
						self._hide($elm);
					}
				}, options.delay);
			});
			$items.each(function () {
				self._hide($(this), 0);
			});
		},

		destroy: function () {
			var self = this;
			var $items = self.element.children('li');
			$items.unbind('.' + self.widgetEventPrefix).each(function (index, item) {
				var $item = $(item);
				var $container = $item.data('item.smoothMenu');
				var $subMenu = $container.children(self.options.defaultElement);
				$subMenu.stop(true, true).css($subMenu.data('defaultCss.' + self._widgetDataPrefix));
				$item.append($subMenu);
				$container.remove();
			});

			var $itemsContainer = self._getContainer();
			if ($itemsContainer.is(':empty')) {
				$itemsContainer.remove();
			}
		},

		_getContainer: function () {
			var id = 'ui-smoothMenu-container';
			var $container = $('#' + id);
			if ($container.length === 0) {
				$container = $('<div />', {
					id: id
				}).appendTo(document.body);
			}
			return $container;
		},

		_show: function ($elm) {
			var self = this;
			var options = this.options;

			self._hide($elm.siblings(), 100);

			var offset = $elm.offset();
			var $container = $elm.data('item.smoothMenu');
			var $subMenu = $container.children(options.defaultElement);

			$container.show(0, function () {
				var height = $subMenu.outerHeight();
				var width = $subMenu.outerWidth();
				$container.css({
					height: String(height) + 'px',
					left: String(offset.left) + 'px',
					top: String(offset.top + $elm.height()) + 'px',
					width: String(width) + 'px'
				});
			});

			$subMenu.stop(true).animate({
				'margin-top': '0px',
				opacity: 0.95,
				visibility: 'visible'
			}, {
				duration: options.duration,
				easing: options.easing
			});
		},

		_hide: function ($elm, duration) {
			var self = this;
			var options = self.options;
			duration = isNumber(duration) ? duration : options.duration;

			var $container = $elm.data('item.' + self._widgetDataPrefix);
			var $subMenu = $container.children(options.defaultElement);

			$subMenu.stop(true).animate({
				'margin-top': String(-1 * $container.height()) + 'px',
				opacity: 0,
				visibility: 'hidden'
			}, {
				duration: duration,
				easing: options.easing,
				complete: function () {
					$container.hide();
				}
			});
		}

	});

	$.extend($.ui.smoothMenu, {
		version: "0.2.0"
	});

})();
