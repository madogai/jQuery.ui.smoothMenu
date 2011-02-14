SmoothMenu addon for jQuery UI
===

License
---

Copyright 2011, まどがい  
MIT-style License.

Inspired by MenuMatic  
<http://greengeckodesign.com/menumatic>

Description
---

MooToolsのMenuMaticに近い動きを実装したjQueryPluginです。

以下のような機能を実装しています。

* 階層メニュー
* 縦置き、および横置きメニュー
* ThemeRoller
* Enable, Disable, Destroy

Demo
---
<http://madguy.github.com/jQuery.ui.smoothMenu/>

Required
---

* jQuery v1.4.x or heigher
* jQuery UI v1.8.x or heigher
	* jquery.ui.core.js
	* jquery.ui.widget.js

Usage
---

*HTML*
	<ul id="root">
		<li>
			<a href="#">MenuItem1</a>
			<ul>
				<li>
					<a href="#">Item1</a>
					<ul>
						<li><a href="#">SubItem1</a></li>
						<li><a href="#">SubItem2</a></li>
					</ul>
				</li>
				<li><a href="#">Item2</a></li>
			</ul>
		</li>
		<li><a href="#">MenuItem2</a></li>
	</ul>

*JavaScript*
	$('#root > li').smoothMenu();

Options
---

Name|Type|Default|Description
---|---|---|---
childTag|String|'li'|リストの要素タグを指定します。
delay|Number|1000|マウスが要素から離れてから要素が消えるまでの時間です。(ミリ秒)
direction|String|'horizontal'|初期のリストの開く方向を指定します。horizontal or vertical
dockId|String|'ui_smooth_menu_container'|SmoothMenuを保持するコンテナエレメントのId指定です。
duration|Number|200|要素が開くまでにかかる時間です。(ミリ秒)
easing|String|'swing'|開閉アニメーションのeasingを指定します。
icon|Boolean|true|アイコン表示の有無を指定します。
opacity|Number|0.95|要素が開かれた時の透明度を指定します。
parentTag|String|'ul'|リストのルート要素タグを指定します。
zIndex|Number|1|ウィジェットのz-index指定です。子要素になるたびに1ずつ増加します。

Method
---

Name|Usage|Description
---|---|---
destroy|.smoothMenu('destroy')|ウィジェットを削除して初期状態に戻します。
disable|.smoothMenu('disable')|ウィジェットを無効化します。
content|.smoothMenu('content')|ウィジェットに紐づいている要素リストを取得します。
enable|.smoothMenu('enable')|ウィジェットを有効化します。
hide|.smoothMenu('hide', [duration])|ウィジェットを表示します。durationにより非表示速度を指定できます。
option|.smoothMenu('option' , optionName , [value])|オプション名を指定して、オプションの取得/設定を行います。
option|.smoothMenu('option' , options)|オプションを一括して設定します。
rootContainer|.smoothMenu('rootContainer')|ウィジェットを格納しているコンテナ要素を取得します。
show|.smoothMenu('show', [duration])|ウィジェットを表示します。durationにより表示速度を指定できます。
widget|.smoothMenu('widget')|ウィジェット自身を取得します。

Event
---

Name|Type|Description
---|---|---
create|smoothmenucreate|ウィジェットの作成時に発生するイベントです。
beforeShow|smoothmenubeforeshow|リストが開かれる前に発生するイベントです。event.preventDefault()を呼ぶか、falseをreturnすると動作を中断できます。
onShow|smoothmenuonshow|リストが開かれた後に発生するイベントです。
beforeHide|smoothmenubeforehide|リストが閉じられる前に発生するイベントです。event.preventDefault()を呼ぶか、falseをreturnすると動作を中断できます。
onHide|smoothmenuberonhide|リストが閉じられた後に発生するイベントです。

Advertisement
---

作者は以下のサイトを運営しています。よければご覧ください。

*ToNaMeT*  
<http://www.tonamet.com>
