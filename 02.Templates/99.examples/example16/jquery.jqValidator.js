jQuery.fn.jqValidator = function(options) {
    var self = this;
    settings = jQuery.extend({
        name: '',
        required: false,
        defaultValue: ''
    }, options);
    
    this.settings = settings;

    return this.each(function(i, form){
        jQuery(this).val(self.settings.defaultValue).on({
            focus: function() {
                if(jQuery(this).val() == self.settings.defaultValue)
                    jQuery(this).val('');
            },
            focusout: function() {
                if(jQuery(this).val() == '')
                    jQuery(this).val(self.settings.defaultValue);
            }
        });
        if(self.settings.required) {
            jQuery(this).parent('form').on('submit',function(e) {
	            if(jQuery(form).val() == '' || jQuery(form).val() == self.settings.defaultValue) {
	                alert(self.settings.name + '항목이 비어 있습니다.');
	                e.preventDefault();
	            }
            });
        }
    });
};
