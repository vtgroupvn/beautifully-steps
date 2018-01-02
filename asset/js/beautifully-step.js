// JavaScript Document
(function($){
	function checkBrowser(){
		var c = navigator.userAgent.search("Chrome");
		var f = navigator.userAgent.search("Firefox");
		var m8 = navigator.userAgent.search("MSIE 8.0");
		var m9 = navigator.userAgent.search("MSIE 9.0");
		if (c > -1) {
			var browser = "Chrome";
		} else if (f > -1) {
			var browser = "Firefox";
		} else if (m9 > -1) {
			var browser ="MSIE 9.0";
		} else if (m8 > -1) {
			var browser ="MSIE 8.0";
		}
		return browser;
	}
	jQuery.fn.beautifully_steps = function(fn_options){
		if (typeof this == undefined){
			return null;
		}else{
			jQuery(this).attr('id', 'beautifully-steps');
		}
		var self = this;
		self.options = jQuery.extend({
			processbar_bg_width  : '100%',
			processbar_bg_height : '30px',
			processbar_extra_style : {		
				'margin': 'auto',
				'margin-top': '200px',
				'border': '1px solid #2C3D82',
				'border-radius': '60%',
				'-webkit-box-shadow': '0px 0px 5px -1px #2C3D82',
				'-moz-box-shadow':    '0px 0px 5px -1px #2C3D82',
				'box-shadow':         '0px 0px 5px -1px #2C3D82',
				'-webkit-border-radius': '6px',
				'-moz-border-radius': '6px',
			},
			steps : [
				{step: 1, text: 'step1', description: 'step1'},
				{step: 2, text: 'step2', description: 'step1'},
				{step: 3, text: 'step3', description: 'step1'},
				{step: 4, text: 'step4', description: 'step1'},
				{step: 5, text: 'step5', description: 'step1'}
			],
			step_style : {
				'display': 'inline-block',
				'background': '#2C3D82',
				'text-align': 'center',
				'font-size': '14px',
				'color': 'yellow',
				'line-height': '10px',
				'cursor': 'pointer'
			},
			main_color: '#2C3D82',
			animate_update_step: false,
			step_description_hint: false
		}, fn_options);
		if (checkBrowser() == 'Firefox'){
			self.subTop = 137;
		}else{
			self.subTop = 137;
		}
		self.compile = function(){
			//Create HTML for init
			var bar_bg = jQuery('<div />');
			bar_bg.css(self.options.processbar_extra_style);
			/*if (self.options.processbar_bg_width == '100%'){
				bar_bg.width(jQuery(self).parent().outerWidth() + 3);
			}else{
				bar_bg.width(self.options.processbar_bg_width + 3);
			}*/
			bar_bg.width(self.options.processbar_bg_width);
			bar_bg.height(self.options.processbar_bg_height+'px');
			self.total_step = self.options.steps.length;
			self.step_div = new Array();
			for(var n = 0; n < self.options.steps.length; n++){
				self.step_div[n] = jQuery('<div />');
				self.step_div[n].css({
					'float': 'left',
					'display': 'inline-block',
					'position': 'relative',
					'height': self.options.processbar_bg_height,
					'width': Math.round(100/self.options.steps.length)+'%'
				});
				var circle = jQuery('<span />');
				circle.attr('class', 'step-circle');
				circle.html('&nbsp');
				var circle_height = (self.options.processbar_bg_height+5);
				circle.css({
					'background': self.options.main_color,
					'border-radius': '60%',
					'-webkit-box-shadow': '0px 0px 5px -1px '+self.options.main_color,
					'-moz-box-shadow':    '0px 0px 5px -1px '+self.options.main_color,
					'box-shadow':         '0px 0px 5px -1px '+self.options.main_color,
					'-webkit-border-radius': '6px',
					'-moz-border-radius': '6px',
					'height': circle_height+'px',
					'width': circle_height+'px',
					'display': 'inline-block',
					'position': 'relative',
					'top': '-'+((circle_height/2)-1)+'px',
					'clear': 'both',
					'border': '2px solid '+self.options.main_color
				});
				self.step_div[n].append(circle);
				self.step_div[n].append('<br />');
				var step_text = jQuery('<span />');
				step_text.attr('class', 'step-text');
				step_text.html(self.options.steps[n].text);
				step_text.css({
					'text-align': 'center',
					'position': 'relative',
					'top': '-'+(self.options.processbar_bg_height+30)+'px',
					'color': self.options.main_color
				});				
				self.step_div[n].append(step_text);
				bar_bg.append(self.step_div[n]);
			};
			jQuery(self).append(bar_bg);
			for(var n = 0; n <= self.options.steps.length-1; n++){
				self.step_div[n].css(self.options.step_style);
				self.step_div[n].css({'display':'none'});
			}
		};
		self.active_step = function(step_number){
			if (step_number < 0 || step_number > self.step_div.length){
				return;
			}
			for(var n = 0; n <= self.step_div.length-1; n++){
				self.step_div[n].css({'display':'none'});
			}
			for(var n = 0; n < step_number; n++){
				self.step_div[n].css(self.options.step_style);
				self.step_div[n].find('span.step-circle').css({'background':self.options.main_color});
			}
			if (step_number <= self.step_div.length){
				self.removeHintNotes();
				self.step_div[step_number-1].hide();
				self.step_div[step_number-1].find('span.step-circle').css({'background':'#FFF'});
				if (self.options.animate_update_step){
					self.step_div[n-1].animate({
						width: "toggle"
					}, 500, function() {
						if (self.options.step_description_hint){
							for(var n = 0; n < step_number; n++){
								self.addHintNote('hint-box-'+n, self.options.steps[n].description, self.step_div[n], n);
							}
							self.createHintNotes();
						}
					});
				}else{
					self.step_div[step_number-1].show();
					if (self.options.step_description_hint){
						for(var n = 0; n < step_number; n++){
							self.addHintNote('hint-box-'+n, self.options.steps[n].description, self.step_div[n]);
						}
						self.createHintNotes();
					}
				}
			}
		};
		
		self.addHintNote = function(key, text, mainItem, count)
		{
			if (!(mainItem instanceof jQuery)){
				mainItem = jQuery(mainItem);
			}
			self.hint_notes[count] = {
				'key': key,
				'text': text,
				'mainItem': mainItem
			};
		}
		self.createHintNotes = function()
		{
			if (typeof self['hint_notes'] != undefined){
				if (self.hint_notes.length > 0){	
					for(n = 0; n < self.hint_notes.length; n++){
						if (self.hint_notes[n].mainItem instanceof jQuery && self.hint_notes[n].mainItem.length > 0){
							var _box_note = jQuery('<div />');
							_box_note.attr('id', 'hint-note-'+self.hint_notes[n].key);
							_box_note.attr('class', 'hint-note-bar');
							_box_note.css({
								'display': 'none',
								'position': 'absolute',
								'width': 'auto',
								'height': 'auto',
								'-webkit-box-shadow': '0px 0px 8px -1px '+self.options.main_color,
								'-moz-box-shadow':    '0px 0px 8px -1px '+self.options.main_color,
								'box-shadow':         '0px 0px 8px -1px '+self.options.main_color,
								'-webkit-border-radius': '4px',
								'-moz-border-radius': '4px',
								'background': '#EEEEEE',
								'border-radius': '4px!important',
								'border': '1px solid '+self.options.main_color,
								'text-align': 'center',
								'border-radius': '10px',
								'padding': '10px 20px',
								'z-index': '9999',
								'color': self.options.main_color
							});
							var _box_header = jQuery('<span class="icon-hint-arrow-down"/>');
							_box_header.css({
								'border-color': 'transparent',
								'border-top-color': self.options.main_color,
								'border-style': 'dashed dashed solid',
								'border-width': '25.5px 25.5px',
								'display': 'block',
								'position': 'absolute',							
								'top': '88px',
								'z-index': '99',
								'height': '10px',
								'-webkit-animation': 'gb__a .2s',
								'animation': 'gb__a .2s',
								'background': 'transparent'
							});
							var _box_header_child = jQuery('<span class="icon-hint-arrow-down-hide" />');
							_box_header_child.css({
								'background': 'transparent',
								'border-color': 'transparent',
								'border-top-color': '#EEEEEE',
								'border-style': 'dashed dashed solid',
								'border-width': '20.5px 24.5px',
								'display': 'block',
								'position': 'absolute',
								'left': '-24px',
								'top': '-26px',
								'z-index': '1',
								'height': '0',
								'width': '0',
								'-webkit-animation': 'gb__a .2s',
								'animation': 'gb__a .2s'
							});
							if (checkBrowser() == 'Firefox'){
								_box_header.css({
									'top': '91px'								
								});
								_box_header_child.css({
									'border-width':'20.5px 25.5px',
									'left': '-25px',
								});
							}
							_box_header.append(_box_header_child);
							var _box_conteiner = jQuery('<div/>');
							_box_conteiner.css({
								'margin': 'auto',
								'text-align': 'center',
								'padding': '25px'
							});		
							_box_conteiner.html(self.hint_notes[n].text);
							_box_note.append(_box_header);
							_box_note.append(_box_conteiner);
							jQuery('body').append(_box_note);
							_box_note.css({
								'left': self.hint_notes[n].mainItem.offset().left + self.step_div[n].innerWidth()/2-_box_note.width()/2-22,
								'top': self.hint_notes[n].mainItem.offset().top  - self.subTop
							});
							if (checkBrowser() == 'Firefox'){
								_box_header.css({
									'left': _box_note.width()/2-4
								});
							}else{
								_box_header.css({
									'left': _box_note.width()/2-5
								});
							}
							self.hint_notes[n].mainItem.data('current_hint_note', _box_note);
							self.hint_notes[n].mainItem[0].addEventListener("mouseenter",function(e){
								jQuery('div.hint-note-bar').css({'display':'none'});
								jQuery(this).data('current_hint_note').show();
							});
							jQuery(window).click(function(e){
								if (jQuery(e.target).parents('div.hint-note-bar').length == 0){
									jQuery('div.hint-note-bar').css({'display':'none'});
								}
							});
							jQuery(window).scroll(function(){
								jQuery('div.hint-note-bar').css({'display':'none'});
							});
							jQuery(window).resize(function(){
								self.resizeHintPosition();
							});
						}
					}
				}
			}
		};
		self.removeHintNotes = function(){
			if (self['hint_notes'] != undefined){
				if (self.hint_notes.length > 0){
					for(n = 0; n < self.hint_notes.length; n++){
						if (jQuery('#hint-note-'+self.hint_notes[n].key).length > 0){
							jQuery('#hint-note-'+self.hint_notes[n].key).remove();
							self.hint_notes[n].mainItem
								.unbind("mouseenter")
								.unbind("mouseleave")
								.data('current_hint_note', null);
						}
					}
					delete self['hint_notes'];
				}
			}
			self.hint_notes = new Array();
		};
		self.resizeHintPosition = function(){
			if (self['hint_notes'] != undefined){
				for(n = 0; n < self.hint_notes.length; n++){
					var _box_note = jQuery('#hint-note-'+self.hint_notes[n].key);
					_box_note.css({
						'left': self.hint_notes[n].mainItem.offset().left + self.step_div[n].innerWidth()/2-_box_note.width()/2-25,
						'top': self.hint_notes[n].mainItem.offset().top  - self.subTop
					});
				}
			}
		};
		self.showHintStep = function(n){
			if (self['hint_notes'] != undefined){
				if (self.options.animate_update_step){
					setTimeout(function(){
						if (self.hint_notes[n-1] != undefined){
							var _box_note = jQuery('#hint-note-'+self.hint_notes[n-1].key);
							_box_note.css({
								'display': 'block'
							});
						}
					}, 800);
				}else{
					if (self.hint_notes[n-1] != undefined){
						var _box_note = jQuery('#hint-note-'+self.hint_notes[n-1].key);
						_box_note.css({
							'display': 'block'
						});
					}
				}
			}
		};
		
		return self;
	};
})(jQuery);